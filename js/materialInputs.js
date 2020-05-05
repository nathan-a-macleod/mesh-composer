// Function to easily turn a hex color value into rgb values:
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

document.getElementById("hexColorInput").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.color.r = hexToRgb(document.getElementById("hexColorInput").value).r / 255;
  scene.getObjectByName(selectedSceneObject).material.color.g = hexToRgb(document.getElementById("hexColorInput").value).g / 255;
  scene.getObjectByName(selectedSceneObject).material.color.b = hexToRgb(document.getElementById("hexColorInput").value).b / 255;
});

document.getElementById("roughness").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.roughness = document.getElementById("roughness").value;
});

document.getElementById("metalness").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.metalness = document.getElementById("metalness").value;
});

document.getElementById("reflectivity").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.reflectivity = document.getElementById("reflectivity").value;
});

document.getElementById("clearcoat").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.clearcoat = document.getElementById("clearcoat").value;
});

document.getElementById("clearcoatRoughness").addEventListener("change", function(){
  scene.getObjectByName(selectedSceneObject).material.clearcoatRoughness = document.getElementById("clearcoatRoughness").value;
});