document.getElementById('createCube').addEventListener('click', function(){
  var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.y += 0.5;
  scene.add(cubeMesh);
  objectsInScene.push(cubeMesh);
});

document.getElementById('createCone').addEventListener('click', function(){
  var coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
  var coneMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
  coneMesh.position.y += 0.5;
  scene.add(coneMesh);
  objectsInScene.push(coneMesh);
});

document.getElementById('createCylinder').addEventListener('click', function(){
  var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
  var cylinderMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinderMesh.position.y += 0.5;
  scene.add(cylinderMesh);
  objectsInScene.push(cylinderMesh);
});

document.getElementById('createPlane').addEventListener('click', function(){
  var planeGeometry = new THREE.PlaneGeometry(1, 1);
  var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.y += 0.5;
  planeMaterial.side = THREE.DoubleSide; // Make sure the normals are facing both ways so that you can see it no matter what orientation you are in
  scene.add(planeMesh);
  objectsInScene.push(planeMesh);
});

document.getElementById('createSphere').addEventListener('click', function(){
  var sphereGeometry = new THREE.SphereGeometry(1, 10, 10);
  var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.y += 0.5;
  scene.add(sphereMesh);
  objectsInScene.push(sphereMesh);
});

document.getElementById('createTorus').addEventListener('click', function(){
  var torusGeometry = new THREE.TorusGeometry(1, 0.5, 10, 25);
  var torusMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  var torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.position.y += 0.5;
  scene.add(torusMesh);
  objectsInScene.push(torusMesh);
});