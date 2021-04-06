import React from "react";
import check from "../../Icons/check.svg";
import noCheck from "../../Icons/no-check.svg";

import "./SourceSelectorItem.css";


type SourceSelectorItemProps = {
    name: string,
    selected: boolean,
    onSelect: () => void
}

// Component for selecting the webcam source and flipping the image horizontally
function SourceSelectorItem({selected, onSelect, name}: SourceSelectorItemProps) {

    return (
        <div key={name} className="source-item-container" >
            <div className={`source-device${(selected) ? " source-selected" : ""}`}>
                {name}
            </div>
            <div onClick={() => onSelect()} className="source-radio-button">
                <img src={selected ? check : noCheck} alt={'Select device'} />
            </div>
        </div>
    )
}

export default SourceSelectorItem;
