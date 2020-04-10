// ONLY FOR DEBBUGGING!
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

//material.side = THREE.DoubleSide; // Changes culling if you can't see some faces

var clickedOnSlider = false;
var raycaster, mouse = { x : 0, y : 0 };
var currentObject;

// Create the cameras origin point to be used later: 
var cameraPivot = new THREE.Object3D();
cameraPivot.position.set(0, 0, 0);

// Camera settings
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x393939);
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z += 7;
camera.position.y += 3;
camera.rotation.x += -0.4;

// Add the camera to the pivot, so that we can rotate just the pivot:
cameraPivot.add(camera);
scene.add(cameraPivot);

// Create renderer and raycaster:
raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create functions for different primative shapes:
function CreateBoxGeometry() {
  BoxGeometry = new THREE.BoxGeometry();
  BoxMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  BoxMesh = new THREE.Mesh(BoxGeometry, BoxMaterial);
  scene.add(BoxMesh);
  
  BoxMesh.setColor = function(color){
    BoxMesh.material.color.set(color);
  };
  
  BoxWireframe = new THREE.WireframeGeometry(BoxGeometry);
  BoxLine = new THREE.LineSegments(BoxWireframe);
  BoxLine.material.color.setHex(0x1d43ab);
  BoxLine.layers.set(1);
  scene.add(BoxLine);
  
  BoxLine.setColor = function(color){
    BoxLine.material.color.set(color);
  };
  currentObject = 'cube';
}

function CreateCylinderGeometry() {
  CylinderGeometry = new THREE.CylinderGeometry();
  CylinderMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  CylinderMesh = new THREE.Mesh(CylinderGeometry, CylinderMaterial);
  scene.add(CylinderMesh);
  
  CylinderMesh.setColor = function(color){
    CylinderMesh.material.color.set(color);
  };
  
  CylinderWireframe = new THREE.WireframeGeometry(CylinderGeometry);
  CylinderLine = new THREE.LineSegments(CylinderWireframe);
  CylinderLine.material.color.setHex(0x1d43ab);
  CylinderLine.layers.set(1);
  scene.add(CylinderLine);
  
  CylinderLine.setColor = function(color){
    CylinderLine.material.color.set(color);
  };
  currentObject = 'cylinder';
}

function CreatePlaneGeometry() {
  PlaneGeometry = new THREE.PlaneGeometry();
  PlaneMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  PlaneMesh = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
  scene.add(PlaneMesh);
  
  PlaneMesh.setColor = function(color){
    PlaneMesh.material.color.set(color);
  };
  
  PlaneWireframe = new THREE.WireframeGeometry(PlaneGeometry);
  PlaneLine = new THREE.LineSegments(PlaneWireframe);
  PlaneLine.material.color.setHex(0x1d43ab);
  PlaneLine.layers.set(1);
  scene.add(PlaneLine);
  
  PlaneLine.setColor = function(color){
    PlaneLine.material.color.set(color);
  };
  currentObject = 'plane';
}

function CreateSphereGeometry() {
  SphereGeometry = new THREE.SphereGeometry();
  SphereMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  SphereMesh = new THREE.Mesh(SphereGeometry, SphereMaterial);
  scene.add(SphereMesh);
  
  SphereMesh.setColor = function(color){
    SphereMesh.material.color.set(color);
  };
  
  SphereWireframe = new THREE.WireframeGeometry(SphereGeometry);
  SphereLine = new THREE.LineSegments(SphereWireframe);
  SphereLine.material.color.setHex(0x1d43ab);
  SphereLine.layers.set(1);
  scene.add(SphereLine);
  
  SphereLine.setColor = function(color){
    SphereLine.material.color.set(color);
  };
  currentObject = 'sphere';
}

function CreateTorusGeometry() {
  TorusGeometry = new THREE.TorusGeometry();
  TorusMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  TorusMesh = new THREE.Mesh(TorusGeometry, TorusMaterial);
  scene.add(TorusMesh);
  
  TorusMesh.setColor = function(color){
    TorusMesh.material.color.set(color);
  };
  
  TorusWireframe = new THREE.WireframeGeometry(TorusGeometry);
  TorusLine = new THREE.LineSegments(TorusWireframe);
  TorusLine.material.color.setHex(0x1d43ab);
  TorusLine.layers.set(1);
  scene.add(TorusLine);
  
  TorusLine.setColor = function(color){
    TorusLine.material.color.set(color);
  };
  currentObject = 'torus';
}

// Create the default cube from box object:
CreateBoxGeometry();
document.getElementById('changeColor').value = '#ffffff';
//BoxMeshName.setColor(0x0000FF); // to change the colour of the object

// Create a grid floor from lines:
var gridMaterial = new THREE.LineBasicMaterial({color: 0xbababa});
var gridVetices = [];
gridVetices.push(new THREE.Vector3(-0.5, 0, -0.5));
gridVetices.push(new THREE.Vector3(0.5, 0, -0.5));
gridVetices.push(new THREE.Vector3(0.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(-0.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(-0.5, 0, -0.5));
gridVetices.push(new THREE.Vector3(-1.5, 0, -0.5));
gridVetices.push(new THREE.Vector3(-1.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(0.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(-1.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(-1.5, 0, 1.5));
gridVetices.push(new THREE.Vector3(-0.5, 0, 1.5));
gridVetices.push(new THREE.Vector3(-0.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(0.5, 0, 0.5));
gridVetices.push(new THREE.Vector3(0.5, 0, 1.5));
gridVetices.push(new THREE.Vector3(-0.5, 0, 1.5));
var gridGeometry = new THREE.BufferGeometry().setFromPoints(gridVetices);
var gridLine = new THREE.Line(gridGeometry, gridMaterial);
gridLine.position.y += -0.5;
gridLine.position.x += 1;
gridLine.position.z += -1;
gridLine.scale.set(2, 2, 2);
scene.add(gridLine);

// Lighting:
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(8, 5, 10);
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0x404040, 0.5); // soft white light
scene.add(ambientLight);

function animate() {
  //console.log('BEFORE: X: ' + mouseXBefore, ' Y: ' + mouseYBefore);
  //console.log('NOW: X: ' + mouseXNow, ' Y: ' + mouseYNow);
  
  /*if (rotateCameraRight == true){
    cameraPivot.rotation.y += 0.01;
  } else if (rotateCameraLeft == true){
    cameraPivot.rotation.y += -0.01;
  }*/
  
	requestAnimationFrame(animate);
  renderer.render(scene, camera);
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

animate();
