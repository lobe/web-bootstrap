/*
This file is our web worker to run the TensorFlow.js models asynchronously and not block the UI thread.
 */
import ImageClassificationModel from "./imageClassificationModel";

let model: ImageClassificationModel;

export async function loadModel(signaturePath: string, modelPath: string) {
    // loads our exported Lobe model from the signature and model files
    disposeModel();
    model = new ImageClassificationModel(signaturePath, modelPath);
    await model.load();
}

export function disposeModel() {
    // frees up memory used by the model
    if (model) {
        model.dispose();
    }
}

export async function predict(data: ImageData) {
    // run the input data through the model
    if (model) {
        return await model.predict(data);
    } else {
        console.log('Predict called without model loaded.')
    }
}
