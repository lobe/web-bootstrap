import React from "react";
import BlurContainer from "../BlurContainer";
import "./SourceSelector.css";

type SourceSelectorProps = {
    devices: MediaDeviceInfo[]
    deviceId?: string,
    setDeviceId: (deviceId: string) => void,
    imageFlip: boolean,
    setImageFlip: (imageFlip: boolean) => void,
}

// Component for selecting the webcam source and flipping the image horizontally
function SourceSelector({devices, deviceId, setDeviceId, imageFlip, setImageFlip}: SourceSelectorProps) {
    return (
        <div id="camera-select">
            <BlurContainer>
                <select
                    onChange={e => setDeviceId(e.target.value)}
                    value={deviceId}
                >
                    {devices.map((device, key) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Device ${key + 1}`}
                        </option>
                    ))}
                </select>
                <div>
                    <label htmlFor="image-flip-checkbox">Flip Image</label>
                    <input id="image-flip-checkbox" type="checkbox" checked={imageFlip} onChange={e => setImageFlip(e.target.checked)} />
                </div>
            </BlurContainer>
        </div>
    )
}

export default SourceSelector;
