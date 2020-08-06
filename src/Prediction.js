import React, { useState,  useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { transform } from "@babel/core";

const URL = "http://localhost:3000/model/";

function Prediction() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  var model = null;
  var maxPredictions = null;
  var webcam = null;
  var labelContainer = null;

  const [label, setLabel] = useState("default");
  const [prob, setProb] = useState(0);

  const [label2, setLabel2] = useState("default");
  const [prob2, setProb2] = useState(0);

  const [label3, setLabel3] = useState("default");
  const [prob3, setProb3] = useState(0);

  useEffect(() => {
    // Your code here
    loadModel()
  }, []);


  const loadModel = async () => {
    console.log("once")

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam

    webcam = new tmImage.Webcam(1000, 800, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // window.requestAnimationFrame(loop);
    const interval = setInterval(() => {
      loop()
    }, 1000)
    window.requestAnimationFrame(loop);
  };

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
  }

  async function predict() {

    const prediction = await model.predict(webcam.canvas);
    var maxProb = [];
    var maxLabel = [];

    for (let i = 0; i < maxPredictions; i++) {
      if (maxProb.length < 3){
        maxProb.push(prediction[i].probability)
        maxLabel.push(prediction[i].className)
      } else {
        var indexMin = maxProb.indexOf(Math.min(...maxProb));
        var minOf3 = maxProb[indexMin]
        if (prediction[i].probability > minOf3) {
          maxProb[indexMin] = prediction[i].probability;
          maxLabel[indexMin] = prediction[i].className;
        }
      }
    }

    var first = maxProb.indexOf(Math.max(...maxProb));
    var third = maxProb.indexOf(Math.min(...maxProb));
    var second = (first + third) * 2 % 3

    setProb(maxProb[first] * 100);
    setLabel(maxLabel[first]);

    setProb2(maxProb[second] * 100);
    setLabel2(maxLabel[second]);

    setProb3(maxProb[third] * 100);
    setLabel3(maxLabel[third]);
  }

  return (
    <>
<div class="blur">
        <div
          class="greenprogress"
        >
          <div
            class="predlabel"
            style={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              left: "40px",
            }}
          >
            {label}{" "}
          </div>
          <div id="bar" class="bar"  style={{
              width:String(prob) +"%",
              height: "40px",
              backgroundColor: "#00DDAD"
            }}></div>

        </div>

        <div
          class="greenprogress"
        >
          <div
            class="predlabel"
            style={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              left: "40px",
            }}
          >
            {label2}{" "}
          </div>
          <div id="bar" class="bar"  style={{
              width:String(prob2) +"%",
              height: "40px"
            }}></div>

        </div>

        <div
          class="greenprogress"
        >
          <div
            class="predlabel"
            style={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              left: "40px",
            }}
          >
            {label3}{" "}
          </div>
          <div id="bar" class="bar"  style={{
              width:String(prob3) +"%",
              height: "40px"
            }}></div>

        </div>
        </div>
    </>
  );
}

export default Prediction;
