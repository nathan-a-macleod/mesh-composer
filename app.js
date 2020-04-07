// ONLY FOR DEBBUGGING!
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

//material.side = THREE.DoubleSide; // Changes culling if you can't see some faces

var typingText = false;
var raycaster, mouse = { x : 0, y : 0 };

// Create the cameras origin point to be used later: 
var cameraPivot = new THREE.Object3D();
cameraPivot.position.set(0, 0, 0);

// Camera settings
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3a3a);
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z += 5;
camera.position.y += 2;
camera.rotation.x += -0.4;

// Add the camera to the pivot, so that we can rotate just the pivot:
cameraPivot.add(camera);
scene.add(cameraPivot);

// Create renderer and raycaster:
raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// The menu:
document.getElementById('menuUnexpanded').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'none';
  document.getElementById('menuExpanded').style.display = 'block';
  //camera.translateX(0.7);
});

document.getElementById('closeMenu').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'block';
  document.getElementById('menuExpanded').style.display = 'none';
  //camera.translateX(-0.7);
});

// The edit mode button:
document.getElementById('toggleEditMode').addEventListener('click', ()=> {
  camera.layers.toggle(1);
});

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
var gridMaterial = new THREE.LineBasicMaterial({color: 0x3f68d9});
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
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
directionalLight.position.set(8, 5, 10);
scene.add(directionalLight);

// Get keyboard input and move the camera accordingly:
document.addEventListener('keydown', function(event) {
  if (typingText === false){
    // ------ Movement ------
    if(event.keyCode == 87) {
        console.log('W was pressed');
        cameraPivot.translateZ(-0.1);
    }
    
    else if(event.keyCode == 83) {
        console.log('S was pressed');
        cameraPivot.translateZ(0.1);
    }
    
    else if(event.keyCode == 65) {
        console.log('A was pressed');
        cameraPivot.translateX(-0.1);
    }
    
    else if(event.keyCode == 68) {
        console.log('D was pressed');
        cameraPivot.translateX(0.1);
    }
    
    else if(event.keyCode == 81) {
        console.log('Q was pressed');
        cameraPivot.translateY(-0.1);
    }
    
    else if(event.keyCode == 69) {
        console.log('E was pressed');
        cameraPivot.translateY(0.1);
    }
    
    // ------ Rotation ------
    
    else if(event.keyCode == 37) {
        console.log('Left Arrow was pressed');
        cameraPivot.rotateY(0.1);
    }
    
    else if(event.keyCode == 39) {
        console.log('Right Arrow was pressed');
        cameraPivot.rotateY(-0.1);
    }
    
    else if(event.keyCode == 38) {
        console.log('Up Arrow was pressed');
        cameraPivot.position.y += 0.2;
        camera.lookAt(0, 0, 0);
    }
    
    else if(event.keyCode == 40) {
        console.log('Down Arrow was pressed');
        cameraPivot.position.y += -0.2;
        camera.lookAt(0, 0, 0);
    }
  }
  
  typingText = false;
});

function changeColor(){
  typingText = true;
  
  if(event.keyCode == 13) {
      BoxMeshName.setColor(document.getElementById('changeColor').value);
      document.getElementById('changeColor').blur();
      // NEED TO DO AN RGB SLIDER AT SOME POINT!!!!!!!!
  }
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();