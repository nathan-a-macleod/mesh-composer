// The menu:
document.getElementById('menuUnexpanded').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'none';
  document.getElementById('menuExpanded').style.display = 'block';
  console.log('Menu opened');
  //camera.translateX(0.7);
});

document.getElementById('closeMenu').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'block';
  document.getElementById('menuExpanded').style.display = 'none';
  document.getElementById('colorSettings').style.display = 'none';
  document.getElementById('colorSettingsButton').style.display = 'block';
  console.log('Menu opened');
  //camera.translateX(-0.7);
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
  BoxMesh.setColor(hexVal_out.value);
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
      BoxMesh.setColor(document.getElementById('changeColor').value);
      document.getElementById('changeColor').blur();
  }
}

// Transformation inputs:
document.getElementById('translation1').value = BoxMesh.position.x;
document.getElementById('translation2').value = BoxMesh.position.y;
document.getElementById('translation3').value = BoxMesh.position.z;

document.getElementById('rotation1').value = BoxMesh.rotation.x;
document.getElementById('rotation2').value = BoxMesh.rotation.y;
document.getElementById('rotation3').value = BoxMesh.rotation.z;

document.getElementById('scale1').value = BoxMesh.scale.x;
document.getElementById('scale2').value = BoxMesh.scale.y;
document.getElementById('scale3').value = BoxMesh.scale.z;

