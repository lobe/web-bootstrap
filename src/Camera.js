import React from 'react';
import Webcam from "react-webcam";
import './App.css'

function Camera() {
    const videoConstraints = {
        audio: false,
        video: { facingMode: "user" },
    };

    return (
        <div id="video-stream">
            <Webcam
            screenshotFormat = 'image/jpeg'
            forceScreenshotSourceSize="true"
            videoConstraints={videoConstraints}
             />
            
        </div>
    )
}

export default Camera;