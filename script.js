//Part 1: The math

//variables
var accelRes;
var velRes = 0;
var posRes;
var newPosRes;
var deltaT = 0.016;
var earthmass = 5980000000000000000000000;
var sunmass = 1988000000000000000000000000000;
var radius = 10000000000;
const gravConstant = 0.0000000000667384;
var gravForce = gravConstant * ((earthmass * sunmass) / (radius * radius) );
var earthTangVel = 10000 / deltaT;
var velPosRes = 0;
var oppleg;
var adjleg;
var angle;

//Physics functions
function gravAccel(){
    gravForce = gravConstant *  ((earthmass * sunmass) / (Math.pow(Math.sqrt((earth.position.x*1000000000)**2 + (earth.position.z*1000000000)**2), 2)));
    var accelRes = gravForce / earthmass * 10000000000;
    var velRes = accelRes * deltaT;
    var posRes = velRes * deltaT;
    radius = radius - posRes;
    if(earth.position.z !== 0){
        earth.position.x = radius/1000000000;
        oppleg = earth.position.z;              
    adjleg = earth.position.x;
    angle = Math.atan( oppleg / adjleg);
    console.log("oppleg" + oppleg + "adjleg" + adjleg + "angle" + angle);
   // var posResZ = Math.sin(angle) *  
    } else {
        //var z = 10000;
        // var angle = Math.atan2( y2 - y1, x2 - x1 ) * ( 180 / Math.PI )
        adjleg = earth.position.x;
        angle = Math.atan( oppleg / adjleg);
        console.log("oppleg" + oppleg + "adjleg" + adjleg + "angle" + angle);
        var zMov = Math.sin(angle) * Math.sqrt((earth.position.x*1000000000)**2 + (earth.position.z*1000000000)**2);     
        var xMov = Math.cos(angle) * Math.sqrt((earth.position.x*1000000000)**2 + (earth.position.z*1000000000)**2);
        
    }
    //console.log(earth.angle.z); invalid
    //gravForce = gravConstant * ((earthmass * sunmass) / (radius * radius) );
    
    //console.log("GRAV" + gravForce);
    console.log("DISTANCE" + Math.sqrt((earth.position.x*1000000000)**2 + (earth.position.z*1000000000)**2));
    console.log(posRes);
    //Time to TRIG
    
    //earth.position.z

}

function velMotion(){
    earth.position.z = earth.position.z + earthTangVel/100000000;
    //console.log("Earth position Z: " + earth.position.z);
    if(earth.position.x < 0){
        earth.position.z = earth.position.z - earthTangVel*2/100000000;
        console.log("ZZZ" + earth.position.z);
        //if(){}
    }
}


//Part 2: Creating the 3D object Scene

//Setup the Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//The Sun
const geometry2 = new THREE.SphereGeometry(); 
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true} );
const sun = new THREE.Mesh( geometry2, material2 );
scene.add(sun);
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;

//The Earth
const geometry3 = new THREE.SphereGeometry(); 
const material3 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true} );
const earth = new THREE.Mesh( geometry3, material3 );
scene.add(earth);
 
earth.position.x = 10;

//Camera Position 
camera.position.z = 100; 

//animation
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    gravAccel();
    velMotion();
    //console.log(earth.position.x);
    console.log("ZZZ" +earth.position.z)

}

animate();

//Part 3: Camera Functions

//All Three directional camera transforms
document.getElementById("zoomIn").addEventListener('mouseenter', zoomer);
document.getElementById("zoomOut").addEventListener('mouseenter', zoomer2);

function zoomer() {
    camera.position.z = camera.position.z + 10;
}

function zoomer2() {
    camera.position.z = camera.position.z - 10;
}

document.getElementById("xPlus").addEventListener('mouseenter', xoomer);
document.getElementById("xMinus").addEventListener('mouseenter', xoomer2);

function xoomer() {
    camera.position.x = camera.position.x + 5;
}

function xoomer2() {
    camera.position.x = camera.position.x - 5;
}

document.getElementById("yPlus").addEventListener('mouseenter', yoomer);
document.getElementById("yMinus").addEventListener('mouseenter', yoomer2);

function yoomer() {
    camera.position.y = camera.position.y + 5;
}

function yoomer2() {
    camera.position.y = camera.position.y - 5;
}

//Rotation
function xrotp (){
    camera.rotation.x = camera.rotation.x + 1;
}
