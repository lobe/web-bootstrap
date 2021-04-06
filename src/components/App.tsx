import React, {useCallback, useState} from 'react';
import Camera from './camera/Camera';
import Prediction from './prediction/Prediction';
import ImageSelectorButton from './staticImage/ImageSelectorButton';
import StaticImage from './staticImage/StaticImage';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ModelWorker from "workerize-loader!../model/worker";

// create our web worker instance for running the tfjs model without blocking the UI thread
const modelWorker = ModelWorker();
// the filepaths to our exported signature.json and model.json files (in the public/model folder)
const signatureFile = process.env.PUBLIC_URL + `/model/signature.json`;
const modelFile = process.env.PUBLIC_URL + `/model/model.json`;
// load our model in the web worker
modelWorker.loadModel(signatureFile, modelFile);


function App() {
    // state for keeping track of our predictions -- map of {label: confidence} from running the model on an image
    const [predictions, setPredictions] = useState<{[key: string]: number} | undefined>(undefined);
    // state for using a static image from file picker
    const [imageFile, setImageFile] = useState<File | null>(null);

    // function to run the image from an html canvas element through our model
    const predictCanvas = useCallback((canvas: HTMLCanvasElement) => {
        // get the canvas context
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // get the pixel data from the full canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // run the async predict function and set the values to our state
            modelWorker.predict(imageData).then((results: {Confidences: {[label: string]: number}}) => {
                if (results) {
                    setPredictions(results.Confidences);
                }
            });
        }
    }, []);

    return (
        <div>
            <ImageSelectorButton setImageFile={setImageFile} imageFile={imageFile} />
            {
                !imageFile ? 
                <Camera predictCanvas={predictCanvas} predictions={predictions} /> :
                <StaticImage predictCanvas={predictCanvas} image={imageFile} setImageFile={setImageFile} />
            }
            <Prediction predictions={predictions}/>
        </div>
    );
}

export default App;
