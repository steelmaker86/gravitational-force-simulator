const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.SphereGeometry( 1, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
const geometry2 = new THREE.SphereGeometry( 1, 10, 10 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const sphere2 = new THREE.Mesh( geometry, material );
scene.add( sphere2 );
const geometry3 = new THREE.SphereGeometry( 1, 10, 10 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const sphere3 = new THREE.Mesh( geometry, material );
var angle = 0;
var radius = 5; 
scene.add( sphere3 );
sphere.position.x = -1
sphere2.position.x = 2
sphere3.position.x = -5;
camera.position.z=10
var zoomstate = 0;
var angle = 0;
var radius = 10; 
function animate() {
	requestAnimationFrame( animate );
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere2.rotation.x += 0.01;
  sphere2.rotation.y += 0.01;
	sphere3.rotation.x += 0.01;
	sphere3.rotation.y += 0.01;
	renderer.render( scene, camera );
  switch (zoomstate) {
  case -1: camera.position.z += 0.1;
  break;
  case 1: camera.position.z += -0.1;
  break;
  default: break;
  camera.position.x = radius * Math.cos( angle );  
  camera.position.z = radius * Math.sin( angle );
  angle += 0.01;
  }
}
animate(); 

window.addEventListener("keydown", keydownEvent);
window.addEventListener("keyup", keyupEvent);
function keydownEvent(event){
    switch (event.key) {
      case "-": zoomstate = -1;
      break;
      case "=": zoomstate = 1;
      break;
      default: zoomstate = 0;
      break;
  }
  console.log(zoomstate);
}
function keyupEvent() {
  zoomstate = 0;
  console.log(zoomstate);
}