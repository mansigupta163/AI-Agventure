import base64
from flask import request
from flask import jsonify
from flask import Flask
import warnings
import re
import os
from utils.Predict_Weed import predict_weed
from utils.Plant_Disease_Detector import ProcessImage
from utils.predict_dry_leaf import predict_dry_leaf
from utils.Crop_Recommendation_using_location import crop_pred_loc
from utils.crop_recommendation import crop_recommendation
from utils.weather import irrigation_pattern
warnings.filterwarnings('ignore')


app = Flask(__name__)
app.config["DEBUG"] = True

print("Webservices are up.....")
#commenting weed detection and disease detection for deploying on IBM Watson

@app.route("/predict_weed", methods=["POST"])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    image_data = re.sub('^data:image/.+;base64,', '', encoded)
    decoded = base64.b64decode(image_data)

    test_image = "test.jpeg"
    with open(test_image, 'wb') as f:
        f.write(decoded)

    predicted = predict_weed(test_image)

    return jsonify(predicted)

@app.route("/predict_disease", methods=["POST"])
def predict_disease():
    message = request.get_json(force=True)
    encoded = message['image']

    image_data = re.sub('^data:image/.+;base64,', '', encoded)

    decoded = base64.b64decode(image_data)

    test_image = "pred_disease.jpeg"
    with open(test_image, 'wb') as f:
        f.write(decoded)

    predicted_disease = ProcessImage(test_image)
    predicted_dryness = predict_dry_leaf(test_image)
    predicted_disease.update(predicted_dryness)


    return jsonify(predicted_disease)

@app.route("/crop_recommed_loc", methods=["POST"])
def crop_recommed_loc():
    message = request.get_json(force=True)
    print(message)
    lat = message['lat']
    lon = message['lon']
    data = crop_pred_loc(lat,lon)
    return jsonify(data)

@app.route("/crop_recommend_using_soil_comp", methods=["POST"])
def crop_recommed_soil():
    message = request.get_json(force=True)
    print(message)
    lat = message['lat']
    lon = message['lon']
    N = message['N']
    P = message['P']
    K = message['K']
    Ph = message['Ph']
    data = crop_recommendation(N,P,K,Ph,lat,lon)
    return jsonify(data)

@app.route("/irrigation_pattern", methods=["POST"])
def irrigation_pattern_pred():
    message = request.get_json(force=True)
    print(message)
    lat = message['lat']
    lon = message['lon']
    resp = message['resp']
    data = irrigation_pattern(lat,lon,resp)
    return jsonify(data)


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


port = os.getenv('VCAP_APP_PORT', '8080')

app.run(host='0.0.0.0', port = int(port))
