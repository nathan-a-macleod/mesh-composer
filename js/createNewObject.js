// First, create functions so that you can replace the current shape:
var cubeButton = document.getElementById('cubeButton');
var cylinderButton = document.getElementById('cylinderButton');
var PlaneButton = document.getElementById('PlaneButton');
var SphereButton = document.getElementById('SphereButton');
var TorusButton = document.getElementById('TorusButton');
var confirmMessage = 'Warning: If you add a new object, you will delete the object you have already (you can only have one object in a scene right now). Press OK to proceed, or cancel to cancel.';

// Code to add a new object when you click on the button
cubeButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateBoxGeometry();
    resetTransforms();
    setColor();
  }
});

cylinderButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateCylinderGeometry();
    resetTransforms();
    setColor();
  }
});

PlaneButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreatePlaneGeometry();
    resetTransforms();
    setColor();
  }
});

SphereButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateSphereGeometry();
    resetTransforms();
    setColor();
  }
});

TorusButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateTorusGeometry();
    resetTransforms();
    setColor();
  }
});

// Function to delete the current object that you have now
function deleteCurrentObject(){
  getObjectType()
  scene.remove(currentElementMesh);
  scene.remove(currentElementLine);
}

document.getElementById('faceSelectButton').addEventListener('click', function(){
  faceSelectMode();
});

document.getElementById('edgeSelectButton').addEventListener('click', ()=> {
  edgeSelectMode();
});

document.getElementById('vertexSelectButton').addEventListener('click', ()=> {
  vertexSelectMode();
});

function faceSelectMode(){
  document.getElementById('selectionModeText2').innerHTML = 'Face Select';
  editModeSelectionMode = 'face';
}

function edgeSelectMode(){
  document.getElementById('selectionModeText2').innerHTML = 'Edge Select';
  editModeSelectionMode = 'edge';
}

function vertexSelectMode(){
  document.getElementById('selectionModeText2').innerHTML = 'Vertex Select';
  editModeSelectionMode = 'vertex';
}

// Button at the bottom of the screen to toggle between edit modes.
document.getElementById('selectionModeBlock').addEventListener('click', function(){
  if (editModeSelectionMode == 'face'){
    edgeSelectMode();
    editModeSelectionMode = 'edge';
  } else if (editModeSelectionMode == 'edge'){
    vertexSelectMode();
    editModeSelectionMode = 'vertex';
  } else if (editModeSelectionMode == 'vertex'){
    document.getElementById('selectionModes').style.display = 'none';
    document.getElementById('selectionModeText2').innerHTML = 'Edit mode is off.';
    editModeSelectionMode = 'editModeOff';
    camera.layers.toggle(1);
  } else if (editModeSelectionMode == 'editModeOff'){
    editModeSelectionMode = 'editModeOn';
    camera.layers.toggle(1);
    //document.getElementById('selectionModes').style.display = 'block';
    faceSelectMode(); // Needs to be on face select mode by default
  }
});
