import React, {useEffect, useRef} from "react";
import ImageCloseButton from "./ImageCloseButton";

import "./StaticImage.css";

type StaticImageProps = {
    predictCanvas: (canvas: HTMLCanvasElement) => void;
    image: File;
    setImageFile: (image: File | null) => void;
}

// Component for displaying our selected image file for prediction
function StaticImage({ predictCanvas, image, setImageFile }: StaticImageProps) {
    // display our image file on a canvas and call the predict function with that canvas
    const canvas = useRef<HTMLCanvasElement>(null);
    const display = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            // make an image to draw on the canvas
            const img = new Image();
            img.onload = () => {
                if (canvas.current) {
                    // draw the image on our canvas
                    canvas.current.width = img.width;
                    canvas.current.height = img.height;
                    const ctx = canvas.current.getContext("2d");
                    if (!!ctx) {
                        // draw our image on the context
                        ctx.drawImage(img,0,0);
                        // drawing is finished, run the prediction!
                        predictCanvas(canvas.current);
                    }
                }
            }

            // load the image from our reader
            if (e.target) {
                img.src = e.target.result as string;
                if (display.current) {
                    display.current.style.backgroundImage = `url(${e.target.result})`;
                }
            }
        }
        // read our image file and process it!
        reader.readAsDataURL(image);
    }, [image, predictCanvas, display]);

    return (
        <div id="static-image" ref={display}>
            <ImageCloseButton setImageFile={setImageFile} />
            <canvas ref={canvas} style={{display: "none"}} />
        </div>
    )
}

export default StaticImage;
