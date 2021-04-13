import React, {useEffect, useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import SourceSelector from "./SourceSelector";
import "./Camera.css";

type CameraProps = {
    predictCanvas: (canvas: HTMLCanvasElement) => void;
    predictions?: { [label: string]: number };
}

// Our webcam display and capture component
function Camera({ predictCanvas, predictions }: CameraProps) {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
    const [imageFlip, setImageFlip] = useState(true);
    const webcamRef = useRef<Webcam>(null);
    const [selectorVisible, setSelectorVisible] = useState(false);

    // handle any webcam plugged into the computer
    // https://github.com/mozmorris/react-webcam#show-all-cameras-by-deviceid
    const handleDevices = useCallback(
        (mediaDevices: MediaDeviceInfo[]) => {
            // find all the webcams
            const videoDevices = mediaDevices.filter(({kind}) => kind === "videoinput");
            setDevices(videoDevices);
            // set our initial webcam to be the first in the list
            if (videoDevices.length > 0) {
                setDeviceId(videoDevices[0].deviceId);
            }
        },[setDevices, setDeviceId]
    );
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    // function to grab the current frame drawn on canvas from the webcam
    const getCanvas: () => Promise<HTMLCanvasElement | undefined> = useCallback(async () => {
        let newImage;
        if (webcamRef.current) {
            newImage = webcamRef.current.getCanvas();
            if (newImage) {
                return newImage;
            }
        }
    }, [webcamRef]);

    // helper for waiting in our loop when the camera is loading (getting the image)
    const sleep = useCallback((ms: number) => {
        return new Promise<NodeJS.Timeout>(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    }, []);

    // while we have the webcam mounted, predict frames as fast as we get new predictions back from the model
    useEffect(() => {
        getCanvas().then(async (canvas: HTMLCanvasElement | undefined) => {
            let currentCanvas = canvas;
            while (!currentCanvas) {
                // if no canvas, wait 500ms and try again
                await sleep(500);
                currentCanvas = await getCanvas();
            }
            if (currentCanvas) {
                predictCanvas(currentCanvas);
            }
        })
    }, [sleep, predictions, deviceId, getCanvas, predictCanvas])

    return (
        <div id="video-container" onClick={() => setSelectorVisible(false)}>
            <SourceSelector
                devices={devices}
                deviceId={deviceId}
                setDeviceId={setDeviceId}
                imageFlip={imageFlip}
                setImageFlip={setImageFlip}
                selectorVisible={selectorVisible}
                setSelectorVisible={setSelectorVisible}
            />
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                forceScreenshotSourceSize={true}
                screenshotQuality={1}
                audio={false}
                videoConstraints={{
                    width: {ideal: 1920},
                    height: {ideal: 1080},
                    deviceId: !!deviceId ? {exact: deviceId} : undefined
                }}
                mirrored={imageFlip}
            />
        </div>
    );
}

export default Camera;
