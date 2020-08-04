import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import './App.css'

function Camera() {
    const videoConstraints = {
        audio: false,
        video: { facingMode: "user" },
    };

    const webcamRef = React.useRef(null);
    const [imageSrc, setImageSrc] = useState("default image");

    const capture = React.useCallback(
        () => {
            if (webcamRef.current) {
                setImageSrc(webcamRef.current.getScreenshot())
                return imageSrc;
            }
        },
        [webcamRef, imageSrc]
    )

    return (
        <div id="video-stream">
            <Webcam
            ref={webcamRef}
            screenshotFormat = 'image/jpeg'
            forceScreenshotSourceSize="true"
            videoConstraints={videoConstraints}
             />
        </div>
    )
}

export default Camera;