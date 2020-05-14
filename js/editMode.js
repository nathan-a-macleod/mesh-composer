var shiftKeyDown = false;

// Handles a variable to see whether the shift key (keyCode 16) is down - if it is, then it will not clear the selection
document.body.addEventListener("keydown", function(event){
  if (event.keyCode == 16){
    shiftKeyDown = true;
  }
});

document.body.addEventListener("keyup", function(event){
  if (event.keyCode == 16){
    shiftKeyDown = false;
  }
});

document.getElementById("editMesh").addEventListener("click", function(){
  if (editMode == false){ // Turning edit mode on...
    editMode = true;
    
    editModeEdges = new THREE.WireframeGeometry(scene.getObjectByName(selectedSceneObject).geometry);
    editModeLine = new THREE.LineSegments(editModeEdges, new THREE.LineBasicMaterial({color: 0x3f68d9}));
    editModeLine.material.color.convertSRGBToLinear();
    
    // Set the position of the wireframe to be the same as the object (the same as whats in the input fields - the input fields have the same value as the object) -- make it line up
    editModeLine.position.x = document.getElementById('translationX').value;
    editModeLine.position.y = document.getElementById('translationY').value;
    editModeLine.position.z = document.getElementById('translationZ').value;
    
    editModeLine.rotation.x = THREE.Math.degToRad(document.getElementById('rotationX').value);
    editModeLine.rotation.y = THREE.Math.degToRad(document.getElementById('rotationY').value);
    editModeLine.rotation.z = THREE.Math.degToRad(document.getElementById('rotationZ').value);
    
    editModeLine.scale.x = document.getElementById('scaleX').value;
    editModeLine.scale.y = document.getElementById('scaleY').value;
    editModeLine.scale.z = document.getElementById('scaleZ').value;
    scene.add(editModeLine);
  } else { // Turning edit mode off...
    editMode = false;
    scene.remove(editModeLine);
    
    // Put the color of all the faces back to what it was before (clear the selection):
    for (var j = 0; j < scene.getObjectByName(selectedSceneObject).geometry.faces.length; j++){
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.r = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.g = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.b = 1;
      scene.getObjectByName(selectedSceneObject).geometry.colorsNeedUpdate = true;
    }
  }
});

document.body.addEventListener('click', function(){
  if (editMode == true){
    clickToSelectFaces();
  }
});

// A function allowing you to click to select faces (did it in a different function just to make it more organised).
function clickToSelectFaces(){
  // Put the color of all the faces back to what it was before (clear the selection) -- if the shift key isn't down:
  if (shiftKeyDown == false){
    for (var j = 0; j < scene.getObjectByName(selectedSceneObject).geometry.faces.length; j++){
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.r = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.g = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.b = 1;
      scene.getObjectByName(selectedSceneObject).geometry.colorsNeedUpdate = true;
    }
  }
  
  var mouse = new THREE.Vector2();
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
  var raycaster = new THREE.Raycaster();
  raycaster.layers.set(5); // The same layer as the objects
  //raycaster.params.Line.threshold = 1;
  
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
  
	if ((intersects[0] != null) && (intersects[0] != undefined)) { // See if the ray intersected anything
    intersects[0].face.color.setHex(0x3f68d9);
    intersects[0].face.color.convertSRGBToLinear();
    intersects[0].object.geometry.colorsNeedUpdate = true;
    selectedSceneFace = [];
    selectedSceneFace.push(intersects[0].face) //Store value of the selected face to the array (array variable is defined in app.js)
  }
}

