import React from 'react';
import Webcam from "react-webcam";
import './App.css'

function Camera() {
    const videoConstraints = {
        audio: false,
        video: { facingMode: "user" },
        width: 1280,
        height: 1000
    };

    return (
        <div>
            <Webcam 
            height = {100 + '%'}
            width = {100 + '%'}
            videoConstraints={videoConstraints}/>
        </div>
    )
}

export default Camera;