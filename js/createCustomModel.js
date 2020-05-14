var mouse = new THREE.Vector2();
var ray = new THREE.Raycaster();
var points = [];
var cubeVertices = [];
var lineEdges = [];

var projectionGeometry = new THREE.PlaneGeometry(100, 100, 100);
var projectionMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var projectionPlane = new THREE.Mesh(projectionGeometry, projectionMaterial);
projectionPlane.layers.set(2);
projectionPlane.rotation.x = THREE.Math.degToRad(90);
scene.add(projectionPlane);

// When you click to add points
function onMouseClick(event) {
  if(mouseOnMenu == false){ // If the mouse isn't in the menu
    // calculate mouse position in normalized device coordinates
  	// (-1 to +1) for both components:
  	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  	
  	ray.layers.set(2); // Create a ray to cast on object that is in a different layer to the camera (you can't see it)
  	ray.setFromCamera(mouse, camera);
  	intersects = ray.intersectObjects(scene.children);
    	
    if (mode == "buildObject"){ // If you are in editing mode - building an object
    	for (var i = 0; i < intersects.length; i++){ // For each of the objects the ray intersects (the ray is only on the layer with the projectionGeometry)
      	// Create cubes where you click, and lines to connect them up.
      	var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        var material = new THREE.MeshBasicMaterial({color: 0x3f68d9});
        material.color.convertSRGBToLinear();
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = intersects[i].point.x;
        cube.position.y = intersects[i].point.y;
        cube.position.z = intersects[i].point.z;
        cube.layers.set(3);
        scene.add(cube);
        points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
        
        var lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
        var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        var line = new THREE.Line(lineGeometry, lineMaterial);
        line.layers.set(3);
        scene.add(line);
    	}
    }
  }
}

// When you click to start creating the model:
document.getElementById('createCustomGeometry').addEventListener('click', function(){
  // Make it not edit mode:
  if (editModeLine != null){
    scene.remove(editModeLine);
    editMode = false;
  }

  document.body.style.cursor = "crosshair"; // Change the cursor
  camera.position.x = 0;
  camera.position.y = 25;
  camera.position.z = 0;
  camera.lookAt(0, 0, 0);
  mode = "buildObject";
  controls.enableRotate = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  document.getElementById('buildModel').style.display = "block";
  document.getElementById('cancelBuilding').style.display = "block";
  camera.layers.enable(3); // Enables layer 3 containing the points and lines to create custom geometry
  camera.layers.disable(5);
  document.getElementById("topMenus").innerHTML = "1. Click to add points and connect them up with lines. 2. Click 'Build Model' to turn it into a 3D model.";
});

// If you click to cancel building:
document.getElementById("cancelBuilding").addEventListener("click", function(){
  document.getElementById('topMenus').innerHTML = '1. Press "Open Settings Menu" to add new objects. 2. Select objects in the "View Scene Objects" panel. 3. Edit the transform settings, or apply a modifier to the selected object.';
  mode = "buildScene"; // Takes it out of editing mode
  document.getElementById('buildModel').style.display = "none";
  document.getElementById('cancelBuilding').style.display = "none";
  
  camera.layers.disable(3);
  camera.layers.enable(5);
  cameraOrbit = true;
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);
  
  document.body.style.cursor = "default"; // Change the cursor back to normal
  
  points = []; // Clear the points selecting thing every time you create a new object so that you can create as many different objects as you like
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableZoom = true;
});

// When you click to actually build the model
document.getElementById('buildModel').addEventListener('click', function(){
  if(points[0] != undefined){ // IE, if you HAVE some points
    if(confirm("Warning: Would you like to continue to the next stage? (you will not be able to edit it again).")){
      document.getElementById('topMenus').innerHTML = '1. Press "Open Settings Menu" to add new objects. 2. Select objects in the "View Scene Objects" panel. 3. Edit the transform settings, or apply a modifier to the selected object.';
      mode = "buildScene"; // Takes it out of editing mode
      document.getElementById('buildModel').style.display = "none"; // Removes the button allowing the user to create a 3d geometry from a 2d sketch (you aren't in that mode)
      document.getElementById('cancelBuilding').style.display = "none";
      
      points.push(points[0])
    
      var shape = new THREE.Shape();
      shape.moveTo(points[0].x, points[0].z);
      for (var i = 0; i < points.length; i++){
        shape.lineTo(points[i].x, points[i].z);
      }
      
      var extrudeSettings = {
      	steps: 1,
      	depth: 1,
        bevelEnabled: false
      };
      
      var geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      var material2 = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
      var mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.name = prompt("Please enter a name for the shape:", objectsInScene.length);
      scene.add(mesh2);
      
      mesh2.rotation.x = THREE.Math.degToRad(90);
      camera.position.y += 5;
      
      // Adds the object name to the scene view panel div HTML element
      var newSceneObject = document.createElement('p');
      newSceneObject.innerHTML = mesh2.name;
      newSceneObject.classList.add('newSceneObject');
      document.getElementById('sceneViewPanelDIV').appendChild(newSceneObject);
      document.getElementById('placeholderObjectName').style.display = 'none';
  
      geometry2.center();
  
      camera.position.y += 5;
      camera.lookAt(0, 0, 0);
      camera.layers.disable(3);
      camera.layers.enable(5);
      cameraOrbit = true;
      camera.position.set(0, 5, 10);
      camera.lookAt(0, 0, 0);
      objectsInScene.push(mesh2);
      mesh2.layers.set(5); // A different layer so that you can disable it when you create custom geometry
      
      document.body.style.cursor = "default"; // Change the cursor back to normal
      
      points = []; // Clear the points selecting thing every time you create a new object so that you can create as many different objects as you like
      controls.enableRotate = true;
      controls.enablePan = true;
      controls.enableZoom = true;
      updateSceneViewerButtons(); // Function (defined in app.js) allowing the user to click on each of the objects in the scene
    }
  } else {
    alert("To build a model, click to place points.")
  }
});

window.addEventListener('click', onMouseClick, false);