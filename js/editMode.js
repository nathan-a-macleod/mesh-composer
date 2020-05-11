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
    
    clickToSelectFaces(); // Runs the function allowing you to click to select faces
  } else { // Turning edit mode off...
    editMode = false;
    scene.remove(editModeLine);
  }
});

// A function allowing you to click to select faces.
function clickToSelectFaces(){
  console.log("Debugging Message: Loading...")
}

