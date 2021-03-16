import * as tf from '@tensorflow/tfjs';

const LEGACY_VERSION = -1;
const SUPPORTED_VERSIONS = [LEGACY_VERSION, 1];  // use -1 for legacy Lobe exports without the version property

class ImageClassificationModel {
    signaturePath: string;
    signature: any;
    modelPath: string;
    height: number = 224;
    width: number = 224;
    outputName: string = '';
    inputKey = "Image";
    outputKey = "Confidences";
    labelKey = "Label";
    labels: string[] = [];
    version?: number;
    model?: tf.GraphModel;

    constructor(signaturePath: string, modelPath: string) {
        /* Construct our model from the path to Lobe's exported signature.json and model.json files */
        this.signaturePath = signaturePath;
        this.modelPath = modelPath;
    }

    async load() {
        /* Load our TensorFlow.js GraphModel */
        const signatureFile = await fetch(this.signaturePath);
        this.signature = await signatureFile.json();
        [this.width, this.height] = this.signature.inputs[this.inputKey].shape.slice(1,3);
        this.outputName = this.signature.outputs[this.outputKey].name;
        this.labels = this.signature.classes[this.labelKey];
        this.version = this.signature.export_model_version || LEGACY_VERSION;
        if (!this.version || !SUPPORTED_VERSIONS.includes(this.version)) {
            const versionMessage = `Lobe export model version ${this.version} not explicitly supported by this code. Supported versions are [${SUPPORTED_VERSIONS}]. You can comment out this error to double check the model code will work, or please pull latest changes from https://github.com/lobe/web-bootstrap or file an issue for support.`;
            console.error(versionMessage);
            throw new Error(versionMessage);
        }
        this.model = await tf.loadGraphModel(this.modelPath);
    }

    dispose() {
        /* Free up the memory used by the TensorFlow.js GraphModel */
        if (this.model) {
            this.model.dispose();
            this.model = undefined;
        }
    }

    async predict(imageData: ImageData) {
        /*
        Given an input image data from a Canvas,
        preprocess the image into a tensor with pixel values of [0,1], center crop to a square
        and resize to the image input size, then run the prediction!
         */
        if (this.model) {
            // use tf tidy to dispose of intermediate tensors automatically
            const confidencesTensor = tf.tidy(() => {
                // create a tensor from the canvas image data
                const image = tf.browser.fromPixels(imageData);
                const [imgHeight, imgWidth] = image.shape.slice(0,2);
                // convert image to 0-1
                const normalizedImage = tf.div(image, tf.scalar(255));
                // make into a batch of 1 so it is shaped [1, height, width, 3]
                const batchImage: tf.Tensor4D = tf.expandDims(normalizedImage);
                // center crop and resize
                let top = 0;
                let left = 0;
                let bottom = 1;
                let right = 1;
                if (imgHeight !== imgWidth) {
                    // the crops are normalized 0-1 percentage of the image dimension
                    const size = Math.min(imgHeight, imgWidth);
                    left = (imgWidth - size) / 2 / imgWidth;
                    top = (imgHeight - size) / 2 / imgHeight;
                    right = (imgWidth + size) / 2 / imgWidth;
                    bottom = (imgHeight + size) / 2 / imgHeight;
                }
                // center crop our image and resize it to the size found in signature.json
                const croppedImage = tf.image.cropAndResize(
                    batchImage, [[top, left, bottom, right]], [0], [this.height, this.width]
                );
                // run the model on our image and await the results as an array
                if (this.model) {
                    return this.model.execute(
                        {[this.signature.inputs[this.inputKey].name]: croppedImage}, this.outputName
                    );
                }
            }) as (tf.Tensor | undefined);
            if (confidencesTensor) {
                // grab the array of values from the tensor data
                const confidencesArray = await confidencesTensor.data();
                // now that we have the array values, we can dispose the tensor and free memory
                confidencesTensor.dispose();
                // return a map of [label]: confidence computed by the model
                // the list of labels maps in the same index order as the outputs from the results
                return {
                    [this.outputKey]: this.labels.reduce(
                        (returnConfidences, label, idx) => {
                            return {[label]: confidencesArray[idx], ...returnConfidences}
                        }, {}
                    )
                }
            }
        } else {
            console.error("Model not loaded, please await this.load() first.");
        }
    }
}

export default ImageClassificationModel
