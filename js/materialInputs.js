// Function to easily turn a hex color value into rgb values:
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Function to easily turn a rgb values value into a hex color:
function rgbToHex(r, g, b) { 
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

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

function resetMaterialsToSelectedObjectValue(){
  document.getElementById("hexColorInput").value = rgbToHex(scene.getObjectByName(selectedSceneObject).material.color.r * 255, scene.getObjectByName(selectedSceneObject).material.color.g * 255, scene.getObjectByName(selectedSceneObject).material.color.b * 255);

  document.getElementById("roughness").value = scene.getObjectByName(selectedSceneObject).material.roughness;
  document.getElementById("metalness").value = scene.getObjectByName(selectedSceneObject).material.metalness;
  document.getElementById("reflectivity").value = scene.getObjectByName(selectedSceneObject).material.reflectivity;
  document.getElementById("clearcoat").value = scene.getObjectByName(selectedSceneObject).material.clearcoat;
  document.getElementById("clearcoatRoughness").value = scene.getObjectByName(selectedSceneObject).material.clearcoatRoughness;
}



