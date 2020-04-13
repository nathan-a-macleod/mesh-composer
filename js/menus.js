// The menu:
document.getElementById('menuUnexpanded').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'none';
  document.getElementById('menuExpanded').style.display = 'block';
  settingsMenuExpanded = true;
});

document.getElementById('closeMenu').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'block';
  document.getElementById('menuExpanded').style.display = 'none';
  document.getElementById('colorSettings').style.display = 'none';
  document.getElementById('colorSettingsButton').style.display = 'block';
  settingsMenuExpanded = false;
});

document.getElementById('colorSettingsButton').addEventListener('click', ()=> {
  document.getElementById('colorSettings').style.display = 'block';
  document.getElementById('colorSettingsButton').style.display = 'none';
});

document.getElementById('closeColorSettingsButton').addEventListener('click', ()=> {
  document.getElementById('colorSettings').style.display = 'none';
  document.getElementById('colorSettingsButton').style.display = 'block';
});

// The edit mode button:
document.getElementById('toggleEditMode').addEventListener('click', ()=> {
  camera.layers.toggle(1);
});

// If mouse in inside menuExpanded div, disable scrolling:
document.getElementById("menuExpanded").setAttribute("onmouseover", 'menuExpandedOnMouseOver()');

document.getElementById("menuExpanded").setAttribute("onmouseout", 'menuExpandedOnMouseOut()');

function menuExpandedOnMouseOver(){
  scrolling = false;
}

function menuExpandedOnMouseOut(){
  scrolling = true;
}

// The RGB slider:
var body = document.body, 
  r = document.querySelector('#redSlider'),
  g = document.querySelector('#greenSlider'),
  b = document.querySelector('#blueSlider'),
  outputR = document.querySelector('#outputR'),
  outputG = document.querySelector('#outputG'),
  b_out = document.querySelector('#outputB'),
  hexVal_out = document.querySelector('#changeColor');

outputR.value = '255';
outputG.value = '255';
outputB.value = '255';

function setColor(){
  var r_hexVal = parseInt(r.value, 10).toString(16),
    g_hexVal = parseInt(g.value, 10).toString(16),
    b_hexVal = parseInt(b.value, 10).toString(16),
    hexVal = "#" + pad(r_hexVal) + pad(g_hexVal) + pad(b_hexVal);
  getObjectType();
  currentElementMesh.setColor(hexVal_out.value);
  hexVal_out.value = hexVal;
}

function pad(n){
  return (n.length<2) ? "0"+n : n;
}
 
r.addEventListener('change', function() {
  setColor();
  outputR.value = r.value;
}, false);
 
r.addEventListener('input', function() {
  setColor();
  outputR.value = r.value;
}, false);
 
g.addEventListener('change', function() {
  setColor();
  outputG.value = g.value;
}, false);
 
g.addEventListener('input', function() {
  setColor();
  outputG.value = g.value;
}, false);
 
b.addEventListener('change', function() {
  setColor();
  b_out.value = b.value;
}, false);
 
b.addEventListener('input', function() {
  setColor();
  b_out.value = b.value;
}, false);


function changeColor(){
  if(event.keyCode == 13) {
      getObjectType();
      currentElementMesh.setColor(document.getElementById('changeColor').value);
      document.getElementById('changeColor').blur();
  }
}

// default transform settings:
document.getElementById('translation1').value = 0;
document.getElementById('translation2').value = 0;
document.getElementById('translation3').value = 0;

document.getElementById('rotation1').value = 0;
document.getElementById('rotation2').value = 0;
document.getElementById('rotation3').value = 0;

document.getElementById('scale1').value = 1;
document.getElementById('scale2').value = 1;
document.getElementById('scale3').value = 1;

function resetTransforms(){
  getObjectType();
  camera.lookAt(currentElementMesh.position);
  
  document.getElementById('translation1').value = currentElementMesh.position.x;
  document.getElementById('translation2').value = currentElementMesh.position.y;
  document.getElementById('translation3').value = currentElementMesh.position.z;
  
  document.getElementById('rotation1').value = currentElementMesh.rotation.x;
  document.getElementById('rotation2').value = currentElementMesh.rotation.y;
  document.getElementById('rotation3').value = currentElementMesh.rotation.z;
  
  document.getElementById('scale1').value = currentElementMesh.scale.x;
  document.getElementById('scale2').value = currentElementMesh.scale.y;
  document.getElementById('scale3').value = currentElementMesh.scale.z;
}

function transformInputs(){
  getObjectType();
  
  currentElementMesh.position.x = document.getElementById('translation1').value;
  currentElementMesh.position.y = document.getElementById('translation2').value;
  currentElementMesh.position.z = document.getElementById('translation3').value;
  currentElementLine.position.x = document.getElementById('translation1').value;
  currentElementLine.position.y = document.getElementById('translation2').value;
  currentElementLine.position.z = document.getElementById('translation3').value;
  
  currentElementMesh.rotation.x = document.getElementById('rotation1').value;
  currentElementMesh.rotation.y = document.getElementById('rotation2').value;
  currentElementMesh.rotation.z = document.getElementById('rotation3').value;
  currentElementLine.rotation.x = document.getElementById('rotation1').value;
  currentElementLine.rotation.y = document.getElementById('rotation2').value;
  currentElementLine.rotation.z = document.getElementById('rotation3').value;
  
  currentElementMesh.scale.x = document.getElementById('scale1').value;
  currentElementMesh.scale.y = document.getElementById('scale2').value;
  currentElementMesh.scale.z = document.getElementById('scale3').value;
  currentElementLine.scale.x = document.getElementById('scale1').value;
  currentElementLine.scale.y = document.getElementById('scale2').value;
  currentElementLine.scale.z = document.getElementById('scale3').value;
  
  objectRotationX = currentElementMesh.rotation.x;
  objectRotationY = currentElementMesh.rotation.y;
  objectRotationZ = currentElementMesh.rotation.z;
}

getObjectType();
objectRotationX = currentElementMesh.rotation.x;
objectRotationY = currentElementMesh.rotation.y;
objectRotationZ = currentElementMesh.rotation.z;
  
document.getElementById('previewButton').addEventListener('click', ()=> {
  previewMode = !previewMode;
  
  if (previewMode == false){
    if (settingsMenuExpanded == true){
      document.getElementById('menuUnexpanded').style.display = 'none';
      document.getElementById('menuExpanded').style.display = 'block';
    } else {
      document.getElementById('menuUnexpanded').style.display = 'block';
      document.getElementById('menuExpanded').style.display = 'none';
      document.getElementById('colorSettings').style.display = 'none';
      document.getElementById('colorSettingsButton').style.display = 'block';
    }
    
    document.getElementById('topMenus').style.display = 'block';
    
    camera.layers.enable(3);
    
    getObjectType();
    currentElementMesh.rotation.x = objectRotationX;
    currentElementMesh.rotation.y = objectRotationY;
    currentElementMesh.rotation.z = objectRotationZ;
    currentElementLine.rotation.x = objectRotationX;
    currentElementLine.rotation.y = objectRotationY;
    currentElementLine.rotation.z = objectRotationZ;
    
    document.getElementById('previewButton').innerValue = 'Preview';
  }
});