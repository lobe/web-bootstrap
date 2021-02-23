import React, {FunctionComponent} from "react";
import './BlurContainer.css';

const BlurContainer: FunctionComponent = ({ children }) => {
    // simple container with rounded corners and a blurred translucent background
    return (
        <div className="blur-container">
            { children }
        </div>
    );
}

export default BlurContainer;
