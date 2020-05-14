function resetInputs(){
  document.getElementById('translationX').value = 0;
  document.getElementById('translationY').value = 0;
  document.getElementById('translationZ').value = 0;
  
  document.getElementById('rotationX').value = THREE.Math.degToRad(0);
  document.getElementById('rotationY').value = THREE.Math.degToRad(0);
  document.getElementById('rotationZ').value = THREE.Math.degToRad(0);

  document.getElementById('scaleX').value = 1;
  document.getElementById('scaleY').value = 1;
  document.getElementById('scaleZ').value = 1;
}

function transformInputs(){
  scene.getObjectByName(selectedSceneObject).position.x = document.getElementById('translationX').value;
  scene.getObjectByName(selectedSceneObject).position.y = document.getElementById('translationY').value;
  scene.getObjectByName(selectedSceneObject).position.z = document.getElementById('translationZ').value;
  
  scene.getObjectByName(selectedSceneObject).rotation.x = THREE.Math.degToRad(document.getElementById('rotationX').value);
  scene.getObjectByName(selectedSceneObject).rotation.y = THREE.Math.degToRad(document.getElementById('rotationY').value);
  scene.getObjectByName(selectedSceneObject).rotation.z = THREE.Math.degToRad(document.getElementById('rotationZ').value);
  
  scene.getObjectByName(selectedSceneObject).scale.x = document.getElementById('scaleX').value;
  scene.getObjectByName(selectedSceneObject).scale.y = document.getElementById('scaleY').value;
  scene.getObjectByName(selectedSceneObject).scale.z = document.getElementById('scaleZ').value;
  
  if (editMode == true){
    editModeLine.position.x = document.getElementById('translationX').value;
    editModeLine.position.y = document.getElementById('translationY').value;
    editModeLine.position.z = document.getElementById('translationZ').value;
    
    editModeLine.rotation.x = THREE.Math.degToRad(document.getElementById('rotationX').value);
    editModeLine.rotation.y = THREE.Math.degToRad(document.getElementById('rotationY').value);
    editModeLine.rotation.z = THREE.Math.degToRad(document.getElementById('rotationZ').value);
    
    editModeLine.scale.x = document.getElementById('scaleX').value;
    editModeLine.scale.y = document.getElementById('scaleY').value;
    editModeLine.scale.z = document.getElementById('scaleZ').value;
  }
}

function resetInputsToSelectedObjectValue(){ // Function to change the value of the inputs to what the values are for the selected object
  document.getElementById("translationX").value = scene.getObjectByName(selectedSceneObject).position.x;
  document.getElementById("translationY").value = scene.getObjectByName(selectedSceneObject).position.y;
  document.getElementById("translationZ").value = scene.getObjectByName(selectedSceneObject).position.z;
  
  document.getElementById('rotationX').value = THREE.Math.radToDeg(scene.getObjectByName(selectedSceneObject).rotation.x);
  document.getElementById('rotationY').value = THREE.Math.radToDeg(scene.getObjectByName(selectedSceneObject).rotation.y);
  document.getElementById('rotationZ').value = THREE.Math.radToDeg(scene.getObjectByName(selectedSceneObject).rotation.z);
  
  document.getElementById("scaleX").value = scene.getObjectByName(selectedSceneObject).scale.x;
  document.getElementById("scaleY").value = scene.getObjectByName(selectedSceneObject).scale.y;
  document.getElementById("scaleZ").value = scene.getObjectByName(selectedSceneObject).scale.z;
}

// Apply a subdivision modifier to the selected object when you press the button:
document.getElementById("subdivisionModifier").addEventListener("click", function(){
  if (confirm("Would you like to apply a subdivision algorithm to smooth the geometry of '" + selectedSceneObject + "'? (This cannot be reversed)")){
    if (selectedSceneObject != "none"){
      var modifier = new THREE.SubdivisionModifier(1);
      scene.getObjectByName(selectedSceneObject).geometry = modifier.modify(scene.getObjectByName(selectedSceneObject).geometry);
      
      // Make it not edit mode:
      if (editModeLine != null){
        scene.remove(editModeLine);
        editMode = false;
      }
    } else {
      alert("To apply a subdivision algorithm, you must click an object in the 'View Scene Objects' panel to select it.")
    }
  }
});

// When the user clicks the button, delete the selected object:
document.getElementById("deleteSelectedObject").addEventListener("click", function(){
  if(selectedSceneObject != "none"){
    if (confirm("Are you sure you want to delete '" + selectedSceneObject + "'?")){
      scene.remove(scene.getObjectByName(selectedSceneObject));
      for(var sceneViewPanelObjects = 0; sceneViewPanelObjects < document.getElementsByClassName("newSceneObject").length; sceneViewPanelObjects++){
        if(document.getElementsByClassName("newSceneObject")[sceneViewPanelObjects].innerHTML == selectedSceneObject){
          document.getElementsByClassName("newSceneObject")[sceneViewPanelObjects].style.display = "none";
        }
      }
      
      document.getElementById("transformSettings").style.display = "none";
      document.getElementById("editMaterials").style.display = "none";
    }
  } else {
    alert("To delete an object, you must click an object in the 'View Scene Objects' panel to select it.")
  }
});