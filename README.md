![](./mesh-composer-output.png)

# Javascript-3D-Modeling-Program
This is a fairly basic 3D program made in javascript with the three.js library, that I started on the 6th of April 2020.

When it is finished, you will be able to create 3d assets (to do so you will click to add vertex points, connect them up, and extrude them to create 3d geometry, then apply modifiers [like subdivision and boolean] to the object), customise the colours and materials of the object and render the scene as a still image with support for directional lights, ambient lights, and multiple materials.
It is based on being able to make a scene out of basic, low poly, abstract components.

Right now I would say it's about 50 or 60% completed in terms of features.

# Contributing
I would be grateful if you were able to contribute in any way! Feel free to either find something to help with in the `issues` section - or if you would prefer to do something else, just open a new issue, and assign yourself to it.

If you want to work on an already existing issue, please comment on the issue, and I will assign you to it, so that I can keep things organised.

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

----transformInputs.js -> Lets the user edit the transform properties of the selected object (movement, rotation, scale).

----materialInputs.js -> Lets the user edit the material settings of the selected object.

----editMode.js -> Lets the user go into edit mode, and click to select faces, extrude them, transform them, etc.

----menus.js -> Handles things like opening and closing menus, as well as going into preview mode (preview mode has been paused on THIS branch).

----OrbitControls.js -> The OrbitControls library allowing the user to easily orbit and move around the scene.

----SubdivisionModifier.js -> The SubdivisionModifier library allowing the user to subdivide selected geometry.

----three.js -> The THREE.js library file.
