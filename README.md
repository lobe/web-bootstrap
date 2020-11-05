![](https://github.com/lobe/web-bootstrap/raw/master/assets/header.png)

[Lobe](http://lobe.ai/) is an easy to use free tool to help you start working with machine learning.

This project was created to help you bootstrap your Lobe project on the web. Built with [React](https://reactjs.org) and [Tensorflow.js](https://www.tensorflow.org/js).

## Installing Your Development Environment

You need to get you setup so you can build, launch, and play with your app. These instructions are written for macOS, the only system you can develop iOS apps on.

If you already have `git` installed and know how to clone this repo, skip to [Step 2](#step-2---installing-xcode).

If you prefer to use the [GitHub Desktop](https://desktop.github.com) app, click on the "Code" button above and click "Open with GitHub Desktop":

![](https://github.com/lobe/web-bootstrap/raw/master/assets/downloadProject.png)

### Step 1 - Install [Homebrew](http://brew.sh/) and [Git](https://git-scm.com)

Type the following into a Terminal window:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/newReadme/install.sh)"
brew doctor
brew install git
```

Now that we have installed `git`, you can clone this repo with the following command. You'll want to navigate to a folder in Terminal where you'd like to store these files. If you need help, here's a [gentle introduction to navigation in the terminal](http//www.youtube.com/watch?v=zw7Nd67_aFw).

```shell
git clone https://github.com/lobe/web-bootstrap
```

### Step 2 - Installing [Node](https://nodejs.org/en/)

Next, we’re going to get you setup to run Node applications. Node is a javascript runtime engine that will run our code on your computer. For managing Node versions, there’s a popular version manager app called `nvm` (https://github.com/nvm-sh/nvm), and we’re going to use it to install the right version of Node. To install `nvm`, run this command in your terminal:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```
After `nvm` is installed run the following commands to install the right version of Node:

```shell
cd <path to this repository>
nvm install
```

You can also use `n` or any other tool you'd like to get Node version 12.18.1 installed.

### Step 3 - Installing our node modules and running the app

First, still in this repo's directory, run:

```shell
npm install
```

And finally, let's start the app! By running the following you'll see the app pop up in your web browser:

```shell
npm start
```

## Exporting your model

Next, we're going to drop in your new model. So first, let's open your project in Lobe and export it by pressing `⌘-E` and selecting Tensorflow.

Once you have the tensorflow model, you're going to follow [these instructions for converting the model to tensorflow.js](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter). After that, drag in the converted model files into the `/public/model` folder to replace the exisiting sample model:

![](https://github.com/lobe/web-bootstrap/raw/master/assets/modeldrag.png)

Starting your app up again by running `yarn start` will reflect these changes and show you your model live! Congratulations! :tada:


## Deploying your app

Luckily for us, deploying on the web is much easier than on iOS or Android. You can deploy to a variety of cloud services, such as AWS, GCP, or Azure. One of the best choices is using GitHub pages: it's free and will give you a URL (`yourproject.github.io`) for you to use and share around the web. Because this is using tensorflow.js, all the inference is done client side, so using your app should remain fast for all users, regardless of how many there are! We recommend [this guide](https://github.com/gitname/react-gh-pages) that will take you through the steps.

## Tips and Tricks

You're more than welcome to use this app as a starting place for your own project. Below is a high level overview of the project to get you started. Like any good bootstrap app, this project has been kept intentionally simple. There are only two main components: the Camera and the Prediction.

### `Camera.js`
The Camera is responsible for displaying a live full screen view of the user's webcam. It can easily be modified to take input from any camera attached to your computer, so could hook this up to your sub telescope and use that!

### `Prediction.js`
Our Prediction component is the box in the lower left hand corner. It is responsible for displaying the prediction results and their confidences.

### Miscellaneous Pointers
* There's a config file in `/src` that has various config options for the app. 
* The prediction happens at a set interval (500ms), while the camera is kept showing a live feed regardless of the prediction frequency.
* The shared css in the `App.css`.
* All the code is commented, this should help you explore and configure to create your own version.

## Contributing

If you can think of anything you'd like to add, or bugs you find, please reach out! PRs will be openly accepted (if they keep project simple, bonus points for making it even simplier) and issues will be triaged.

For project ideas or feedback, please visit our community on [Reddit](https://www.reddit.com/r/Lobe/)!

We look forward to seeing the awesome projects you put out there into the world! Cheers!

![team sig](https://github.com/lobe/iOS-bootstrap/raw/master/assets/lobeteam.png)
