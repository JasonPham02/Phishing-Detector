from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


app = Flask(__name__)
CORS(app)

#Load the model and vectorizer

model = joblib.load('phishing_model.pkl')
url_vectorizer = joblib.load('tfidf_vectorizer.pkl')


# Helper function to clean the URL 
def clean_url(url):
    url = url.replace("https://", "")
    url = url.replace("http://", "")
    url = url.replace("www", "")
    return url
    

@app.route('/predict', methods=['POST'])
def predict():
  
    data = request.json
    url_to_check = data.get('url', '')
    
    #clean the input
    clean_input = clean_url(url_to_check)
    
    #process and predict 
    urls_vec = url_vectorizer.transform([clean_input])
    urls_predict = model.predict(urls_vec)
    
    result = urls_predict[0]
    
    return jsonify({
        'result:': result
    })

if __name__ == '__main__':
    app.run(port=5000)
    
    
    
    
    
