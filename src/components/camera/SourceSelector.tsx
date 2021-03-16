import React, {useState} from "react";
import SquareButton from "../SquareButton";
import BlurContainer from "../BlurContainer";
import SourceSelectorItem from "./SourceSelectorItem";
import gear from "../../svg/gear.svg";

import "./SourceSelector.css";
import check from "../../svg/check.svg";
import noCheck from "../../svg/no-check.svg";


type SourceSelectorProps = {
    devices: MediaDeviceInfo[]
    deviceId?: string,
    setDeviceId: (deviceId: string) => void,
    imageFlip: boolean,
    setImageFlip: (imageFlip: boolean) => void,
    selectorVisible: boolean,
    setSelectorVisible: (visible: boolean) => void
}

// Component for selecting the webcam source and flipping the image horizontally
function SourceSelector({devices, deviceId, setDeviceId, imageFlip, setImageFlip, selectorVisible, setSelectorVisible}: SourceSelectorProps) {
    const [hovering, setHover] = useState(false);

    return (
        <div id="camera-select-button" onClick={(e) => e.stopPropagation()}>
            <SquareButton onClick={() => setSelectorVisible(!selectorVisible)} setHover={setHover}>
                <img id="gear-icon" src={gear} alt={"Gear Icon"} className={selectorVisible || hovering ? "gear-rotated" : undefined} />
            </SquareButton>
                <BlurContainer additionalClassname={`source-selector${selectorVisible ? " source-expanded" : ""}`}>
                    {devices.map((device, key) => (
                        <SourceSelectorItem
                            name={device.label || `Device ${key + 1}`}
                            onSelect={() => setDeviceId(device.deviceId)}
                            selected={device.deviceId === deviceId}
                        />
                    ))}
                    <div className="toggle-container">
                        <div className="toggle-item-container">
                            <div className={`toggle-item source-device${(imageFlip) ? " source-selected" : ""}`}>
                                {"Flip Image"}
                            </div>
                            <div onClick={() => setImageFlip(!imageFlip)} className="toggle-radio-button">
                                <img src={imageFlip ? check : noCheck} alt={'Flip Webcam Button'} />
                            </div>
                        </div>
                    </div>
                </BlurContainer>

        </div>
    )
}

export default SourceSelector;
