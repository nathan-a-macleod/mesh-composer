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
  camera.setFocalLength(document.getElementById('camFovSlider').value);
  camera.updateProjectionMatrix();
  
  document.getElementById('camFovOutput').innerHTML = document.getElementById('camFovSlider').value;
});

document.getElementById("helpButton").addEventListener("click", function(){
  if(document.getElementById("topMenus").style.display == "block"){
    document.getElementById("topMenus").style.display = "none";
  } else if(document.getElementById("topMenus").style.display == "none"){
    document.getElementById("topMenus").style.display = "block";
  }
});

// 'Render' the scene when the user presses the button (just saves what's on the canvas as a png image):
function exportCanvasAsPNG(id, fileName) {
  var canvasElement = document.getElementById(id);
  
  var MIME_TYPE = "image/png";
  
  var imgURL = canvasElement.toDataURL(MIME_TYPE);
  
  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

document.getElementById("renderButton").addEventListener("click", function(){
  exportCanvasAsPNG("main3dCanvas", "mesh-composer-output-1")
});

// Things for setting like the world background color, etc...
document.getElementById("worldBackgroundColor").addEventListener("change", function(){
  scene.background = new THREE.Color(document.getElementById("worldBackgroundColor").value);
});

document.getElementById("sceneLightColor").addEventListener("change", function(){
  ambientLight.color = new THREE.Color(document.getElementById("sceneLightColor").value);
});

document.getElementById("sceneLightIntensity").addEventListener("change", function(){
  ambientLight.intensity = document.getElementById("sceneLightIntensity").value;
});



