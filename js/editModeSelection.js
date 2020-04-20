// The raycaster to enable the user to select the mesh when in edit mode
var raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 1;
var mouse = new THREE.Vector2();

function onMouseMove(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );

document.body.addEventListener('click', function(){
  // Find the colours of the object, so that when you go to 
  // a different edit mode selection mode (edge, vertex, etc),
  // it will reset the colours:
  
  
	raycaster.setFromCamera( mouse, camera );
  
	var intersects = raycaster.intersectObjects(scene.children);
  
  if (editModeSelectionMode == 'face'){ // If you are in face selection mode, then:
  	for (var i = 0; i < intersects.length; i++) { // For each of the objects the raycast has intersected, 
	    for (var j = 1; j < intersects[i].object.geometry.faces.length; j++){ // Do this for each of the faces in that mesh
	      // intersects[i] = the object you click, intersects[i].face is the face you click on the object
	      intersects[i].face.color.r = 0.10;
	      intersects[i].face.color.g = 0.25;
	      intersects[i].face.color.b = 0.60;
	      intersects[i].object.geometry.colorsNeedUpdate = true;
	    }
    }
  }
});

// I didn't even notice this line - do I even need it?!:
var BoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );