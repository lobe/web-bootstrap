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
            height = {undefined}
            width = {100 + '%'}
            screenshotFormat = 'image/jpeg'
            forceScreenshotSourceSize="true"
            videoConstraints={videoConstraints}
            style={{
                height: "100vh",
                width: "100%",
                objectFit: "cover",
               position: "absolute"
             }}
             />
            
        </div>
    )
}

export default Camera;