import joblib
import numpy as np
import shap
import pandas as pd
from sklearn.preprocessing import LabelEncoder


class StudentPerformancePredictor:
    def __init__(self, model_dir='models'):
        self.math_model = joblib.load(f'{model_dir}/gb_math_model.pkl')
        self.por_model = joblib.load(f'{model_dir}/gb_por_model.pkl')
        self.aggregator = joblib.load(f'{model_dir}/aggregator_model.pkl')
        self.metadata = joblib.load(f'{model_dir}/model_metadata.pkl')

    def predict_student_performance(self, student_data):

        if isinstance(student_data, dict):
            student_data = pd.DataFrame([student_data])

        preprocessed_data = self.preprocess_data(student_data)

        # Predict individual subject scores
        math_pred = self.math_model.predict(
            preprocessed_data[self.metadata['math_features']])
        por_pred = self.por_model.predict(
            preprocessed_data[self.metadata['por_features']])

        # Prepare aggregator input
        agg_input = np.array([
            math_pred[0],
            por_pred[0],
        ]).reshape(1, -1)

        # Aggregator
        final_pred = self.aggregator.predict(agg_input)

        return {
            "math_score": math_pred[0],
            "portuguese_score":  por_pred[0],
            "overall_score": final_pred[0]
        }

    # Explain the model predictions using SHAP
    def explain_student(self, student_data):
        explainer_math = shap.TreeExplainer(self.math_model)
        explainer_por = shap.TreeExplainer(self.por_model)

        preprocessed_data = self.preprocess_data(student_data)

        math_features = self.metadata['math_features']
        por_features = self.metadata['por_features']
        all_features = math_features + \
            list(set(por_features) - set(math_features))

        # print("all_features", all_features)

        math_shap = explainer_math.shap_values(
            preprocessed_data[math_features])
        por_shap = explainer_por.shap_values(preprocessed_data[por_features])
        aggregator_shap = explainer_por.shap_values(
            preprocessed_data[all_features])

        return {
            "math": self.format_shap_values(math_shap[0], math_features),
            "portuguese": self.format_shap_values(por_shap[0], por_features),
            "aggregator": self.format_shap_values(aggregator_shap[0], all_features)
        }

    # Encode categorical variables
    def encode_categorical(self, df, categorical_features):

        encoded_df = df.copy()
        for col in categorical_features:
            le = LabelEncoder()
            encoded_df[col] = le.fit_transform(df[col])
        return encoded_df

    # Prepare data
    def preprocess_data(self, df):
        # Encode categorical variables
        df = self.encode_categorical(df, self.metadata['categorical_features'])
        return df

    def format_shap_values(self, shap_values, feature_names, n_features=5):
        """Return top 5 most influential features"""
        sorted_features = sorted(
            zip(feature_names, shap_values),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:n_features]

        return {
            'features': [f[0] for f in sorted_features],
            'impacts': [round(float(f[1]), 4) for f in sorted_features]
        }
