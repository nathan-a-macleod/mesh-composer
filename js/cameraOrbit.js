var speed = 0.2;
var isWindowClicked = false;
var mouseXBefore;
var mouseYBefore;
var mouseXNow;
var mouseYNow; 
var rotateCameraLeft;
var rotateCameraRight;

// Make the speed smaller if the camera is closer to the default cube.


// Get keyboard input and move the camera accordingly:
document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    // ------ Movement ------
    case 87:
      // W was pressed
      camera.translateZ(-speed);
      break;
    case 83:
      // S was pressed
      camera.translateZ(speed);
      break;
    case 81:
      // Q was pressed
      cameraPivot.translateY(-speed);
      break;
    case 69:
      // E was pressed
      cameraPivot.translateY(speed);
      break;
  }
});

// For orbiting the scene:
window.addEventListener('mousedown', ()=> {
  isWindowClicked = true;
  
  mouseXBefore = event.clientX;
  mouseYBefore = event.clientY;
});

window.addEventListener('mouseup', ()=> {
  isWindowClicked = false;
});

window.addEventListener('mousemove', ()=> {
  if ((isWindowClicked === true) && (clickedOnSlider == false)){
    camera.lookAt(BoxMeshName.position);
    
    mouseXNow = event.clientX;
    mouseYNow = event.clientY;
    
    cameraOrbitY()
    cameraOrbitX()
  }
});

function cameraOrbitY(){
  if (((mouseXNow - mouseXBefore)/2000 <= 0.1) && ((mouseXNow - mouseXBefore)/2000 >= -0.1)){
    cameraPivot.rotation.y -= (mouseXNow - mouseXBefore)/2000;
  } else if ((mouseXNow - mouseXBefore)/2000 > 0){
    cameraPivot.rotation.y -= 0.05;
  } else {
    cameraPivot.rotation.y += 0.05;
  }
}

function cameraOrbitX(){
  if (cameraPivot.position.y >= 5){
    cameraPivot.position.y = 5;
  } else if (cameraPivot.position.y <= -5){
    cameraPivot.position.y = -5;
  }
  
  cameraPivot.position.y += (mouseYNow - mouseYBefore)/1000;
  camera.lookAt(BoxMeshName.position);
}
