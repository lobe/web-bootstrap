![](https://github.com/lobe/web-bootstrap/raw/niceDeveloperExperience/assets/header.png)

[Lobe](http://lobe.ai/) is an easy to use free tool to help you start working with machine learning.

This project was created to help you bootstrap your Lobe project on the web. Built with [React](https://reactjs.org) and [Tensorflow.js](https://www.tensorflow.org/js).

## Table of contents

In the next few sections we’ll take you through the basics of creating your new project and getting started. At a high level, we’ll be:

1. Installing your Development Environment
2. Exporting your model from Lobe and integrating it into the code
3. Deploying your app to the web
4. Tips and Tricks for creating your own customer version of this app
5. Contributing

## Installing Your Development Environment

In the stage we’re going to get your setup so you can launch and play with your app. These instructions are written for macOS, but will be fairly similar on a Window machine. To start, we’re going to download this repository. To do this, we need to install a few things.

### Step 1 – Install [Homebrew](http://brew.sh/)

First, [open a terminal window](http//www.youtube.com/watch?v=zw7Nd67_aFw).

Next, copy & paste the following into a terminal window and hit return.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew doctor
```

You will be offered to install the *Command Line Developer Tools* from *Apple*. Confirm by clicking *Install*. After the installation finished, continue installing *Homebrew* by hitting return again.

### Step 2 – Installing *Git*

Feel free to skip second step if you already have git installed, or if you'd perfer to use the [GitHub Desktop](https://desktop.github.com) app. Otherwise, Copy & paste the following into the terminal window and hit return.

```shell
brew install git
```

Now that we git installed, you can clone this repo with the following command. You'll want to navigate to a folder in terminal where you'd like to store these files. If you need help, here's a [gentle introduction to navigation in the terminal](https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855).

```shell
git clone https://github.com/lobe/web-bootstrap.git
```

### Step 3 - Installing *Node*

Next, we’re going to get you setup to run Node applications. Node is a javascript runtime engine that will run our code on your computer. For managing Node versions, there’s a popular app called `nvm` (https://github.com/nvm-sh/nvm), and we’re going to use it to install the right version of Node. To install `nvm`, run this command in your terminal:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```
After `nvm` is installed run the following commands to install the right version of Node:

```shell
cd <path to this repository>
nvm install
```

You can also use `n` or any other tool you'd like to get Node version 12.18.1 installed.

### Step 4 - Installing Yarn and the node modules

First, let's install `yarn`. It's a package manager that will help us install all of our javascript packages.

```shell
brew install yarn
```

Next, still in this repo's directory, run:

```shell
yarn install
```

And finally, let's start the app! By running the following you'll see the app pop up in your web browser:

```shell
yarn start
```

## Exporting your model

Next, we're going to drop in your new model. So first, let's open your project in Lobe and export it by pressing `⌘-E` and selecting Tensorflow:

![](https://github.com/lobe/web-bootstrap/raw/niceDeveloperExperience/assets/exportHeader.png)

Once you have the tensorflow model, you're going to follow [these instructions for converting the model to tensorflow.js](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter). After that, drag in the converted model files into the `/public/model` folder to replace the exisiting sample model:

![](https://github.com/lobe/web-bootstrap/raw/niceDeveloperExperience/assets/modeldrag.png)

Starting your app up again by running `yarn start` will reflect these changes and show you your model live! Congradulations! :tada:


## Deploying your app

Luckily for us, deploying on the web is much easier then on iOS or Android. You can deploy to a varitiy of cloud services, such as AWS, GCP, or Azure. One of the best choices is using GitHub pages, it's free and will give you a URL `yourproject.github.io` for you to use and share around the web. Because this is using tensorflow.js all the machine learning inference is done client side, so using your app should remain fast for all users, regardness of how many there are! There's a recomended guide [here](https://github.com/gitname/react-gh-pages) that will take you through the steps.

## Tips and Tricks

Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna.

Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit.

Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor.

Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam.

Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit.

Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.

Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

## Contributing

Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna.

Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit.

Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor.

Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam.

Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit.

Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.

Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
