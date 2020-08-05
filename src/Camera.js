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

function Camera() {
  // const model = await mobilenet.load();
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  var model = null;
  var maxPredictions = null;
  var webcam = null;
  var labelContainer = null;

  const [label, setLabel] = useState("default");
  const [prob, setProb] = useState(0);

  var canvas = document.createElement("canvas");
  // var canvas2 = document.getElementById("canvas2");

  canvas.height = 480;
  canvas.width = 640;
  // if (canvas2) {
  //     canvas2.height = 480
  // canvas2.width = 640
  // }
  // canvas2.height = 480
  // canvas2.width = 640

  const loadModel = async () => {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam

    webcam = new tmImage.Webcam(1000, 800, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM

    // console.log(document.getElementById("webcam-container"))
    // document.getElementById("webcam-container").appendChild(webcam.canvas);
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
  };

  const videoConstraints = {
    audio: false,
    video: { facingMode: "user" },
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);

  async function loop() {
    webcam.update(); // update the webcam frame
    update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  function update() {
    // canvas = document.getElementById('canvas');

    var img = new Image();
    img.src = capture();
    const ctx = canvas.getContext("2d");

    console.log("sizes");
    console.log(canvas.height);
    console.log(canvas.width);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // if (canvas2) {
    // const ctx2 = canvas2.getContext('2d');
    // ctx2.drawImage(img, 0, 0, 640, 480);
    // }
  }

  async function predict() {
    // if (document.getElementById('canvas2')) {
    //     const ctx2 = document.getElementById('canvas2').getContext('2d');
    //     ctx2.drawImage(img, 0, 0, 640, 480);

    // }
    // predict can take in an image, video or canvas html element
    // var prediction = null
    // if (canvas2) {
    //     console.log("Using canvas2")
    //     prediction = await model.predict(canvas2);
    // } else {
    //     console.log("not using canvas2")
    //     prediction = await model.predict(canvas);
    // }

    const prediction = await model.predict(webcam.canvas);
    var maxProb = 0;
    var maxLabel = null;

    for (let i = 0; i < maxPredictions; i++) {
      //             const classPrediction =
      //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      // labelContainer.childNodes[i].innerHTML = classPrediction;

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
      {/* <canvas id="canvas2" width="640" height="480" style={{visibility: 'false'}} >
        </canvas> */}
      <div class="box">
        <div id="video-stream">
          <Webcam
            ref={webcamRef}
            // screenshotFormat = 'image/jpeg'
            forceScreenshotSourceSize="true"
            videoConstraints={videoConstraints}
          />
        </div>
        <div
          class="greenprogress"
          style={{
            position: "absolute",
            top: "700px",
            left: "120px",
            margin: "auto",
          }}
        >
          <div
            id="predlabel"
            style={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              top: "10px",
              left: "30px",
            }}
          >
            {" "}
            {label}{" "}
          </div>
          <Line
            id="predprob"
            percent={prob}
            trailColor="#33987A88"
            trailWidth="7"
            strokeLinecap="square"
            strokeWidth="7"
            strokeColor="#00DDAD"
            style={{ transition: "0.5s ease" }}
          />
        </div>
      </div>

      {/* <div id="webcam-container" style={{position:'absolute', top:'1800px', left:'0px', margin: 'auto'}}></div> */}
      {/* <div id="label-container"style={{position:'absolute', top:'700px', left:'120px', margin: 'auto'}}></div> */}
    </>
  );
}

export default Camera;
