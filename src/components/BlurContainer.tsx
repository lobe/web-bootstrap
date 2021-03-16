import React, {FunctionComponent} from "react";
import './BlurContainer.css';

type BlurContainerType = {
    additionalClassname?: string
}

const BlurContainer: FunctionComponent<BlurContainerType> = ({ additionalClassname, children }) => {
    // simple container with rounded corners and a blurred translucent background
    let className = "blur-container";
    if (!!additionalClassname) {
        className = className + ` ${additionalClassname}`;
    }
    return (
        <div className={className}>
            { children }
        </div>
    );
}

export default BlurContainer;
