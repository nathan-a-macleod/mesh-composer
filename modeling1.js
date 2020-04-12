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
  getObjectType();
  
  var facePointsArray = [];
  
  for (i=0; i<currentElementMesh.geometry.faces.length; i++){
    //console.log(currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].a]);
    
    var facePointX = (currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].a].x + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].b].x + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].c].x) / 3;
    var facePointY = (currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].a].y + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].b].y + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].c].y) / 3;
    var facePointZ = (currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].a].z + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].b].z + currentElementMesh.geometry.vertices[currentElementMesh.geometry.faces[i].c].z) / 3;
    
    var facePointArray = [];
    facePointArray.push(facePointX);
    facePointArray.push(facePointY);
    facePointArray.push(facePointZ);
    
    facePointsArray.push(facePointArray);
    // facePointsArray contains an X, Y and Z value for each face,
    // console.log(facePointsArray);
    
    // Uncomment this code to put a box at the locations to visualize it better:
    /*var MyBoxGeometry = new THREE.BoxGeometry();
    var MyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x000000}); // default color
    var MyBoxMesh = new THREE.Mesh(MyBoxGeometry, MyBoxMaterial);
    MyBoxMesh.position.x = facePointX;
    MyBoxMesh.position.y = facePointY;
    MyBoxMesh.position.z = facePointZ;
    MyBoxMesh.scale.set(0.03, 0.03, 0.03);
    scene.add(MyBoxMesh);*/
  }
  
  // Stage 2 -> For each edge, add a new POINT (THIS POINT is actual geometry
  // instead of just a value). This POINT is located in the average position
  // between the 2 vertices that make up that edge.
  
  // Stage 3 -> For each vertex, move it to the average point between:
  // 1) The X, Y, Z location of where it is now, AND
  // 2) The average X, Y, and Z locations between the surrounding face points.  
});

function deleteCurrentObject(){
  getObjectType()
  scene.remove(currentElementMesh);
  scene.remove(currentElementLine);
}