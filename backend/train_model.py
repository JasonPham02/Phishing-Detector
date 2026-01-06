import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib



df = pd.read_csv('phishing_site_urls.csv')

print(df['Label'].value_counts())

rows, cols = df.shape
print(f"Rows:{rows}, Cols:{cols}")

#Define x and y
x = df['URL'] #The Question
y = df['Label'] #The Answer

#Use train_test_split to create 4 variables
X_train, X_test, Y_train, Y_test = train_test_split(
    x, y, test_size=0.20
)

#use TfidfVectorizer to translate from text to number and determine TF-IDF score. 
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train) #Read all training sentences, build vocab and calculate IDF values
X_test_vec = vectorizer.transform(X_test) #Use the same everthing from training process. Not rebuilding anything or learing new words. To prevent new words and new Tokens values


#Use LogisticRegression to training the model (train)
model = LogisticRegression()
model.fit(X_train_vec, Y_train)

#Final test
accuracy = model.score(X_test_vec, Y_test)

print(f"Accuracy{accuracy}")

#save the model and vectorizer
joblib.dump(model, 'phishing_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')

print('Model and vectorizer saved sucessfully')













