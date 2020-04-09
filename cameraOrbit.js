// Get keyboard input and move the camera accordingly:
document.addEventListener('keydown', function(event) {
  if (typingText == false){
    switch(event.keyCode) {
      // ------ Movement ------
      case 87:
        // W was pressed
        
        // Need to make it so that when you press the keys it
        // moves FORWARD to the camera, not just along the z axis.
        cameraPivot.translateZ(-speed);
        break;
      case 83:
        // S was pressed
        
        // Need to make it so that when you press the keys it
        // moves FORWARD to the camera, not just along the z axis.
        cameraPivot.translateZ(speed);
        break;
      case 81:
        // Q was pressed
        cameraPivot.translateY(-speed);
        break;
      case 69:
        // E was pressed
        cameraPivot.translateY(speed);
        break;
      // ------ Rotation ------
      case 38:
        // Up Arrow was pressed
        cameraPivot.position.y += speed*2;
        camera.lookAt(0, 0, 0);
        break;
      case 40:
        // Down Arrow was pressed
        cameraPivot.position.y += -speed*2;
        camera.lookAt(0, 0, 0);
        break;
      default:
      // There isn't really any DEFAULT code but there will be
      // a compiler error if I don't put it in ;D
    }
  }
  
  typingText = false;
});

// For orbiting the scene:
var isWindowClicked = false;
var mouseXBefore;
var mouseYBefore;
var mouseXNow;
var mouseYNow; 
var rotateCameraLeft;
var rotateCameraRight;

window.addEventListener('mousedown', ()=> {
  isWindowClicked = true;
  
  mouseXBefore = event.clientX;
  mouseYBefore = event.clientY;
});

window.addEventListener('mouseup', ()=> {
  isWindowClicked = false;
});

window.addEventListener('mousemove', ()=> {
  if (isWindowClicked == true){
    mouseXNow = event.clientX;
    mouseYNow = event.clientY;
    
    if (mouseXNow - mouseXBefore < 0){
      cameraPivot.rotation.y += 0.08;
      // At some point do a thing where the smalest distance you move 
      // the mouse, the less cameraPivot rotates. The next line could be a starting point:
      //cameraPivot.rotation.y += (mouseXNow - mouseXBefore)/1000;
    } else if (mouseXNow - mouseXBefore > 0){
      cameraPivot.rotation.y += -0.08;
      // At some point do a thing where the smalest distance you move 
      // the mouse, the less cameraPivot rotates. The next line could be a starting point:
      //cameraPivot.rotation.y -= (mouseXNow - mouseXBefore)/1000;
    }
  }
});