function transformInputs(currentElementMesh, currentElementLine){
  if (currentObject == 'cube'){
    BoxMesh.position.x = document.getElementById('translation1').value;
    BoxMesh.position.y = document.getElementById('translation2').value;
    BoxMesh.position.z = document.getElementById('translation3').value;
    BoxLine.position.x = document.getElementById('translation1').value;
    BoxLine.position.y = document.getElementById('translation2').value;
    BoxLine.position.z = document.getElementById('translation3').value;
    
    BoxMesh.rotation.x = document.getElementById('rotation1').value;
    BoxMesh.rotation.y = document.getElementById('rotation2').value;
    BoxMesh.rotation.z = document.getElementById('rotation3').value;
    BoxLine.rotation.x = document.getElementById('rotation1').value;
    BoxLine.rotation.y = document.getElementById('rotation2').value;
    BoxLine.rotation.z = document.getElementById('rotation3').value;
    
    BoxMesh.scale.x = document.getElementById('scale1').value;
    BoxMesh.scale.y = document.getElementById('scale2').value;
    BoxLine.scale.z = document.getElementById('scale3').value;
    BoxLine.scale.x = document.getElementById('scale1').value;
    BoxLine.scale.y = document.getElementById('scale2').value;
    BoxLine.scale.z = document.getElementById('scale3').value;
  } else if (currentObject == 'cylinder'){
    CylinderMesh.position.x = document.getElementById('translation1').value;
    CylinderMesh.position.y = document.getElementById('translation2').value;
    CylinderMesh.position.z = document.getElementById('translation3').value;
    CylinderLine.position.x = document.getElementById('translation1').value;
    CylinderLine.position.y = document.getElementById('translation2').value;
    CylinderLine.position.z = document.getElementById('translation3').value;
    
    CylinderMesh.rotation.x = document.getElementById('rotation1').value;
    CylinderMesh.rotation.y = document.getElementById('rotation2').value;
    CylinderMesh.rotation.z = document.getElementById('rotation3').value;
    CylinderLine.rotation.x = document.getElementById('rotation1').value;
    CylinderLine.rotation.y = document.getElementById('rotation2').value;
    CylinderLine.rotation.z = document.getElementById('rotation3').value;
    
    CylinderMesh.scale.x = document.getElementById('scale1').value;
    CylinderMesh.scale.y = document.getElementById('scale2').value;
    CylinderMesh.scale.z = document.getElementById('scale3').value;
    CylinderLine.scale.x = document.getElementById('scale1').value;
    CylinderLine.scale.y = document.getElementById('scale2').value;
    CylinderLine.scale.z = document.getElementById('scale3').value;
  } else if (currentObject == 'plane'){
    PlaneMesh.position.x = document.getElementById('translation1').value;
    PlaneMesh.position.y = document.getElementById('translation2').value;
    PlaneMesh.position.z = document.getElementById('translation3').value;
    PlaneLine.position.x = document.getElementById('translation1').value;
    PlaneLine.position.y = document.getElementById('translation2').value;
    PlaneLine.position.z = document.getElementById('translation3').value;
    
    PlaneMesh.rotation.x = document.getElementById('rotation1').value;
    PlaneMesh.rotation.y = document.getElementById('rotation2').value;
    PlaneMesh.rotation.z = document.getElementById('rotation3').value;
    PlaneLine.rotation.x = document.getElementById('rotation1').value;
    PlaneLine.rotation.y = document.getElementById('rotation2').value;
    PlaneLine.rotation.z = document.getElementById('rotation3').value;
    
    PlaneMesh.scale.x = document.getElementById('scale1').value;
    PlaneMesh.scale.y = document.getElementById('scale2').value;
    PlaneMesh.scale.z = document.getElementById('scale3').value;
    PlaneLine.scale.x = document.getElementById('scale1').value;
    PlaneLine.scale.y = document.getElementById('scale2').value;
    PlaneLine.scale.z = document.getElementById('scale3').value;
  } else if (currentObject == 'sphere'){
    SphereMesh.position.x = document.getElementById('translation1').value;
    SphereMesh.position.y = document.getElementById('translation2').value;
    SphereMesh.position.z = document.getElementById('translation3').value;
    SphereLine.position.x = document.getElementById('translation1').value;
    SphereLine.position.y = document.getElementById('translation2').value;
    SphereLine.position.z = document.getElementById('translation3').value;
    
    SphereMesh.rotation.x = document.getElementById('rotation1').value;
    SphereMesh.rotation.y = document.getElementById('rotation2').value;
    SphereMesh.rotation.z = document.getElementById('rotation3').value;
    SphereLine.rotation.x = document.getElementById('rotation1').value;
    SphereLine.rotation.y = document.getElementById('rotation2').value;
    SphereLine.rotation.z = document.getElementById('rotation3').value;
    
    SphereMesh.scale.x = document.getElementById('scale1').value;
    SphereMesh.scale.y = document.getElementById('scale2').value;
    SphereMesh.scale.z = document.getElementById('scale3').value;
    SphereLine.scale.x = document.getElementById('scale1').value;
    SphereLine.scale.y = document.getElementById('scale2').value;
    SphereLine.scale.z = document.getElementById('scale3').value;
  } else if (currentObject == 'torus'){
    TorusMesh.position.x = document.getElementById('translation1').value;
    TorusMesh.position.y = document.getElementById('translation2').value;
    TorusMesh.position.z = document.getElementById('translation3').value;
    TorusLine.position.x = document.getElementById('translation1').value;
    TorusLine.position.y = document.getElementById('translation2').value;
    TorusLine.position.z = document.getElementById('translation3').value;
    
    TorusMesh.rotation.x = document.getElementById('rotation1').value;
    TorusMesh.rotation.y = document.getElementById('rotation2').value;
    TorusMesh.rotation.z = document.getElementById('rotation3').value;
    TorusLine.rotation.x = document.getElementById('rotation1').value;
    TorusLine.rotation.y = document.getElementById('rotation2').value;
    TorusLine.rotation.z = document.getElementById('rotation3').value;
    
    TorusMesh.scale.x = document.getElementById('scale1').value;
    TorusMesh.scale.y = document.getElementById('scale2').value;
    TorusMesh.scale.z = document.getElementById('scale3').value;
    TorusLine.scale.x = document.getElementById('scale1').value;
    TorusLine.scale.y = document.getElementById('scale2').value;
    TorusLine.scale.z = document.getElementById('scale3').value;
  }
}
