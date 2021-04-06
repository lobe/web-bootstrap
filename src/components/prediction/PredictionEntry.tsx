import React from "react";
import "./PredictionEntry.css";

type PredictionEntryProps = {
    label: string
    confidence?: number
    top?: boolean
}

function PredictionEntry({label, confidence, top}: PredictionEntryProps) {
    // render the predicted label and a bar representing the confidence value
    // make the top confidence value green
    return (
        <div key={label} className="prediction-entry">
            {label}
            {!!confidence ?
                <div
                    className={"prediction-bar" + (top ? " prediction-green" : "")}
                    style={{width: (confidence*100).toString() + "%"}}
                />
            : null}
        </div>
    );
}

export default PredictionEntry;
