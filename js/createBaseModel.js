var mouse = new THREE.Vector2();
var ray = new THREE.Raycaster();
var vertices = [];

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
	  
  	var geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    var material = new THREE.MeshBasicMaterial({color: 0x3f68d9});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = intersects[i].point.x;
    cube.position.y = intersects[i].point.y;
    cube.position.z = 0;
    scene.add(cube);
	}
}

window.addEventListener('click', onMouseClick, false);