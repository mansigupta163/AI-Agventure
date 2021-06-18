import requests
import json
import csv
import time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV, ShuffleSplit, learning_curve, train_test_split, cross_val_score
from sklearn import preprocessing
from sklearn.metrics import r2_score, make_scorer, mean_squared_error, mean_absolute_error
from sklearn.feature_selection import SelectFromModel


import warnings
warnings.filterwarnings("ignore")

"""inputfile=open('lat_long.json','r')
inputdata=inputfile.read()
obj=json.loads(inputdata)
lat=obj['lat']
long=obj['long']
soil_moisture_known=obj['soil_moisture_known']"""
test_file = 'utils/data/test.csv'
export_dataframe = 'utils/data/export_dataframe.csv'


def fit_model(X, y):
    cv_sets = ShuffleSplit(test_size=0.20, random_state=0)

    params = {'n_estimators': [100, 120, 140],
              'min_samples_leaf': [1, 2, 3],
              'max_depth': list(range(1, 20)),
              'max_features': [0.05, 0.1, 0.15, 0.2]}

    n_iter_search = 20
    regressor = RandomForestRegressor()
    score = make_scorer(r2_score)
    grid = RandomizedSearchCV(regressor, params, n_iter=n_iter_search, scoring=score, cv=cv_sets)
    grid = grid.fit(X, y)
    # Return the optimal model
    return grid.best_estimator_

def predict1(lat,long,resp):
    lat = lat
    long = long
    soil_moisture_known = resp
    BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?"
    url = BASE_URL + "lat=" + lat + "&lon=" + long + "&appid=d4052e83125817ea8f211eeafa15c47d"

    headers = {
        'x-rapidapi-key': "d4052e83125817ea8f211eeafa15c47d"
    }
    response = requests.request("GET", url, headers=headers)
    x = response.json()
    # print(x)

    current = x["current"]
    minutely = x["minutely"]
    current_temperature = current["temp"]

    if (soil_moisture_known == "yes"):
        soil = 70
    else:
        soil = 40

    sum = 0
    for i in range(len(minutely)):
        sum += minutely[i]["precipitation"]
    precipitation = sum / len(minutely)

    daily = x["daily"]
    hourly = x['hourly']

    daily_temp = daily[0]["temp"]

    city_min_temp = ((daily_temp["min"] - 273.15) * 1.8) + 32

    city_max_temp = ((daily_temp["max"] - 273.15) * 1.8) + 32

    total_humidity = 0
    for i in range(len(hourly)):
        total_humidity += hourly[i]["humidity"]
    average_humidity = total_humidity / len(hourly)
    # print(int(average_humidity))

    total_wind_speed = 0
    for i in range(len(hourly)):
        total_wind_speed += hourly[i]["wind_speed"]
    average_wind_speed = total_wind_speed / len(hourly)
    average_wind_speed = "{:.2f}".format(average_wind_speed)
    # print(average_wind_speed)

    max_wind_speed = 0
    for i in range(len(hourly)):
        if hourly[i]["wind_speed"] > max_wind_speed:
            max_wind_speed = hourly[i]["wind_speed"]
    max_wind_speed = "{:.2f}".format(max_wind_speed)
    # print(max_wind_speed)

    total_pressure = 0
    for i in range(len(hourly)):
        total_pressure += hourly[i]["pressure"]
    average_pressure = total_pressure / len(hourly)
    average_pressure = average_pressure / 3386
    average_pressure = "{:.2f}".format(average_pressure)
    # print(average_pressure)

    max_pressure = 0
    for i in range(len(hourly)):
        if hourly[i]["pressure"] > max_pressure:
            max_pressure = hourly[i]["pressure"]
    max_pressure = max_pressure / 3386
    max_pressure = "{:.2f}".format(max_pressure)
    # print(max_pressure)

    soil = 54

    daily = x["daily"]
    rain_fall = 0
    count = 0

    rainfall = []

    for i in range(len(daily)):
        try:
            rainfall.append(daily[i]['rain'])
        except:
            rainfall.append(0)

    for i in range(len(daily)):
        try:
            rain_fall += daily[i]['rain']
            count += 1
        except:
            pass

    with open(test_file, 'w', newline='') as csvfile:
        fieldnames = ['Air Temperature Maximum (degF)',
                      'Air Temperature Minimum (degF)', 'Precipitation Increment (in)',
                      'Relative Humidity (pct) Mean of Hourly Values',
                      'Wind Speed Maximum (mph) Max of Hourly Values',
                      'Wind Speed Average (mph) Mean of Hourly Values',
                      'Vapor Pressure - Partial (inch_Hg) Mean of Hourly Values',
                      'Vapor Pressure - Saturated (inch_Hg) Mean of Hourly Values',
                      'Soil Temperature']

        thewriter = csv.DictWriter(csvfile, fieldnames=fieldnames)

        thewriter.writeheader()

        thewriter.writerow(
            {'Air Temperature Maximum (degF)': city_max_temp, 'Air Temperature Minimum (degF)': city_min_temp,
             'Precipitation Increment (in)': precipitation,
             'Relative Humidity (pct) Mean of Hourly Values': average_humidity,
             'Wind Speed Maximum (mph) Max of Hourly Values': max_wind_speed,
             'Wind Speed Average (mph) Mean of Hourly Values': average_wind_speed,
             'Vapor Pressure - Partial (inch_Hg) Mean of Hourly Values': max_pressure,
             'Vapor Pressure - Saturated (inch_Hg) Mean of Hourly Values': average_pressure,
             'Soil Temperature': soil})

    # Training and Prediction using ML model

    dataset = pd.read_csv(export_dataframe)
    X_train = dataset[['Air Temperature Maximum (degF)',
                       'Air Temperature Minimum (degF)', 'Precipitation Increment (in)',
                       'Relative Humidity (pct) Mean of Hourly Values',
                       'Wind Speed Maximum (mph) Max of Hourly Values',
                       'Wind Speed Average (mph) Mean of Hourly Values',
                       'Vapor Pressure - Partial (inch_Hg) Mean of Hourly Values',
                       'Vapor Pressure - Saturated (inch_Hg) Mean of Hourly Values',
                       'Soil Temperature']]
    y_train = dataset['Soil Moisture Percent -2in (pct) Mean of Hourly Values']

    X_test = pd.read_csv(test_file)



    # Fit the training data to the model using grid search
    reg = fit_model(X_train, y_train)

    y_opt_pred = reg.predict(X_test)

    if rain_fall > 28 or y_opt_pred > 70:
        pred = "yes"
        # print("You soil is having adequate amount of misture so no need to irrigate it right now. Please check after one week")

    else:
        pred = "no"
        # print("Please irrigate your land for adequate moisture in your soil")

    data = {
        "pred": pred,
        "day1": rainfall[0],
        "day2": rainfall[1],
        "day3": rainfall[2],
        "day4": rainfall[3],
        "day5": rainfall[4],
        "day6": rainfall[5],
        "day7": rainfall[6],
        "day8": rainfall[7],
    }
    return data

def irrigation_pattern(lat,lon,resp):
     data = predict1(lat,lon,resp)
     return data

