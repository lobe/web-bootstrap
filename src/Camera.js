import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import CameraMenu from './CameraMenu.js'
import "./App.css";

function Camera() {
  const [deviceId, setDeviceId] = React.useState("");
  const [devices, setDevices] = React.useState([]);
  const [imageSrc, setImageSrc] = useState("default image");
  const webcamRef = React.useRef(null);

  const videoConstraints = {
    audio: false,
    video: { facingMode: "user" },
    deviceId: deviceId,
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

  function handleDeviceChange(newDeviceId) {
    setDeviceId(newDeviceId)
  }

  const camSelectButton = devices.length > 1 ? <CameraMenu devices={devices}/> : <div></div>

  const deviceMap = devices ? 
  devices.map((device, key) => (
    <div>
      <p>{device.label || `Device ${key + 1}`}</p>
    </div>

  ))
  : <></>

  if (!deviceId && devices && devices.length > 0) {
    setDeviceId(devices[0].deviceId)
  }

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
      <CameraMenu devices={devices} deviceId = {deviceId} onChange={handleDeviceChange}/>
    </div>
  );
}

export default Camera;
