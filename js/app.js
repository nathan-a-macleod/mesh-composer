// ONLY FOR DEBBUGGING!
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

//material.side = THREE.DoubleSide; // Changes culling if you can't see some faces

var clickedOnSlider = false;
var changedCamSetting = false;
var scrolling = true;
var cameraOrbit = false;
var mouseOnMenu = false;
var mode = "buildScene";
var objectsInScene = []; // Important: this will be an array of the objects in the scene when you create custom meshes, or add in a prebuilt one.
var selectedSceneObject = "none";

// Create the cameras origin point to be used later: 
var cameraPivot = new THREE.Object3D();
cameraPivot.position.set(0, 0, 0);

// Camera settings
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);
camera.layers.disable(3); // disable the layer with the points that you can edit by default (by default it's not on createCustomGeometry mode)
camera.layers.enable(4); // The layer with the grid Floor - disabled when rendered.

// Add the camera to the pivot, so that we can rotate just the pivot:
cameraPivot.add(camera);
scene.add(cameraPivot);

// Scene background settings:
scene.background = new THREE.Color(0x393939);

// Create renderer:
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, canvas: document.getElementById("main3dCanvas")});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lighting:
var directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(-3.5, 5.5, -6);
directionalLight.name = "Directional Light";
scene.add(directionalLight);

// Add the directional light to the scene view panel:
var newSceneObject = document.createElement('p');
newSceneObject.innerHTML = directionalLight.name;
newSceneObject.id = "directionalLightText";
newSceneObject.classList.add('newSceneObject');
document.getElementById('sceneViewPanelDIV').appendChild(newSceneObject);
selectedSceneObject = directionalLight.name;
document.getElementById('placeholderObjectName').style.display = 'none';

// Select the light by default:
document.getElementById("directionalLightText").style.textDecoration = "underline";
document.getElementById("transformSettings").style.display = "block"; // Allows the user to change the transform properties
resetInputsToSelectedObjectValue();
document.getElementById("modifiers").style.display = "none";

// Add a directionalLight helper:
var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0x888888);
scene.add(directionalLightHelper);

var ambientLight = new THREE.AmbientLight(scene.background, 0.5);
scene.add(ambientLight);

// Grid floor:
var gridFloor = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
gridFloor.layers.set(4);
scene.add(gridFloor);
document.getElementById('buildModel').style.display = "none";

// Function to return the text of elements clicked in the object with 'sceneViewPanelDIV' id.
function updateSceneViewerButtons(){
  document.getElementById("sceneViewPanelDIV").onclick = e => {
    selectedSceneObject = e.target.innerText;
    
    if (selectedSceneObject != "none"){
      document.getElementById("transformSettings").style.display = "block"; // Allows the user to change the transform properties
      
      if (selectedSceneObject != directionalLight.name){ // As long as the light isn't selected (the light doesn't have a material)
        document.getElementById("editMaterials").style.display = "block"; // Allows the user to change the material properties
        document.getElementById("modifiers").style.display = "block";
      } else {
        document.getElementById("editMaterials").style.display = "none";
        document.getElementById("modifiers").style.display = "none";
      }
      
      document.getElementById("deleteObject").style.display = "block"; // Allows the user to delete an object
    }
    
    // Reset the backgroundColor of all the scene objects in the scene viewer:
    for (var newSceneObjectText = 0; newSceneObjectText < document.getElementsByClassName("newSceneObject").length; newSceneObjectText++){
      document.getElementsByClassName("newSceneObject")[newSceneObjectText].style.textDecoration = "none";
    }
    
    e.target.style.textDecoration = "underline";
    
    resetInputsToSelectedObjectValue();
    if (selectedSceneObject != directionalLight.name){ // As long as tghe light isn't selected (the light doesn't have a material)
      resetMaterialsToSelectedObjectValue();
    }
    
    //scene.getObjectByName(selectedSceneObject).position.x += 1; // You can do anything you want with the selected object
  } 
}

// Allows us to save the contents of the canvas into an image later
var canvas = document.getElementById("main3dCanvas");
var img = canvas.toDataURL("image/png");
// document.write('<img src="'+img+'"/>'); // When we want to 'render' the image

// ANIMATE function (updates every frame)
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