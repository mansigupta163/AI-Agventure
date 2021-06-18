# Importing libraries
import requests
import json
import pandas as pd
import numpy as np 
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn import tree
import warnings
import csv
warnings.filterwarnings('ignore')

"""inputfile=open('soil_comp.json','r')
inputdata=inputfile.read()
obj=json.loads(inputdata)
N=obj['N']
P=obj['P']
K=obj['K']
Ph=obj['Ph']
"""

global NaiveBayes

cropRecommend='utils/data/Crop_recommendation.csv'
modelpkl = 'models/NBClassifier.pkl'
testsoilcomp = 'utils/data/test_with_soil_comp.csv'
bioFertilizers = 'utils/data/bio_fertilizers.csv'
    
def train():
    df = pd.read_csv(cropRecommend)
    df['label'].unique()
    features = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    target = df['label']
    # features = df[['temperature', 'humidity', 'ph', 'rainfall']]
    labels = df['label']
    # Initialzing empty lists to append all model's name and corresponding name
    acc = []
    model = []
    # Splitting into train and test data

    from sklearn.model_selection import train_test_split
    Xtrain, Xtest, Ytrain, Ytest = train_test_split(features, target, test_size=0.2, random_state=2)

    from sklearn.naive_bayes import GaussianNB

    NaiveBayes = GaussianNB()

    NaiveBayes.fit(Xtrain, Ytrain)

    import pickle
    # Dump the trained Naive Bayes classifier with Pickle
    NB_pkl_filename = modelpkl
    # Open the file to save as pkl file
    NB_Model_pkl = open(NB_pkl_filename, 'wb')
    pickle.dump(NaiveBayes, NB_Model_pkl)
    # Close the pickle instances
    NB_Model_pkl.close()
    return NaiveBayes

def pred_crop(N,P,K,Ph,lat,long,NaiveBayes):
    """N = input("Enter the Nitrogen ")
    P = input("Enter the phosphorous  ")
    K = input("Enter the potassium  ")
    Ph = input("Enter the PH value ")

    lat = input('lat')
    long = input('long')"""

    BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?"
    url = BASE_URL + "lat=" + lat + "&lon=" + long + "&appid=d4052e83125817ea8f211eeafa15c47d"

    headers = {
        'x-rapidapi-key': "d4052e83125817ea8f211eeafa15c47d"
    }
    response = requests.request("GET", url, headers=headers)
    x = response.json()

    current = x["current"]
    try:
        current_rain = current["rain"]
        rainfall = current["1h"]
    except:
        rainfall = 0

    temp = current["temp"] - 273.15
    temp = "{:.2f}".format(temp)
    humidity = current["humidity"]

    with open(testsoilcomp, 'w', newline='') as csvfile:
        fieldnames = ['N',
                      'P', 'K',
                      'temperature', 'humidity', 'ph', 'rainfall']

        thewriter = csv.DictWriter(csvfile, fieldnames=fieldnames)

        thewriter.writeheader()

        thewriter.writerow({'N': N,
                            'P': P, 'K': K,
                            'temperature': temp, 'humidity': humidity, 'ph': Ph, 'rainfall': rainfall})

    x_test = pd.read_csv(testsoilcomp)
    prediction = NaiveBayes.predict(x_test)
    # print(prediction[0])
    pred = prediction[0]

    df = pd.read_csv(bioFertilizers)

    Bio_fertilizer = df[df['Crop'] == pred]['Bio_fertilizer'].iloc[0]
    Intercrop = df[df['Crop'] == pred]['Intercrop'].iloc[0]


    data = {
        "predicted_crop": pred,
        "biofertilizer": Bio_fertilizer,
        "Intercrop": Intercrop,

    }
    return data



def crop_recommendation(N,P,K,Ph,lat,lon):
    model = train()
    data =pred_crop(N,P,K,Ph,lat,lon,model)
    return data

