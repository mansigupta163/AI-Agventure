################################################################
#       This program has been written by Manisha Jain      #
################################################################

import cv2

import json
from utils.cure_disease import disease_dic


def ProcessImage(filename):
    OriginalImage = cv2.imread(filename, 1)
    b = OriginalImage[:, :, 0]
    g = OriginalImage[:, :, 1]
    r = OriginalImage[:, :, 2]
    Disease = r - g
    global Alpha
    Alpha = b
    GetAlpha(OriginalImage)
    ProcessingFactor = 150
    for i in range(0, OriginalImage.shape[0]):
        for j in range(0, OriginalImage.shape[1]):
            if int(g[i, j]) > ProcessingFactor:
                Disease[i, j] = 255
    percentage = DisplayDiseasePercentage(Disease)
    disease_name = 'Apple_scab'
    disease_cause = disease_dic[disease_name]['Disease_Cause']
    disease_cure = disease_dic[disease_name]['Disease_Cure']
    disease = {
                "Disease Name": disease_name, 
                "Disease Percentage": percentage,
                "Disease Cause": disease_cause,
                "Disease Cure": disease_cure
              }
    print(json.dumps(disease))
    return disease
    #S.bind('<ButtonRelease-1>', ProcessImage)
    #MainWindow.mainloop()


def GetAlpha(OriginalImage):
    global Alpha
    for i in range(0, OriginalImage.shape[0]):
        for j in range(0, OriginalImage.shape[1]):
            if OriginalImage[i, j, 0] > 200 and OriginalImage[i, j, 1] > 200 and OriginalImage[i, j, 2] > 200:
                Alpha[i, j] = 255
            else:
                Alpha[i, j] = 0


def DisplayDiseasePercentage(Disease):
    Count = 0
    Res = 0
    for i in range(0, Disease.shape[0]):
        for j in range(0, Disease.shape[1]):
            if Alpha[i, j] == 0:
                Res += 1
            if Disease[i, j] < 150:
                Count += 1
    Percent = (Count / Res) * 100
    actual_percentage = str(round(Percent, 2)) + "%"
    #DiseasePercent.set("Percentage Disease: " + str(round(Percent, 2)) + "%")
    return actual_percentage


"""filename = GetFile()
if filename != "":
	file_name = filename.split("/")[-2]
	disease_name = file_name.split("___")[1]
	ProcessImage(None)
else:
    print("No File!")
    exit(0)"""