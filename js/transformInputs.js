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
}

function resetInputsToSelectedObjectValue(){ // Function to change the value of the inputs to what the values are for the selected object
  document.getElementById("translationX").value = scene.getObjectByName(selectedSceneObject).position.x;
  document.getElementById("translationY").value = scene.getObjectByName(selectedSceneObject).position.y;
  document.getElementById("translationZ").value = scene.getObjectByName(selectedSceneObject).position.z;
  
  document.getElementById('rotationX').value = THREE.Math.degToRad(scene.getObjectByName(selectedSceneObject).rotation.x);
  document.getElementById('rotationY').value = THREE.Math.degToRad(scene.getObjectByName(selectedSceneObject).rotation.y);
  document.getElementById('rotationZ').value = THREE.Math.degToRad(scene.getObjectByName(selectedSceneObject).rotation.z);
  
  document.getElementById("scaleX").value = scene.getObjectByName(selectedSceneObject).scale.x;
  document.getElementById("scaleY").value = scene.getObjectByName(selectedSceneObject).scale.y;
  document.getElementById("scaleZ").value = scene.getObjectByName(selectedSceneObject).scale.z;
}

// scene.getObjectByName(selectedSceneObject).position.x += 1