// The menu:
document.getElementById('menuUnexpanded').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'none';
  document.getElementById('menuExpanded').style.display = 'block';
  document.getElementById('closeMenu').style.display = 'block';
  settingsMenuExpanded = true;
});

document.getElementById('closeMenu').addEventListener('click', ()=> {
  document.getElementById('menuUnexpanded').style.display = 'block';
  document.getElementById('menuExpanded').style.display = 'none';
  document.getElementById('closeMenu').style.display = 'none';
  settingsMenuExpanded = false;
});

// The edit mode button:

// If mouse in inside menuExpanded div, disable scrolling:
document.getElementById("menuExpanded").setAttribute("onmouseover", 'menuExpandedOnMouseOver()');

document.getElementById("menuExpanded").setAttribute("onmouseout", 'menuExpandedOnMouseOut()');

function menuExpandedOnMouseOver(){
  scrolling = false;
}

function menuExpandedOnMouseOut(){
  scrolling = true;
}

document.getElementById('camFovSlider').addEventListener('change', function(){
  camera.setFocalLength(document.getElementById('camFovSlider').value)
  camera.updateProjectionMatrix();
  
  document.getElementById('camFovOutput').innerHTML = document.getElementById('camFovSlider').value;
});