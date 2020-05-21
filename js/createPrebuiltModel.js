// Runs this function every time you create an object:
function newObjectSettings(meshName){
  var newSceneObject = document.createElement('p');
  newSceneObject.innerHTML = meshName.name;
  newSceneObject.classList.add('newSceneObject');
  document.getElementById('sceneViewPanelDIV').appendChild(newSceneObject);
  document.getElementById('placeholderObjectName').style.display = 'none';
  updateSceneViewerButtons(); // Function (defined in app.js) allowing the user to click on each of the objects in the scene
  
  // Make it not edit mode - unless the light is selected (light doesn't have edit mode):
  if (selectedSceneObject != "Directional Light"){
    if (editModeLine != null){
      scene.remove(editModeLine);
      editMode = false;
    }
    for (var j = 0; j < scene.getObjectByName(selectedSceneObject).geometry.faces.length; j++){
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.r = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.g = 1;
      scene.getObjectByName(selectedSceneObject).geometry.faces[j].color.b = 1;
      scene.getObjectByName(selectedSceneObject).geometry.colorsNeedUpdate = true;
    }
    selectedSceneFace = [];
  }
}

document.getElementById('createCube').addEventListener('click', function(){
  var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  var cubeMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  cubeMaterial.color.convertSRGBToLinear();
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.y += 0.5;
  cubeMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (cubeMesh.name){ // If you haven't pressed cancel
    scene.add(cubeMesh);
    cubeMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(cubeMesh);
    
    newObjectSettings(cubeMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});

document.getElementById('createCone').addEventListener('click', function(){
  var coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
  var coneMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  coneMaterial.color.convertSRGBToLinear();
  var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
  coneMesh.position.y += 0.5;
  coneMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (coneMesh.name){
    scene.add(coneMesh);
    coneMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(coneMesh);
    
    newObjectSettings(coneMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});

document.getElementById('createCylinder').addEventListener('click', function(){
  var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
  var cylinderMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  cylinderMaterial.color.convertSRGBToLinear();
  var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinderMesh.position.y += 0.5;
  cylinderMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (cylinderMesh.name){
    scene.add(cylinderMesh);
    cylinderMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(cylinderMesh);
    
    newObjectSettings(cylinderMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});

document.getElementById('createPlane').addEventListener('click', function(){
  var planeGeometry = new THREE.PlaneGeometry(1, 1);
  var planeMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  planeMaterial.color.convertSRGBToLinear();
  planeMaterial.side = THREE.DoubleSide; // Make sure the normals are facing both ways so that you can see it no matter what orientation you are in
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.y += 0.5;
  planeMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (planeMesh.name){
    scene.add(planeMesh);
    planeMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(planeMesh);
    
    newObjectSettings(planeMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});

document.getElementById('createSphere').addEventListener('click', function(){
  var sphereGeometry = new THREE.SphereGeometry(1, 10, 10);
  var sphereMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  sphereMaterial.color.convertSRGBToLinear();
  sphereMaterial.side = THREE.DoubleSide; // Make sure the normals are facing both ways so that you can see it no matter what orientation you are in
  var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.y += 0.5;
  sphereMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (sphereMesh.name){
    scene.add(sphereMesh);
    sphereMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(sphereMesh);
    
    newObjectSettings(sphereMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});

document.getElementById('createTorus').addEventListener('click', function(){
  var torusGeometry = new THREE.TorusGeometry(1, 0.5, 10, 25);
  var torusMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
  torusMaterial.color.convertSRGBToLinear();
  torusMaterial.side = THREE.DoubleSide; // Make sure the normals are facing both ways so that you can see it no matter what orientation you are in
  var torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.position.y += 0.5;
  torusMesh.name = prompt("Please enter a name for the object:", objectsInScene.length);
  
  if (torusMesh.name){
    scene.add(torusMesh);
    torusMesh.layers.set(5); // A different layer so that you can disable it when you create custom geometry
    objectsInScene.push(torusMesh);
    
    newObjectSettings(torusMesh);
    
    // resetInputs(); // Reset the inputs to 0 (translate), 0 (rotation), 1 (scale), etc
  }
});