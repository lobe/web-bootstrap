import React from 'react';
import Webcam from "react-webcam";
import './App.css'


// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import Progress from 'react-bootstrap/ProgressBar'
import { Line, Circle } from 'rc-progress';
import { useState } from 'react';


const URL = "https://teachablemachine.withgoogle.com/models/VEENOIeS8/";

class Camera extends React.Component {
    // const model = await mobilenet.load();
    modelURL = URL + "model.json";
    metadataURL = URL + "metadata.json";  
    model = null;
    maxPredictions = null;
    webcam = null;
    // labelContainer = null;

    

    // const [label, setLabel] = useState("default");
    // const [prob, setProb] = useState(0);

    // var prob = 0

    canvas = document.createElement('canvas');

    constructor(props) {
        super(props)
        this.state = {
            prob: 0,
            label: "default"
        }

    }

    componentDidMount() {
        this.loadModel()
    }
    
    loadModel = async () => {
        console.log(".........")
        // console.log(this.webcamRef.canvas)
        this.model = await tmImage.load(this.modelURL, this.metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        this.webcam = new tmImage.Webcam(1000, 800, flip); // width, height, flip
        await this.webcam.setup(); // request access to the webcam
        await this.webcam.play();
        window.requestAnimationFrame(this.loop);

        // append elements to the DOM

        // console.log(document.getElementById("webcam-container"))
        document.getElementById("webcam-container").appendChild(this.webcam.canvas);
        // this.labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < this.maxPredictions; i++) { // and class labels
        //     this.labelContainer.appendChild(document.createElement("div"));
        // }
      };

    videoConstraints = {
        audio: false,
        video: { facingMode: "user" },
    };

    // webcamRef = React.useRef(null);

    // capture = React.useCallback(
    //     () => {
    //         const imageSrc = this.webcamRef.current.getScreenshot();
    //         return imageSrc;
    //     },
    //     [this.webcamRef]
    // )

    loop = async () => {
        this.webcam.update(); // update the webcam frame
        this.update();
        await this.predict();
        window.requestAnimationFrame(this.loop);
    }

    update() {
        // canvas = document.getElementById('canvas');
        // if (document.getElementById('canvas2')) {
        //     var img = new Image();
        //     // img.src = this.capture()
        //     // var img = capture()
        //     const ctx = this.canvas.getContext('2d');
        //     ctx.drawImage(img, 0, 0);

        //     const ctx2 = document.getElementById('canvas2').getContext('2d');
        //     ctx2.drawImage(img, 0, 0);
        // }
        // var img = new Image();
        // img.src = capture()
        // // var img = capture()
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(img, 0, 0);
    }
    
    predict = async () => {
        // predict can take in an image, video or canvas html element
        const prediction = await this.model.predict(this.webcam.canvas);
        var maxProb = 0
        var maxLabel = null
        for (let i = 0; i < this.maxPredictions; i++) {
            // const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // this.labelContainer.childNodes[i].innerHTML = classPrediction;

            if (prediction[i].probability > maxProb) {
                maxProb = prediction[i].probability
                maxLabel = prediction[i].className
            }

        }

        // setLabel(prediction[0].className);
        // setProb(prediction[0].probability);
        // prob = prediction[3].probability * 100
        // console.log(prob)
        this.setState({ label: maxLabel })
        this.setState({ prob: maxProb * 100 })
    }

    // loadModel()

    render() {
        var { prob } = this.state
        var { label } = this.state
    return (
        <>
        <div class="box">
            <div id="webcam-container" style={{position:'absolute', top:'10px',  left:'30px'}}></div>
            <div class="greenprogress" style={{position:'absolute', top:'700px', left:'120px'}}>
                <div style={{color:'#ffffff', fontSize:"25px", position:'absolute', top:'10px',  left:'30px'}}> {label} </div>
                <Line percent={prob} trailColor="#33987A88" trailWidth="7" strokeLinecap="square" strokeWidth="7" strokeColor="#00DDAD" style={{transition: '0.5s ease'}}/>
            </div>
        </div>
        {/* <div id="label-container"></div> */}
        {/* <ProgressBar now={60} /> */}
        {/* <div id="video-stream">
            <Webcam
            ref={webcamRef}
            // screenshotFormat = 'image/jpeg'
            forceScreenshotSourceSize="true"
            videoConstraints={videoConstraints}
             />
            
        </div> */}
        </>
    )
    }
}



// Load mobilenet.
// const model = await mobilenet.load();

// Get a reference to the bundled asset and convert it to a tensor
// const image = require('./../tstimg.png');
// const imageAssetPath = Image.resolveAssetSource(image);
// const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
// const imageData = await response.arrayBuffer();

// const imageTensor = decodeJpeg(imageData);

// const prediction = await model.classify(imageTensor);

// // Use prediction in app.
// setState({
//   prediction,
// });

export default Camera;