**This is a development/experimental branch of the repo. I am using it to explore other ways of 3d modelling - like that of many CAD programs.**

# Javascript-3D-Modeling-Program
This is a very basic 3D program made in javascript with the three.js library, that I started on the 6th of April 2020.

When it is finished, you should be able to create 3d assets (to do so you will click to add vertex points, connect them up, and extrude them to create 3d geometry, then apply modifiers [like subdivision and boolean] to the object), customise the colours and materials of the object, and export the asset as a 3d model (.obj - or something like that), or render the asset as a still image with support for directional lights, ambient lights, and multiple materials.

Right now I would say it's about 20% completed in terms of features.

# Contributing
I am quite new to **WEBGL** and  **THREE.JS**, so I would be grateful if you were able to contribute in any way! Before you do, please see if there is anything you could help with in the `issues` section - but if you would prefer to do something else, please open a new issue, and assign yourself to it. (Of course, there are multiple branches. The main/default one is 'master' but you can also develop any other branch you want to.)

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

----createCustomModel.js -> Code allowing the user to make a mesh by clicking to add vertices

----createPrebuiltModel.js -> Lets the user create a new object from the settings menu.

----transformInputs.js -> Lets the user edit the transform properties of the selected object.

----materialInputs.js -> Lets the user edit the material settings of the selected object.

----editMode.js -> Lets the user go into edit mode, and click to select faces, extrude them, etc.

----menus.js -> Handles things like opening and closing menus, as well as going into preview mode (preview mode has been paused on THIS branch).

----OrbitControls.js -> The OrbitControls library allowing the user to easily orbit and move around the scene.

----SubdivisionModifier.js -> The SubdivisionModifier library allowing the user to subdivide some geometry.

----three.js -> The THREE.js library file.
