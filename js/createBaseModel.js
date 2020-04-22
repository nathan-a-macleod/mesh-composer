var mouse = new THREE.Vector2();
var ray = new THREE.Raycaster();
var points = [];

var projectionGeometry = new THREE.PlaneGeometry(100, 100, 100);
var projectionMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var projectionPlane = new THREE.Mesh(projectionGeometry, projectionMaterial);
projectionPlane.layers.set(2);
scene.add(projectionPlane);

function onMouseClick(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	//mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	//mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	
	ray.layers.set(2);
	ray.setFromCamera(mouse, camera);
	intersects = ray.intersectObjects(scene.children)
	
	for (var i = 0; i < intersects.length; i++){
	  // Need to add where you click (intersects[i].point) to an array to remember which
	  // vertices you are creating, then create lines between them
	  
  	var geometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);
    var material = new THREE.MeshBasicMaterial({color: 0x3f68d9});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = intersects[i].point.x;
    cube.position.y = intersects[i].point.y;
    cube.position.z = 0;
    scene.add(cube);
    
    var lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
    points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
    points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
    points.push(new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z));
    var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(lineGeometry, lineMaterial);
    
    scene.add(line);
	}
}

window.addEventListener('click', onMouseClick, false);