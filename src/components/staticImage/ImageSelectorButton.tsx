import React, {useEffect, useRef} from "react";
import SquareButton from "../SquareButton";
import gallery from "../../Icons/gallery.svg";

import "./ImageSelectorButton.css";

type ImageSelectorButtonProps = {
    setImageFile: (image: File | null) => void;
    imageFile: File | null;
};

// Component for selecting an image file for prediction
function ImageSelectorButton({setImageFile, imageFile}: ImageSelectorButtonProps) {
    // ref to the hidden file input element
    const fileInput = useRef<HTMLInputElement>(null);

    // if we have a null file (from clearing the image), clear the file input value
    useEffect(
        () => {
            if (!imageFile && fileInput.current) {
                fileInput.current.value = "";
            }
        },
        [imageFile, fileInput]
    )

    // make an onclick that will open the file dialog
    const onClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    // set our image file from the picker
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    }

    return (
        <div
            id="image-select-button"
            onClick={onClick}
        >
            <SquareButton>
                <img id="gallery-icon" src={gallery} alt={"File Selector"} />
            </SquareButton>
            <input ref={fileInput} type="file" accept="image/*" onChange={onChange} style={{display: "none"}} />
        </div>
    )
}

export default ImageSelectorButton;
