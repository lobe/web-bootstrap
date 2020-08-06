import React from 'react';
import Webcam from "react-webcam";
import './App.css'

function Camera() {
    const videoConstraints = {
        audio: false,
        video: { facingMode: "user" },
    };

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            return imageSrc;
        },
        [webcamRef]
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