// First, create functions so that you can replace the current shape:
var cubeButton = document.getElementById('cubeButton');
var cylinderButton = document.getElementById('cylinderButton');
var PlaneButton = document.getElementById('PlaneButton');
var SphereButton = document.getElementById('SphereButton');
var TorusButton = document.getElementById('TorusButton');
var confirmMessage = 'Warning: If you add a new object, you will delete the object you have already (you can only have one object in a scene right now). Press OK to proceed, or cancel to cancel.';

cubeButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateBoxGeometry();
    resetTransforms();
  }
});

cylinderButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateCylinderGeometry();
    resetTransforms();
  }
});

PlaneButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreatePlaneGeometry();
    resetTransforms();
  }
});

SphereButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateSphereGeometry();
    resetTransforms();
  }
});

TorusButton.addEventListener('click', function(){
  if(confirm(confirmMessage)){
    deleteCurrentObject();
    CreateTorusGeometry();
    resetTransforms();
  }
});

function deleteCurrentObject(){
  if (currentObject == 'cube'){
    scene.remove(BoxMesh);
    scene.remove(BoxLine);
  } else if (currentObject == 'cylinder'){
    scene.remove(CylinderMesh);
    scene.remove(CylinderLine);
  } else if (currentObject == 'plane'){
    scene.remove(PlaneMesh);
    scene.remove(PlaneLine);
  } else if (currentObject == 'sphere'){
    scene.remove(SphereMesh);
    scene.remove(SphereLine);
  } else if (currentObject == 'torus'){
    scene.remove(TorusMesh);
    scene.remove(TorusLine);
  }
}