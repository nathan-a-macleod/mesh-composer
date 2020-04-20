// Function to easily turn a hexidecimal color value to rgb values:
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

var r_selectedColor = hexToRgb("#1d43ab").r/255
var g_selectedColor = hexToRgb("#1d43ab").g/255
var b_selectedColor = hexToRgb("#1d43ab").b/255

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

// Function to remove the selection:
function removeSelection(){
  for (var j = 0; j < currentElementMesh.geometry.faces.length; j++){
    currentElementMesh.geometry.faces[j].color.r = 1;
    currentElementMesh.geometry.faces[j].color.g = 1;
    currentElementMesh.geometry.faces[j].color.b = 1;
    currentElementMesh.geometry.colorsNeedUpdate = true;
  }
}

document.body.addEventListener('click', function(){
  // Find the colours of the object, so that when you go to 
  // a different edit mode selection mode (edge, vertex, etc),
  // it will reset the colours:
  // [I am still working on that so far ]
  
	raycaster.setFromCamera( mouse, camera );
  
	var intersects = raycaster.intersectObjects(scene.children);
  
  if (editModeSelectionMode == 'face'){ // If you are in face selection mode, then:
  	for (var i = 0; i < intersects.length; i++) { // For each of the objects the raycast has intersected, 
	    for (var j = 1; j < intersects[i].object.geometry.faces.length; j++){ // Do this for each of the faces in that mesh
	      // intersects[i] = the object you click, intersects[i].face is the face you click on the object
	      intersects[i].face.color.r = r_selectedColor;
	      intersects[i].face.color.g = g_selectedColor;
	      intersects[i].face.color.b = b_selectedColor;
	      intersects[i].object.geometry.colorsNeedUpdate = true;
	    }
    }
  } else if (editModeSelectionMode == 'edge'){
    // Nothing for now...
  }
});

// I didn't even notice this line - do I even need it?!:
var BoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );