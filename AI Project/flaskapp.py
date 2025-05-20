from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from werkzeug.serving import run_simple
from student import StudentPerformancePredictor

import numpy as np
import spacy
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import joblib
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd

import language_tool_python
import spacy


# Initialize tools
nlp = spacy.load('en_core_web_sm')
tool = language_tool_python.LanguageTool('en-US')

app = Flask(__name__)
CORS(app)

predictor = StudentPerformancePredictor()

# Load the Math dataset
student_mat = pd.read_csv('Dataset/student+performance/student/student-mat.csv', sep=';')

# Select relevant columns for the model
features = [
    'school', 'sex', 'age', 'address', 'famsize', 'Pstatus',
    'Medu', 'Fedu', 'Mjob', 'Fjob', 'reason', 'guardian',
    'traveltime', 'studytime', 'failures', 'schoolsup', 'famsup',
    'paid', 'activities', 'nursery', 'higher', 'internet',
    'romantic', 'famrel', 'freetime', 'goout', 'Dalc',
    'Walc', 'health', 'absences', 'G1', 'G2'
]
target = 'G3'

# Encode categorical variables
label_encoders = {}
for column in student_mat.select_dtypes(include=['object']).columns:
    label_encoders[column] = LabelEncoder()
    student_mat[column] = label_encoders[column].fit_transform(student_mat[column])

# Scale numerical features
scaler = StandardScaler()
student_mat[features] = scaler.fit_transform(student_mat[features])

