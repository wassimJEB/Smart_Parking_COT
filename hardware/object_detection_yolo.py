import cv2 as cv
import argparse
import sys
import numpy as np
import os.path
import pytesseract
import streamlit as st
import easyocr
from datetime import datetime
from time import strftime

# Initialize the parameters
confThreshold = 0.5  # Confidence threshold
nmsThreshold = 0.4  # Non-maximum suppression threshold

inpWidth = 416  # 608     # Width of network's input image
inpHeight = 416  # 608     # Height of network's input image

classesFile = "classes.names"

classes = None
with open(classesFile, 'rt') as f:
    classes = f.read().rstrip('\n').split('\n')

# Give the configuration and weight files for the model and load the network using them.

modelConfiguration = "./darknet-yolov3.cfg"
modelWeights = "./model.weights"

net = cv.dnn.readNetFromDarknet(modelConfiguration, modelWeights)
net.setPreferableBackend(cv.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv.dnn.DNN_TARGET_CPU)


# Get the names of the output layers


def getOutputsNames(net):
    # Get the names of all the layers in the network
    layersNames = net.getLayerNames()
    # Get the names of the output layers, i.e. the layers with unconnected outputs
    return [layersNames[i - 1] for i in net.getUnconnectedOutLayers()]



# Draw the predicted bounding box


def drawPred(classId, conf, left, top, right, bottom):
    # Draw a bounding box.
    #    cv.rectangle(frame, (left, top), (right, bottom), (255, 178, 50), 3)
    #cv.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 3)

    label = '%.2f' % conf

    # Get the label for the class name and its confidence
    if classes:
        assert (classId < len(classes))
        label = '%s: %s' % (classes[classId], label)

    # Display the label at the top of the bounding box
    labelSize, baseLine = cv.getTextSize(
        label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
    top = max(top, labelSize[1])
    cv.rectangle(frame, (left, top - round(1.5 * labelSize[1])), (left + round(
        1.5 * labelSize[0]), top + baseLine), (255, 0, 255), cv.FILLED)
    # cv.rectangle(frame, (left, top - round(1.5*labelSize[1])), (left + round(1.5*labelSize[0]), top + baseLine),    (255, 255, 255), cv.FILLED)
    cv.putText(frame, label, (left, top),
               cv.FONT_HERSHEY_SIMPLEX, 0.70, (255, 255, 255), 2)
    cv.imwrite("./out.png",frame)


def ocrReader(left, top, right, bottom):
    cropped_image = frame[left:right + 5, top:bottom + 5]
    cv.imwrite("./ocr.jpg", cropped_image.astype(np.uint8))

def Ocr_Text(path):
    cropped_image=cv.imread(path)

    reader = easyocr.Reader(['ar'])
    result = reader.readtext(cropped_image)
    try:
        text = result[0][len(result)].split()
        text = text[0]+'  tun  ' +text[-1]
    except:
        text = 'Bad Quality license '

    return text


def postprocess(frame, outs):
    frameHeight = frame.shape[0]
    frameWidth = frame.shape[1]

    classIds = []
    confidences = []
    boxes = []
    # Scan through all the bounding boxes output from the network and keep only the
    # ones with high confidence scores. Assign the box's class label as the class with the highest score.
    classIds = []
    confidences = []
    boxes = []
    for out in outs:

        for detection in out:
            # if detection[4]>0.001:
            scores = detection[5:]
            classId = np.argmax(scores)
            # if scores[classId]>confThreshold:
            confidence = scores[classId]
            if confidence > confThreshold:
                center_x = int(detection[0] * frameWidth)
                center_y = int(detection[1] * frameHeight)
                width = int(detection[2] * frameWidth)
                height = int(detection[3] * frameHeight)
                left = int(center_x - width / 2)
                top = int(center_y - height / 2)
                classIds.append(classId)
                confidences.append(float(confidence))
                boxes.append([left, top, width, height])

    # Perform non maximum suppression to eliminate redundant overlapping boxes with
    # lower confidences.
    indices = cv.dnn.NMSBoxes(boxes, confidences, confThreshold, nmsThreshold)
    for i in indices:
        i = i
        box = boxes[i]
        left = box[0]
        top = box[1]
        width = box[2]
        height = box[3]
        drawPred(classIds[i], confidences[i], left, top, left + width, top + height)
        ocrReader(top, left, top + height, left + width)

L=[]



st.title("License Plate Recognition")

# upload photo/ Video

c = st.selectbox("Choisir une option",["Télécharger une video","Télécharger une image"])
path1="C:/Users/21622/Desktop/yolo-license-plate-detection-master/yolo-license-plate-detection-master/license_plates_detection_train";
if c =="Télécharger une image":
    img_file_buffer = st.file_uploader("Upload Car image", type=["png", "jpg", "jpeg"])
    if img_file_buffer is not None:
        file_details = {"FileName":img_file_buffer.name,"FileType":img_file_buffer.type}
        st.write(file_details)
        with open(os.path.join(path1, "input.png"), "wb") as f:

            f.write(img_file_buffer.getbuffer())

        # get frame from the video
        frame = cv.imread(os.path.join(path1, "input.png"))




        # Create a 4D blob from a frame.
        blob = cv.dnn.blobFromImage(
            frame, 1 / 255, (inpWidth, inpHeight), [0, 0, 0], 1, crop=False)

        # Sets the input to the network
        net.setInput(blob)

        # Runs the forward pass to get output of the output layers
        outs = net.forward(getOutputsNames(net))

        # Remove the bounding boxes with low confidence
        postprocess(frame, outs)
        text = Ocr_Text("./ocr.jpg")
        print(text)

        # Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
        t, _ = net.getPerfProfile()
        label = 'Inference time: %.2f ms' % (t * 1000.0 / cv.getTickFrequency())
        st.success("Matricule detectée")
        with st.expander("Prédiction"):
            st.image("./out.png")
        with st.expander("Image recadré"):
            st.image("./ocr.jpg")

        with st.expander("Matricule "):
            st.text(text)
            #if text='Bad Quality license ' :
                #st.input()
            print(str(datetime.now()))
            info ={'text':text,'date':str(datetime.now())}
            print (info)
            L.append(info)
            ## ajouter info base de données


            ## afficher les donnees de la base de données dans un tableau
        for i in L:
            st.text(i)

