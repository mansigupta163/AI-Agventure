import numpy as np
import cv2, os
import paho.mqtt.client as mqtt
import json
# Import Image for analysis
def predict_dry_leaf(img_path):
	frame=cv2.imread(img_path)
	if frame is not None:
		hight, width, c = frame.shape
		print (hight/2, width/2)
		hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
		# For filtering of dead leaf colour
		lower_brown = np.array([0,0,0])
		higher_brown = np.array([30,255,255])
		mask = cv2.inRange(hsv , lower_brown , higher_brown)
		res = cv2.bitwise_and(frame, frame, mask = mask)
	# For getting the area
		contours,hierarchy = cv2.findContours(mask, 1, 2)
		area = 0
		temp = 0
		i = 0
		j = 0
		for cnt in contours:
			area_t = cv2.contourArea(cnt)
		area = area + area_t
		M = cv2.moments(cnt)
		if (temp < area_t):
			temp = area_t
			j = i
			print (j)
			i = i + 1
		cnt = contours[j]
		M = cv2.moments(cnt)
		try:
			cY = int(M['m10']/M['m00'])
			cX = int(M['m01']/M['m00'])
			print (cX, cY)
		except:
			pass
		# For blacking that area
	#	ball = lol[20:40, 20:40]
	#	res[cX-10:cX+10, cY-10:cY+10] = ball
		# For filtering of total leaf colour
		lower_fore = np.array([0,0,100])
		higher_fore = np.array([50,150,255])
		mask1 = cv2.inRange(hsv , lower_fore , higher_fore)
		res1 = cv2.bitwise_and(frame, frame, mask = mask1)
		# for getting the total leaf area
		contours,hierarchy = cv2.findContours(mask1, 1, 2)
		area1 = 0
		for cnt in contours:
			area1 = area1 + cv2.contourArea(cnt)

		# Printing % of leaf which is in dead colour
		results = area*100/area1
		print (results)
		# Data to be written
		if (float(results) >= 100.0):
			dead_leaf = (float(results)/100.0)
			print ("a")
		elif (float(results ) < 100.0 and float(results ) >=20.0):
			dead_leaf = results
			print ("b")
		else:
			dead_leaf = float(100.0 - (float(results) * 100.0))
			print ("c")
		print (dead_leaf)
		data ={
			"green leaf" : results,
			"dead_leaf" : dead_leaf }
		with open("dry_leaf.json", "w") as outfile:
			json.dump(data, outfile)
		# Showing Different parts
		cv2.namedWindow('frame1',cv2.WINDOW_NORMAL)
		#cv2.imshow('frame1',res1)
		cv2.namedWindow('frame',cv2.WINDOW_NORMAL)
		#cv2.imshow('frame',res)
		cv2.imwrite('c1.png',frame)

	else:
		data ={
			"green leaf" : "N/A as pixels are not correct",
			"dead_leaf" : "N/A as pixels are not correct" }
		print ('Image pixels not correct')
	return data

