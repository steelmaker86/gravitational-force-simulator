const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
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
sphere.position.x = -2;
sphere.position.y = -2;
sphere2.position.x = 2;
sphere2.position.y = 2;
camera.position.z = 10;
var zoomstate = 0;
var angleY = 90;
var radius = 10;
var rotatestate = 0;
var yrotatestate = 0;
var sphereVector1 = new THREE.Vector3( 0, 0, 0 );
var sphereVector2 = new THREE.Vector3( 0, 0, 0 );
var velList = [0,0,0];
var gForce = 0;
var Vel1 = 0;
var Vel2 = 0;
var VelV1 = new THREE.Vector3( 0, 0, 0 );
var VelV2 = new THREE.Vector3( 0, 0, 0 );
var dist1 = 0;
var dist2 = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  /*camera.rotation.y = (90 * Math.PI) / 180 - angleY;*/


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
// If = or - keys are being held, the radius of the circle the camera orbits in decreases
  switch (rotatestate) {
    case 1:
      angleY += 0.05;
      break;
    case -1:
      angleY += -0.05;
      break;
    default:
  }
// if [ or ] are held down, then rotate left or right
  switch (yrotatestate) {
    case 1:
    camera.position.y += 0.2;
    break;
    case -1: camera.position.y += -0.2;
    break;
    default:
  }
  dist1 = sphereVector1.distanceTo(sphereVector2)
// if ; or ' are held down, then change the y position of the camera
  sphereVector1.x = sphere.position.x
  sphereVector1.y = sphere.position.y
  sphereVector1.z = sphere.position.z
  sphereVector2.x = sphere2.position.x
  sphereVector2.y = sphere2.position.y
  sphereVector2.z = sphere2.position.z
  gForce = (1/sphereVector1.distanceToSquared(sphereVector2))*(6.67430e-5);
  Vel1 += gForce;
  velList.push(Vel1);
  velList.shift(1);
  console.log(velList);
  VelV1.x = (VelV1.x + (gForce/VelV1.distanceTo(sphereVector2)) * (sphereVector2.x-VelV1.x))
  VelV1.y = (VelV1.y + (gForce/VelV1.distanceTo(sphereVector2)) * (sphereVector2.y-VelV1.y))
  VelV1.z = (VelV1.z + (gForce/VelV1.distanceTo(sphereVector2)) * (sphereVector2.z-VelV1.z))
  VelV2.x = (VelV2.x + (gForce/VelV2.distanceTo(sphereVector1)) * (sphereVector1.x-VelV2.x))
  VelV2.y = (VelV2.y + (gForce/VelV2.distanceTo(sphereVector1)) * (sphereVector1.y-VelV2.y))
  VelV2.z = (VelV2.z + (gForce/VelV2.distanceTo(sphereVector1)) * (sphereVector1.z-VelV2.z))
  console.log(VelV1.distanceTo(sphereVector2))
// calculates the gravitational force/acceleration between the two spheres
  
  sphere.position.x = (sphereVector1.x + (Vel1/sphereVector1.distanceTo(VelV1)) * (VelV1.x-sphereVector1.x))
  sphere.position.y = (sphereVector1.y + (Vel1/sphereVector1.distanceTo(VelV1)) * (VelV1.y-sphereVector1.y))
  sphere.position.z = (sphereVector1.z + (Vel1/sphereVector1.distanceTo(VelV1)) * (VelV1.z-sphereVector1.z))
  sphere2.position.x = (sphereVector2.x + (Vel1/sphereVector2.distanceTo(VelV2)) * (VelV2.x-sphereVector2.x))
  sphere2.position.y = (sphereVector2.y + (Vel1/sphereVector2.distanceTo(VelV2)) * (VelV2.y-sphereVector2.y))
  sphere2.position.z = (sphereVector2.z + (Vel1/sphereVector2.distanceTo(VelV2)) * (VelV2.z-sphereVector2.z))
  dist2 = sphereVector1.distanceTo(sphereVector2)
  camera.lookAt(0,0,0);

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
      yrotatestate = 1;
      break;
    case "'":
      yrotatestate = -1;
      break
    default:
      zoomstate = 0;
      rotatestate = 0;
      yrotatestate = 0;
      break;
  }
}
function keyupEvent(event) {
  switch (event.key) {
    case "-":
    case "=":
      zoomstate = 0;
      break;
    case "[":
    case "]":
    rotatestate = 0;
    break;
    case ";":
    case "'":
    yrotatestate = 0;
    break;
    default:
    break;
  }
}
