#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Apr 30 11:38:19 2025

@author: saadyousaf
"""

import numpy as np
import spacy
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import joblib
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
import language_tool_python

# Initialize tools
nlp = spacy.load('en_core_web_sm')
tool = language_tool_python.LanguageTool('en-US')

# Load pre-trained models
vectorizer = joblib.load('models/tfidf_vectorizer.joblib')
imputer = joblib.load('models/imputer.joblib')
ridge_model = joblib.load('models/ridge_model.joblib')
tokenizer = BertTokenizer.from_pretrained('models/bert_intent_model')
bert_model = BertForSequenceClassification.from_pretrained('models/bert_intent_model')
analyzer = SentimentIntensityAnalyzer()

# Preprocess function
def preprocess_essays(essays):
    processed_essays = []
    for essay in essays:
        doc = nlp(essay.lower())
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        processed_essays.append(" ".join(tokens))
    return processed_essays

# Grammar and spelling check
def check_grammar_spelling(essay):
    matches = tool.check(essay)
    errors = []
    for match in matches:
        errors.append({
            'message': match.message,
            'incorrect': essay[match.offset:match.offset + match.errorLength],
            'suggestions': match.replacements,
            'context': match.context
        })
    return errors

# Prediction function with grammar check
def predict_performance(essay):
    # Check grammar and spelling
    grammar_errors = check_grammar_spelling(essay)
    
    # Preprocess essay
    processed_essay = preprocess_essays([essay])
    essay_vec = vectorizer.transform(processed_essay).toarray()
    sentiment = analyzer.polarity_scores(essay)['compound']
    inputs = tokenizer(processed_essay, padding=True, truncation=True, max_length=512, return_tensors='pt')
    with torch.no_grad():
        outputs = bert_model(**inputs)
    intent = outputs.logits.argmax().item()
    feature_names = list(vectorizer.get_feature_names_out()) + ['intent', 'sentiment']
    features = pd.DataFrame(np.hstack([essay_vec, [[intent, sentiment]]]), columns=feature_names)
    features = imputer.transform(features)
    prediction = ridge_model.predict(features)
    
    return {
        'predicted_grade': float(prediction[0]),
        'sentiment': sentiment,
        'intent': intent,
        'grammar_errors': grammar_errors,
        'num_grammar_errors': len(grammar_errors)
    }

# Example usage
if _name_ == "_main_":
    # Example essay with intentional errors
    essay = "I want to became a docter and help peoples stay healty."
    result = predict_performance(essay)
    print(f"Predicted Grade: {result['predicted_grade']:.2f}")
    print(f"Sentiment Score: {result['sentiment']:.2f}")
    print(f"Intent Class: {result['intent']}")
    print(f"Number of Grammar/Spelling Errors: {result['num_grammar_errors']}")
    if result['grammar_errors']:
        print("\nGrammar/Spelling Errors:")
        for error in result['grammar_errors']:
            print(f"- {error['message']}")
            print(f"  Incorrect: '{error['incorrect']}'")
            print(f"  Suggestions: {error['suggestions']}")
            print(f"  Context: {error['context']}")