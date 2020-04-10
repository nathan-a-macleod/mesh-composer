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

function transformInputs(){
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
}