# Split the data into training and testing sets
X = student_mat[features]
y = student_mat[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a random forest regressor model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Calculate evaluation metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("mae",mae)
print("mse",mse)
print("r2",r2)

# Function to predict final grade based on user input
def predict_final_grade(user_input):
    for col in user_input.columns:
        print(col)
    # Encode and scale user input using the same label encoders and scaler
    for column in user_input.select_dtypes(include=['object']).columns:
        if column in label_encoders:
            user_input[column] = label_encoders[column].transform(user_input[column])
    user_input[features] = scaler.transform(user_input[features])
    
    
    # Predict the final grade
    predicted_grade = model.predict(user_input)
    print(predicted_grade)
    return predicted_grade



# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Load pre-trained models
vectorizer = joblib.load('Data/tfidf_vectorizer.joblib')
imputer = joblib.load('Data/imputer.joblib')
ridge_model = joblib.load('Data/ridge_model.joblib')
tokenizer = BertTokenizer.from_pretrained('Data/bert_intent_model')
bert_model = BertForSequenceClassification.from_pretrained('Data/bert_intent_model')
analyzer = SentimentIntensityAnalyzer()

# Preprocess function
def preprocess_essays(essays):
    processed_essays = []
    print(essays)
    for essay in essays:
        doc = nlp(essay.lower())
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        processed_essays.append(" ".join(tokens))
    return processed_essays

# Prediction function
def predict_sentiment(essay, prediction):
    
    grammar_errors = check_grammar_spelling(essay)
    num_grammar_errors = len(grammar_errors)


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
   # prediction = ridge_model.predict(features)

   
    final_score = calculate_final_score(num_grammar_errors, intent, sentiment,  prediction)
    
    # return {
    #     'predicted_grade': float(prediction[0]),
    #     'sentiment': sentiment,
    #     'intent': intent,
    #     'grammar_errors': grammar_errors,
    #     'num_grammar_errors': num_grammar_errors
    # }
    return {
           # 'predicted_grade': float(prediction[0]),
            'sentiment': sentiment,
            'intent': intent,
            'grammar_errors': grammar_errors,
            'num_grammar_errors': num_grammar_errors,
            'final_score': final_score
        }







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
    if grammar_errors:
        return {
            'grammar_errors': grammar_errors,
            'num_grammar_errors': len(grammar_errors)
        }


# Calculate final score
def calculate_final_score(num_grammar_errors, intent_score, sentiment_score, predicted_grade, 
                         max_grammar_score=11.0, max_intent_score=11.0, max_sentiment_score=11.0, 
                         max_grade_score=66.0, max_errors=10):
    """
    Calculate a final score with 11% grammar, 11% intent, 11% sentiment, 66% grade.
    
    Args:
        num_grammar_errors (int): Number of grammar/spelling errors
        intent_score (int): Intent class from BERT (0-4)
        sentiment_score (float): Sentiment score from VADER (-1 to 1)
        predicted_grade (float): Predicted grade from Ridge model (0-20)
        max_grammar_score (float): Maximum score for grammar (default: 11.0)
        max_intent_score (float): Maximum score for intent (default: 11.0)
        max_sentiment_score (float): Maximum score for sentiment (default: 11.0)
        max_grade_score (float): Maximum score for grade (default: 66.0)
        max_errors (int): Number of errors at which grammar score reaches 0 (default: 10)
    
    Returns:
        float: Final score (0-100)
    """
    # Grammar score: Linearly decrease from max_grammar_score
    grammar_penalty = min(num_grammar_errors / max_errors, 1.0)
    grammar_score = max_grammar_score * (1 - grammar_penalty)
    
    # Intent score: Scale intent (0-4) to max_intent_score
    intent_score_normalized = (intent_score / 4.0) * max_intent_score
    
    # Sentiment score: Scale sentiment (-1 to 1) to max_sentiment_score (0 to 11)
    sentiment_score_normalized = ((sentiment_score + 1) / 2.0) * max_sentiment_score
    
    # Grade score: Scale predicted grade (0-20) to max_grade_score
    grade_score = (predicted_grade / 20.0) * max_grade_score
    
    # Final score: Weighted sum (11% grammar, 11% intent, 11% sentiment, 66% grade)
    final_score = grammar_score + intent_score_normalized + sentiment_score_normalized + grade_score
    
    return final_score



@app.route('/predict_grade', methods=['POST'])
def predict_grade():
    user_input = request.json['data']
    user_input_df = pd.DataFrame([user_input])

    # predicted_grade = predict_final_grade(user_input_df)
    # return jsonify({'predicted_grade': predicted_grade[0]})
    

    prediction = predictor.predict_student_performance(user_input_df)
    explanation = predictor.explain_student(user_input_df)
    print("overall_score", prediction["overall_score"])
    result = predict_sentiment(user_input_df['essay'][0], prediction["overall_score"])

    response = {
        "math": {
            "score": (round(prediction["math_score"])/20)*100,
            "top_features": explanation["math"]
        },
        "portuguese": {
            "score": (round(prediction["portuguese_score"])/20)*100,
            "top_features": explanation["portuguese"]
        },
        "overall": {
            "score": (round(prediction["overall_score"])/20)*100,
            "top_features": explanation["aggregator"]
        },
        "sentiment":{
            "sentiment": round(result["sentiment"], 2),
            "Intent Class": result['intent'],
            "final_score": round(result["final_score"], 2),
            "num_grammar_errors": result['num_grammar_errors'],
        }
      
    }
    print("response",response)
    print(f"Sentiment Score: {result['sentiment']:.2f}")
    print(f"Intent Class: {result['intent']}")
    
    
    
    return jsonify(response)

# @app.route('/predict', methods=['POST'])
# def predict():
#     student_data = request.json  # Assumes frontend sends a JSON object

#     if isinstance(student_data, dict):
#         student_data = pd.DataFrame([student_data])

#     prediction = predictor.predict_student_performance(student_data)
#     explanation = predictor.explain_student(student_data)

#     response = {
#         "math": {
#             "score": round(prediction["math_score"], 2),
#             "top_features": explanation["math"]
#         },
#         "portuguese": {
#             "score": round(prediction["portuguese_score"], 2),
#             "top_features": explanation["portuguese"]
#         },
#         "overall": {
#             "score": round(prediction["overall_score"], 2),
#             "top_features": explanation["aggregator"]
#         }
#     }

#     return jsonify(response)


if __name__ == '__main__':
    run_simple('localhost', 5000, app)
