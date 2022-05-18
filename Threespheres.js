const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.SphereGeometry(1, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
const geometry2 = new THREE.SphereGeometry(1, 10, 10);
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const sphere2 = new THREE.Mesh(geometry, material);
scene.add(sphere2);
const geometry3 = new THREE.SphereGeometry(1, 10, 10);
const material3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const sphere3 = new THREE.Mesh(geometry, material);
scene.add(sphere3);
sphere.position.x = -1;
sphere2.position.x = 2;
sphere3.position.x = -5;
camera.position.z = 10;
var zoomstate = 0;
var angleY = 0;
var radius = 10;
var rotatestate = 0;
function animate() {
  requestAnimationFrame(animate);
  /*  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere2.rotation.x += 0.01;
  sphere2.rotation.y += 0.01;
	sphere3.rotation.x += 0.01;
	sphere3.rotation.y += 0.01;
*/
  renderer.render(scene, camera);
  camera.rotation.y = (90 * Math.PI) / 180 - angleY;

  camera.position.x = radius * Math.cos(angleY);
  camera.position.z = radius * Math.sin(angleY);

  switch (zoomstate) {
    case -1:
      radius += 0.1;
      break;
    case 1:
      radius += -0.1;
      break;
    default:
  }
  switch (rotatestate) {
    case 1:
      angleY += 0.05;
      break;
    case -1:
      angleY += -0.05;
      break;
    default:
  }
}
animate();

window.addEventListener("keydown", keydownEvent);
window.addEventListener("keyup", keyupEvent);
function keydownEvent(event) {
  switch (event.key) {
    case "-":
      zoomstate = -1;
      break;
    case "=":
      zoomstate = 1;
      break;
    case "[":
      rotatestate = 1;
      break;
    case "]":
      rotatestate = -1;
      break;
    case ";":
			rotatestate = 2;
		case "'":
			rotatestate = -2;
    default:
      zoomstate = 0;
      rotatestate = 0;
      break;
  }
  console.log(zoomstate);
}
function keyupEvent(event) {
  switch (event.key) {
    case "-":
    case "=":
      zoomstate = 0;
      break;
    case "[":
    case "]":
    case ";":
    case "'":
      rotatestate = 0;
      break;
    default:
      break;
  }
  console.log(zoomstate);
}
