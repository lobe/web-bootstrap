import React, { useState } from "react";
import Webcam from "react-webcam";
import "./App.css";
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Progress from "react-bootstrap/ProgressBar";
import { Line, Circle } from "rc-progress";

const URL = "http://localhost:3000/model/";

function Prediction() {
  // const model = await mobilenet.load();
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  var model = null;
  var maxPredictions = null;
  var webcam = null;
  var labelContainer = null;

  const [label, setLabel] = useState("default");
  const [prob, setProb] = useState(0);


  const loadModel = async () => {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam

    webcam = new tmImage.Webcam(1000, 800, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
  };

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {

    const prediction = await model.predict(webcam.canvas);
    var maxProb = 0;
    var maxLabel = null;

    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability > maxProb) {
        maxProb = prediction[i].probability;
        maxLabel = prediction[i].className;
      }
    }

    setProb(maxProb * 100);
    setLabel(maxLabel);
  }

  loadModel();

  return (
    <>
<div class="blur">
        <div
          class="greenprogress"
        >
          <div
            id="predlabel"
            style={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              top: "16px",
              left: "40px",
            }}
          >
            {" "}
            {label}{" "}
          </div>
          {/* <Line
            id="predprob"
            percent={prob}
            trailColor="#ffffff00"
            trailWidth="14"
            strokeLinecap="square"
            strokeWidth="14"
            strokeColor="#00DDAD"
            style={{ transition: "0.5s ease" }}
          /> */}
          <div class="bar"  style={{
              width: String(prob) + "%",
              height: "40px"
            }}></div>

        </div>
        </div>
    </>
  );
}

export default Prediction;
