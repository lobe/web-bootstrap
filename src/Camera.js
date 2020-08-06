import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import CameraMenu from './CameraMenu.js'
import "./App.css";

function Camera() {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [imageSrc, setImageSrc] = useState("default image");
  const webcamRef = React.useRef(null);

  const videoConstraints = {
    audio: false,
    video: { facingMode: "user" },
  };

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      setImageSrc(webcamRef.current.getScreenshot());
      return imageSrc;
    }
  }, [webcamRef, imageSrc]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const camSelectButton = devices.length > 1 ? <CameraMenu/> : <div></div>

  const deviceMap = devices ? 
  devices.map((device, key) => (
    <div>
      <p>{device.label || `Device ${key + 1}`}</p>
    </div>

  ))
  : <></>

  return (
    <div className="camera" id="video-stream">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize="true"
        videoConstraints={videoConstraints}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <CameraMenu devices={devices}/>
    </div>
  );
}

export default Camera;
