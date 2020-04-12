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

document.getElementById('applySubdivision').addEventListener('click', function(){
  // Stage 1 -> For each face calculate what the average POINT is.
  // (A POINT can be defined as the average location between all the
  // vertices that make up that face).
  console.log('Executing subdivision algorithm stage 1...')
  
  // Stage 2 -> For each edge, add a new POINT (THIS POINT is actual geometry
  // instead of just a value). This POINT is located in the average position
  // between the 2 vertices that make up that edge.
  console.log('Executing subdivision algorithm stage 2...')
  
  // Stage 3 -> For each vertex, move it to the average point between:
  // 1) The X, Y, Z location of where it is now, AND
  // 2) The average X, Y, and Z locations between the surrounding face points.  
  console.log('Executing subdivision algorithm stage 3...')
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
