import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./App.css";

function Camera() {
  const [devices, setDevices] = React.useState([]);
  const [imageSrc, setImageSrc] = useState("");
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

  // use this if you'd like to handle using any webcam plugged into a users computer
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

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
    </div>
  );
}

export default Camera;
