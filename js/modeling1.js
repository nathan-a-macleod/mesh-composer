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

// The subdivison function [this feature has been paused]
document.getElementById('applySubdivision').addEventListener('click', function(){
  // Stage 1 -> For each face calculate where the average POINT is.
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
    
    //facePointsArray.push(facePointArray); // facePointsArray contains an X, Y and Z value for each face.
    
    // Uncomment this code to put a box at the locations to visualize it better:
    /*var MyBoxGeometry = new THREE.BoxGeometry();
    var MyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
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
  /* What needs to happen is is this. (currentElementMesh.geometry.vertices
  returns an array containing all the vertices in the mesh) It needs to get the
  first vertex in the array, and the second, and create a vertex halfway between
  the 2 vertices. Then do the same for the 3rd & 4th one, then 5th & 6th, etc.*/
  
  // https://threejs.org/docs/#api/en/geometries/EdgesGeometry -> THREE.js edges geometry might help
  var vertex1;
  var vertex2;
  var vertex3X;
  var vertex3Y;
  var vertex3Z;
  
  for (i=0; i<currentElementMesh.geometry.vertices.length; i++){
    vertex1 = currentElementMesh.geometry.vertices[i];
    vertex2 = currentElementMesh.geometry.vertices[i + 1];
    if (vertex2 != undefined){
      vertex3X = vertex1.x + vertex2.x / 2
      vertex3Y = vertex1.y + vertex2.y / 2
      vertex3Z = vertex1.z + vertex2.z / 2
      
      var MyBoxGeometry = new THREE.BoxGeometry();
      var MyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x000000}); // default color
      var MyBoxMesh = new THREE.Mesh(MyBoxGeometry, MyBoxMaterial);
      MyBoxMesh.position.x = vertex3X;
      MyBoxMesh.position.y = vertex3Y;
      MyBoxMesh.position.z = vertex3Z;
      MyBoxMesh.scale.set(0.03, 0.03, 0.03);
      scene.add(MyBoxMesh);
    }
  }
  
  // Stage 3 -> For each vertex, move it to the average point between:
  // 1) The X, Y, Z location of where it is now, AND
  // 2) The average X, Y, and Z locations between the surrounding face points.  
});

// The raycaster to enable the user to select the mesh when in edit mode
var raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 1;
var mouse = new THREE.Vector2();

function onMouseMove(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );

document.body.addEventListener('click', function(){
  // Find the colours of the object, so that when you go to 
  // a different edit mode selection mode (edge, vertex, etc),
  // it will reset the colours:
  
  
	raycaster.setFromCamera( mouse, camera );
  
	var intersects = raycaster.intersectObjects(scene.children);
  
  if (editModeSelectionMode == 'face'){
  	for (var i = 0; i < intersects.length; i++) {
	    for (var j = 1; j < intersects[i].object.geometry.faces.length; j++){
	      // intersects[i] = the object you click, intersects[i].face is the face you click on the object
	      intersects[i].face.color.r = 0.10;
	      intersects[i].face.color.g = 0.25;
	      intersects[i].face.color.b = 0.60;
	      intersects[i].object.geometry.colorsNeedUpdate = true;
	    }
    }
  }
});

// I didn't even notice this line - do I even need it?!:
var BoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );