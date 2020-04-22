var mouse = new THREE.Vector2();
var ray = new THREE.Raycaster();
var points = [];
var numberOfClicks = 0;
var geometry;
var material;
var cube;
var lineMaterial;
var lineGeometry;
var line;

var projectionGeometry = new THREE.PlaneGeometry(100, 100, 100);
var projectionMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var projectionPlane = new THREE.Mesh(projectionGeometry, projectionMaterial);
projectionPlane.layers.set(2);
scene.add(projectionPlane);

function onMouseClick(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	
	ray.layers.set(2);
	ray.setFromCamera(mouse, camera);
	intersects = ray.intersectObjects(scene.children);
	
	for (var i = 0; i < intersects.length; i++){
	  // Need to add where you click (intersects[i].point) to an array to remember which
	  // vertices you are creating, then create lines between them
  	geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    material = new THREE.MeshBasicMaterial({color: 0x3f68d9});
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = intersects[i].point.x;
    cube.position.y = intersects[i].point.y;
    cube.position.z = 0;
    cube.layers.set(3);
    scene.add(cube);
    
    lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
    points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
    lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeometry, lineMaterial);
    line.layers.set(3);
    scene.add(line);
	}
}

document.body.addEventListener('keydown', function(event){
  if(event.keyCode == "69"){ // The 'E' key
    if(confirm("If you create a mesh, you will not be able to edit the vertices. Would you like to continue?")){
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
      
      document.getElementById('menuUnexpanded').style.display = 'block';
    }
  }
});

window.addEventListener('click', onMouseClick, false);