var mouse = new THREE.Vector2();
var ray = new THREE.Raycaster();
var points = [];
var pointsFence = [];
var numberOfClicks = 0;

var projectionGeometry = new THREE.PlaneGeometry(100, 100, 100);
var projectionMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var projectionPlane = new THREE.Mesh(projectionGeometry, projectionMaterial);
projectionPlane.layers.set(2);
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
    	
    if (mode == "buildHouse"){ // If you are building the vertices to make the building/house/wall
    	for (var i = 0; i < intersects.length; i++){ // For each of the objects the ray intersects (the ray is only on the layer with the projectionGeometry)
      	// Create cubes where you click, and lines to connect them up.
      	var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        var material = new THREE.MeshBasicMaterial({color: 0x3f68d9});
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = intersects[i].point.x;
        cube.position.y = intersects[i].point.y;
        cube.position.z = 0;
        cube.layers.set(3);
        scene.add(cube);
        
        var lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
        points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
        var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        var line = new THREE.Line(lineGeometry, lineMaterial);
        line.layers.set(3);
        scene.add(line);
    	}
    } else if (mode == "buildFence"){
    	for (var i = 0; i < intersects.length; i++){
      	geometryFence = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        materialFence = new THREE.MeshBasicMaterial({color: 0x3f68d9});
        cubeFence = new THREE.Mesh(geometryFence, materialFence);
        cubeFence.position.x = intersects[i].point.x;
        cubeFence.position.y = intersects[i].point.y;
        cubeFence.position.z = 0;
        cubeFence.layers.set(3);
        scene.add(cubeFence);
        
        lineMaterialFence = new THREE.LineBasicMaterial({color: 0x771100});
        pointsFence.push(new THREE.Vector3(cubeFence.position.x, cubeFence.position.y, cubeFence.position.z));
        lineGeometryFence = new THREE.BufferGeometry().setFromPoints(pointsFence);
        lineFence = new THREE.Line(lineGeometryFence, lineMaterialFence);
        lineFence.layers.set(3);
        scene.add(lineFence);
    	}
    }
  }
}

document.getElementById('placeFence').addEventListener('click', function(){
  if(confirm("Warning: Would you like to continue to the next stage? (you will not be able to edit it again).")){
    document.getElementById('topMenus').innerHTML = "Click to place points for the fence, then press 'Build Model'.";
    
    mode = "buildFence";
    document.getElementById('buildModel').style.display = 'block';
    document.getElementById('placeFence').style.display = 'none';
  }
});

// When you click to build the model
document.getElementById('buildModel').addEventListener('click', function(){
  if(confirm("Warning: Would you like to continue to the next stage? (you will not be able to edit it again).")){
    document.getElementById('topMenus').innerHTML = "Click and drag to orbit around the scene. Open settings menu to add assets.";
    mode = "buildModel";
    document.getElementById('buildModel').style.display = 'none';
    
    if(points[0] != undefined){
      points.push(points[0])
    
      var shape = new THREE.Shape();
      shape.moveTo(0,0);
      for (var i = 0; i < points.length; i++){
        shape.lineTo(points[i].x, points[i].y);
      }
      
      var extrudeSettings = {
      	steps: 1,
      	depth: 1,
      	bevelEnabled: false
      };
      
      var geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      var material2 = new THREE.MeshLambertMaterial({color: 0xfaf9f2});
      var mesh2 = new THREE.Mesh(geometry2, material2) ;
      scene.add(mesh2);
      
      mesh2.rotation.x = THREE.Math.degToRad(-90);
      gridFloor.rotation.x = THREE.Math.degToRad(180);
      camera.position.y += 5;
      camera.lookAt(0, 0, 0);
      camera.layers.disable(3);
      cameraOrbit = true;
    } else {
      alert("To build a model, click to place points.")
    }
    
    pointsFence.push(pointsFence[0])
    
    var shapeFence = new THREE.Shape();
    shapeFence.moveTo(0,0);
    for (var i = 0; i < pointsFence.length; i++){
      shapeFence.lineTo(pointsFence[i].x, pointsFence[i].y);
    }
    
    var extrudeSettings = {
    	steps: 1,
    	depth: 0.3,
    	bevelEnabled: false
    };
    
    var geometryFence = new THREE.ExtrudeGeometry(shapeFence, extrudeSettings);
    var materialFence = new THREE.MeshLambertMaterial({color: 0x8a5c46});
    var meshFence = new THREE.Mesh(geometryFence, materialFence) ;
    scene.add(meshFence);
    
    meshFence.rotation.x = THREE.Math.degToRad(-90);
    gridFloor.rotation.x = THREE.Math.degToRad(180);
    camera.position.y += 5;
    camera.lookAt(0, 0, 0);
    camera.layers.disable(3);
    cameraOrbit = true;
  }
});

window.addEventListener('click', onMouseClick, false);