// ===============================
// THREE.JS SCENE
// ===============================

const canvas = document.getElementById("bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

// ===============================
// LIGHTS
// ===============================

const ambient = new THREE.AmbientLight(0xffffff,1.2);

scene.add(ambient);

const point = new THREE.PointLight(0xffd700,4);

point.position.set(5,8,5);

point.castShadow = true;

scene.add(point);

const point2 = new THREE.PointLight(0xffffff,2);

point2.position.set(-5,-3,5);

scene.add(point2);

// ===============================
// GIFT MATERIAL
// ===============================

const redMaterial = new THREE.MeshStandardMaterial({

    color:0xd61b1b,

    metalness:.6,

    roughness:.25

});

const goldMaterial = new THREE.MeshStandardMaterial({

    color:0xffd700,

    metalness:1,

    roughness:.1

});

// ===============================
// GIFT BOX
// ===============================

const gift = new THREE.Group();

// Main Box

const body = new THREE.Mesh(

    new THREE.BoxGeometry(2,2,2),

    redMaterial

);

body.castShadow=true;
body.receiveShadow=true;

gift.add(body);

// Lid

const lid = new THREE.Mesh(

    new THREE.BoxGeometry(2.1,.35,2.1),

    redMaterial

);

lid.position.y=1.15;

lid.castShadow=true;

gift.add(lid);

// Vertical Ribbon

const ribbonV = new THREE.Mesh(

    new THREE.BoxGeometry(.25,2.3,2.15),

    goldMaterial

);

gift.add(ribbonV);

// Horizontal Ribbon

const ribbonH = new THREE.Mesh(

    new THREE.BoxGeometry(2.15,.25,2.15),

    goldMaterial

);

gift.add(ribbonH);

// Bow

const bow1 = new THREE.Mesh(

    new THREE.TorusGeometry(.25,.08,20,60),

    goldMaterial

);

bow1.rotation.x=Math.PI/2;

bow1.position.y=1.38;

gift.add(bow1);

const bow2 = bow1.clone();

bow2.rotation.y=Math.PI/2;

gift.add(bow2);

scene.add(gift);

// ===============================
// STARS
// ===============================

const starGeometry = new THREE.SphereGeometry(.03,8,8);

const starMaterial = new THREE.MeshBasicMaterial({

    color:0xffffff

});

for(let i=0;i<1000;i++){

    const star=new THREE.Mesh(

        starGeometry,

        starMaterial

    );

    star.position.set(

        (Math.random()-.5)*120,

        (Math.random()-.5)*120,

        (Math.random()-.5)*120

    );

    scene.add(star);

}

// ===============================
// PARTICLES
// ===============================

const particles=[];

const particleGeometry=new THREE.SphereGeometry(.04,8,8);

const particleMaterial=new THREE.MeshBasicMaterial({

    color:0xffd700

});

for(let i=0;i<300;i++){

    const p=new THREE.Mesh(

        particleGeometry,

        particleMaterial

    );

    p.position.set(

        (Math.random()-.5)*20,

        (Math.random()-.5)*20,

        (Math.random()-.5)*20

    );

    particles.push(p);

    scene.add(p);

}

// ===============================
// MOUSE
// ===============================

let mouseX=0;
let mouseY=0;

window.addEventListener("mousemove",(event)=>{

    mouseX=(event.clientX-window.innerWidth/2)/100;

    mouseY=(event.clientY-window.innerHeight/2)/100;

});

// ===============================
// OPEN GIFT
// ===============================

window.openGift=function(){

    gsap.to(lid.position,{

        y:3,

        duration:1.2

    });

    gsap.to(lid.rotation,{

        z:-1.5,

        duration:1.2

    });

};

// ===============================
// ANIMATION
// ===============================

function animate(){

    requestAnimationFrame(animate);

    gift.rotation.y+=0.01;

    gift.rotation.x=Math.sin(Date.now()*0.001)*0.08;

    camera.position.x+=(mouseX-camera.position.x)*0.03;

    camera.position.y+=(-mouseY-camera.position.y)*0.03;

    camera.lookAt(scene.position);

    particles.forEach(p=>{

        p.rotation.x+=0.02;

        p.rotation.y+=0.02;

        p.position.y+=0.005;

        if(p.position.y>10){

            p.position.y=-10;

        }

    });

    renderer.render(scene,camera);

}

animate();

// ===============================
// RESIZE
// ===============================

window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});
