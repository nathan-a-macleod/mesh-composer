**Note: This branch is in development - it isn't the master branch.**

**This branch is different to the master branch because it will allow you to click to place 2d points, then THREE.extrudeGeometry (or something like that) will turn it into 3D. It will be well suited to things like arch-vis and may have pre-build assets like trees, chairs, etc to place around your model.**

# Javascript-3D-Modeling-Program
This is a very basic 3D program made in javascript with the three.js library, that I started on the 6th of April 2020. When it is finished, you should be able to click to place vertices, connect them up with lines & edges, turn it into 3d by extruding it, add in assets like trees and chairs, and export the asset(s).

Right now it is probably 15-20% completed in terms of features. A few more things to add would be thr ability to do basic 3d modeling, and eventually being able to export an asset you have created. Here is the live GitHub pages deployment:

https://jacob-and-nathan.github.io/Javascript-3D-Modeling-Program/

# Contributing
I am quite new to **WEBGL** and  **THREE.JS**, so I would be grateful if you were able to contribute in any way! Before you do, please see if there is anything you could help with in the `issues` section - but if you would prefer to do something else, please open a new issue, and assign yourself to it. 

If you want to work on an already existing issue, please comment on the issue, and I will assign you to it, so that I can keep things organised.
If there is an issue you want to work on that already has someone else assigned, then I may or may not assign you to it, depending on what the status is.

Before you create a pull request, please make sure you have updated the file descriptions below if you have added any files, or significantly changed them.

Also, there is an issue for any questions or comments you would like to ask.

# File Descriptions
This is a description of all the files in the repository:

ROOT DIRECTORY (folder):

--- --- --- --- --- ---

--LICENSE.md -> File containing what the license is.

--README.md -> This file.

--index.html -> The main HTML file.

--style.css -> The main CSS file.

--- --- --- --- --- --- 
 
--JS (folder):

----app.js -> The main javascript file with setup for THREE.js, etc.

----cameraOrbit.js -> Code allowing the camera to orbit the scene.

----menus.js -> Handles things like opening and closing menus, as well as going into preview mode.

----createBaseModel.js -> Allows the user to click to create vertices, etc.

----three.js -> The THREE.js library file.