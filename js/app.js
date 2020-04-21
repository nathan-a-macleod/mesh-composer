// ONLY FOR DEBBUGGING!
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

//material.side = THREE.DoubleSide; // Changes culling if you can't see some faces

var clickedOnSlider = false;
var changedCamSetting = false;
var currentObject;
var scrolling = true;
var previewMode = false;
var objectRotationX;
var objectRotationY;
var objectRotationZ;
var settingsMenuExpanded;
var editModeSelectionMode = 'editModeOff';

// Create the cameras origin point to be used later: 
var cameraPivot = new THREE.Object3D();
cameraPivot.position.set(0, 0, 0);

// Camera settings
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x393939);
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z += 5;
camera.lookAt(0, 0, 0);
camera.layers.enable(3);

// Add the camera to the pivot, so that we can rotate just the pivot:
cameraPivot.add(camera);
scene.add(cameraPivot);

// Create renderer:
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting:
var directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(8, 5, 10);
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube )

var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

function animate() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
	requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();