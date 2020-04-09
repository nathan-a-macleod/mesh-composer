// ONLY FOR DEBBUGGING!
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

//material.side = THREE.DoubleSide; // Changes culling if you can't see some faces

var clickedOnSlider = false;
var raycaster, mouse = { x : 0, y : 0 };

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

// Define some objects:
function CreatePlaneGeometry() {
  this.planeMaterialName;
  this.planePointsName;
  this.planeGeometryName;
  this.planeMeshName;
   
  planeMaterialName = new THREE.MeshBasicMaterial({color: 0xffffff}); // default color
  planePointsName = [];
  planePointsName.push(new THREE.Vector3(-2, -0.5, -2));
  planePointsName.push(new THREE.Vector3(2, -0.5, -2));
  planePointsName.push(new THREE.Vector3(2, -0.5, 2));
  planePointsName.push(new THREE.Vector3(-2, -0.5, -2));
  planePointsName.push(new THREE.Vector3(-2, -0.5, 2));
  planePointsName.push(new THREE.Vector3(2, -0.5, 2));
  planePointsName.push(new THREE.Vector3(-2, -0.5, 2));
  planeGeometryName = new THREE.BufferGeometry().setFromPoints(planePointsName);
  planeMeshName = new THREE.Mesh(planeGeometryName, planeMaterialName);
  planeMaterialName.side = THREE.DoubleSide;
  scene.add(planeMeshName);
  
  planeMeshName.setColor = function(color){
    planeMeshName.material.color.set(color);
  };
}

function CreateBoxGeometry() {
  //this.BoxMaterialName;
  this.BoxGeometryName;
  this.BoxMeshName;
  this.BoxMaterialName;
  
  this.BoxWireframeName;
  this.BoxLineName;
  
  BoxGeometryName = new THREE.BoxGeometry();
  BoxMaterialName = new THREE.MeshLambertMaterial({color: 0xffffff}); // default color
  BoxMeshName = new THREE.Mesh(BoxGeometryName, BoxMaterialName);
  scene.add(BoxMeshName);
  
  BoxMeshName.setColor = function(color){
    BoxMeshName.material.color.set(color);
  };
  
  BoxWireframeName = new THREE.WireframeGeometry(BoxGeometryName);
  BoxLineName = new THREE.LineSegments(BoxWireframeName);
  BoxLineName.material.color.setHex(0x1d43ab);
  scene.add(BoxLineName);
  
  BoxLineName.setColor = function(color){
    BoxLineName.material.color.set(color);
  };
}

// Create the default cube from box object:
var defaultCube = new CreateBoxGeometry();
defaultCube.BoxMaterialName = 'defaultCubeMaterial';
defaultCube.BoxGeometryName = 'defaultCubeGeometry';
defaultCube.BoxMeshName = 'defaultCubeMesh';

defaultCube.BoxWireframeName = 'defaultCubeMaterial';
defaultCube.BoxLineName = 'defaultCubeLine';
BoxLineName.layers.set(1);
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
}

animate();
