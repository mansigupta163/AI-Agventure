# AI-Agventure

## Contents

- [AI-Agventure](#AI-Agventure)
  - [Contents](#contents)
  - [Short description](#short-description)
    - [What's the problem?](#whats-the-problem)
    - [How can technology help?](#how-can-technology-help)
    - [The idea](#the-idea)
  - [Demo video](#demo-video)
  - [The architecture](#the-architecture)
  - [Long description](#long-description)
  - [Project roadmap](#project-roadmap)
  - [Getting started](#getting-started)
  - [Live demo](#live-demo)
  - [Built with](#Built with paid IBM Cloud)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Short description

### What's the problem?

60% of Indian population works in agricultural sector but most of the farmers still follow experience based old practices with 
inadequate knowledge resulting in poor yields and gradual soil erosion due to over use of non-renewable resources and chemicals.

### How can technology help?

We provide an easy to use, effective and complete guide to sustainable agriculture which helps them to take well informed, 
climate and soil quality based decisions when it comes to the only source of income they have.With the help of this data, 
they can have an overall increase of 28-30% of yield whilst helping the environment.

### The idea

The idea is create a sustainable solution not only for environment but farmer as well. This solution allows farmer to 
get the best yield out of the current resources they  have.
Providing an user interface and mobile app, backed by IBM Cloud foundary and Watson Services, will enable farmers to more easily increase their yield 
and soil irrigation without affecting environment.

## Demo video

[![Watch the video](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/images/DemoVideo.png)](https://www.youtube.com/watch?v=v3jmYPc0Mu4)  

## Detailed video  

[![Watch the video](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/images/UIVideo.PNG)](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/WebUI_DemoVideo.mp4)

## The architecture

The Diagram shows the High Level Design  
![Video transcription/translation app](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/documents/Architecture_Diagram.PNG)  
The Diagram shows the weed Detection Process  
![Video transcription/translation app](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/documents/weed_tensor_flow_diagram.PNG)

1. The user navigates to the site and uploads a video/image file.
2. The model will predict soil and crop health
3. IBM cloud foundary and IBM python Flask app was used to create backend API and web frontend
4. Data was created and modelled using IBM Watson studio
5. The app will give irrigation pattern and disease cure and fire prone area.

## Long description

AI Agventure is a complete solution for suggesting suitable crop based upon soil and weather conditions. It is also analysing 
the crop health and suggest ways to improve the crop quality. The solution can be described in 3 Sections:


# Crop Recommendation

In Crop Recommendation section,we will predict the suitable crop to the farmers by analysing the soil and weather conditions. 
The user inputs the soil characteristics which includes Nitrogen, Phosphorous, Potassium and pH of the soil. The application
will predict the weather conditions including temperature, humidity and rainfall based on the location entered by the user or 
fetched by Google Maps by using weather API - OpenWeather.In this model, we used Gaussian Naïve Bayes algorithm to predict the 
crop. The model recommend 22 classes of crop and the accuracy of the modeis 99.09 %. If the user does not enter the soil 
characteristics, the application will recommend the crop using weather conditions. Also it is using Geocoders module to fetch area 
of the provided longitude and latitude. It is using Linear Regression model to predict the suitable crop and the accuracy of the 
model is 96%. The application also recommend the suitable Bio-Fertilizer and Inter-crop for maximum yield of the predicted crop.

# Crop Health

In Crop Health section, the application allows the user to upload the vedio/image of the farm or crop and it will analyse
the health of crop on the basis of three components:
## 2.1 Weed detection:
This component predicts the percentage of weed in the cropping area. The prediction of weed happens after multiple stages of 
processing. Initially, the selective search algorithm is applied to uploaded image and it gives around 2000 regions per image. 
Then the wrapped region is feed into RCNN model which internally uses CNN finetuning for object detection and then the image is 
classified by using SVM classifier which identifies weed and the crop and also gives its percentage. The model is trained with 
dataset of 1500 images and gives 95.88% accuracy rate on the testing environment.
## 2.2 Disease detection: 
This component detects crop disease and calculate the percentage of crop affected by the disease using OpenCV module. It will 
also inform about the cause of the disease and suggest the user to prevent/cure the disease accordingly. The model is trained 
with 54,305 images and covers 14 crop species which includes Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Bell Pepper, 
Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato. The dataset predicts 38 classes of crop disease using Randomm Forest 
Algorithm with the accuracy of 97%.
## 2.3 Dead Crop detection: 
This component is used to detect the percentage of dead crop of the farm and also predict the susceptibility of the crop due to 
fire based on its dry percentage. Initially, it will pre-process the image by performming image resizing and then perform color 
transformation to transform the RGB image to HSV using rgb2hsv module. After transformation, background subtraction techniques 
are applied to the HSV images to remove the unwanted background from the image and to extract the dead part of the crop.

# Irrigation Guidance

In Irrigation Guidance section, the user enters the crop and last two days irrigation status. The application uses location
to internally predict weather conditions which includes temperature, rainfall and wind speed using Weather API - OpenWeather. 
It uses Random Forest algorithm to predict the need of soil irrigation by analysing soil type and weather conditions of the region. 
The accuracy of model is 94%.

It is a Web based and Android mobile based application which is easily accessible through QR Code.  
![QRcode](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/QR_code.png)  

## Project roadmap

The project currently does the following things.

Features in Model 

    1.Crop Health Assesment : Crop and weed detection, disease detection and possible cure suggestion, dead crop detection that can prone to fire 
    2.Crop Recommendation : On the basis of soil properties or location, app will suggest farmer the possible crop. 
    3.Irrigation guidance: Suggesting irrigation on the basis of weather analysis that will further help to save water 
    4.Integration with drones and cameras: Integrate the models with drone/camera 
    
	
Features in UI 

    1.Pie chart analysis for crop health and weed detection.
    2.Irrigation Guidance statistics on the basis of weather conditions, Locations, wind speed and soil type of your area.
    3.Integration of UI with the third party APP's like Google location API
    4.Android App in Google Play Store, Support for IOS Application

It's in a paid IBM Cloud foundary. (Thales company account)

See below for our proposed schedule on next steps after WIT Call for Code 2021 submission.

![Roadmap](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/documents/Product_Roadmap.PNG)

## Getting started
The instructions can help you to install the project on you local environment

# Prerequisite  
# Software's required  

Windows Server  
Python 3.7 or above  
Deploy a windows server 2019 - Please note if Linux is used then make sure linux is installed with desktop  
For Linux server enable the X11 Forwarding and gnome  
Install Python 3.7 or above  
If Pip 21.0 is not available then use get-pip.py and run python get-pip.py  

Clone the repository  
git clone https://github.com/dimplekumawat1902/AI-Agventure-Final

# Run the project  
Steps cd AI-Quaranteams  

pip install –r requirements.txt  
pip install -q tensorflow==2.0.0-alpha0  
resolve the dependencies using pip -install  
pip install flask  
set FLAS_APP environment variable - set FLASK_APP=backendAPI.py  
run command- flask run --host=0.0.0.0  
It will open a RestAPI service on port 8080  
Now the website will use the API services to show data on Web UI/Mobile UI  

## Live demo

You can find a running backend system to test at [pythontoolchain-20210617080845201-forgiving-fox.us-east.mybluemix.net](http://pythontoolchain-20210617080845201-forgiving-fox.us-east.mybluemix.net)  
you can find frontend UI to test at [testtoolchaingroup.us-east.mybluemix.net]( https://testtoolchaingroup.us-east.mybluemix.net/)  

## Built with paid IBM Cloud

- [IBM Cloud Foundry](https://www.cloudfoundry.org/the-foundry/ibm-cloud-foundry/) - To deploy UI and python backend
- [IBM Angular API](https://developer.ibm.com/technologies/web-development/tutorials/wa-implement-a-single-page-application-with-angular2/)- The web framework used
- [IBM Watson Studio](https://www.ibm.com/in-en/cloud/watson-studio) - Data Preparation
- [IBM Python Flask App](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-python-flask-mnist-tutorial.html) - To create restful API
- [IBM toolchain (CI/CD)](https://www.ibm.com/in-en/cloud/continuous-delivery)- To deploy restful API and web ui
![Built with](https://github.com/dimplekumawat1902/AI-Agventure-Final/blob/main/images/IBM-CI-CD-integration.PNG)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use gitlab for versioning.

## Authors

Dimple Kumawat  
Disha Saxena  
Aayushi Bhatnagar  
Mansi Gupta  
Manisha Jain  
Aditi Kurariya  


## License

This project is licensed  - see the [LICENSE](LICENSE) file for details.

