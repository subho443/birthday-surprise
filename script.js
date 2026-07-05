// ===========================================
// THREE.JS SCENE SETUP
// ===========================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 18);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg"),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



// ===========================================
// LIGHTS
// ===========================================

const ambient = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xff66aa, 3);
pointLight.position.set(0, 10, 8);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x66ccff, 2);
pointLight2.position.set(-8, 5, 5);
scene.add(pointLight2);



// ===========================================
// STARS
// ===========================================

const stars = [];

const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);

for (let i = 0; i < 1200; i++) {

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    const star = new THREE.Mesh(
        starGeometry,
        material
    );

    star.position.set(

        (Math.random() - 0.5) * 250,

        (Math.random() - 0.5) * 250,

        (Math.random() - 0.5) * 250

    );

    stars.push(star);

    scene.add(star);

}



// ===========================================
// FLOATING HEARTS
// ===========================================

const hearts = [];

const heartGeometry = new THREE.SphereGeometry(
    0.18,
    20,
    20
);

for (let i = 0; i < 350; i++) {

    const material = new THREE.MeshPhongMaterial({

        color: 0xff3b7d,

        emissive: 0xff1a66,

        shininess: 100

    });

    const heart = new THREE.Mesh(

        heartGeometry,

        material

    );

    heart.position.set(

        (Math.random() - 0.5) * 35,

        (Math.random() - 0.5) * 20,

        (Math.random() - 0.5) * 30

    );

    heart.speed =

        0.01 + Math.random() * 0.02;

    heart.rotationSpeed =

        0.01 + Math.random() * 0.03;

    hearts.push(heart);

    scene.add(heart);

}



// ===========================================
// FLOATING SPARKLES
// ===========================================

const sparkles = [];

const sparkleGeometry = new THREE.SphereGeometry(
    0.05,
    10,
    10
);

for (let i = 0; i < 500; i++) {

    const material = new THREE.MeshBasicMaterial({

        color: 0xffffaa

    });

    const sparkle = new THREE.Mesh(

        sparkleGeometry,

        material

    );

    sparkle.position.set(

        (Math.random() - 0.5) * 60,

        (Math.random() - 0.5) * 30,

        (Math.random() - 0.5) * 60

    );

    sparkle.speed =

        Math.random() * 0.02;

    sparkles.push(sparkle);

    scene.add(sparkle);

}



// ===========================================
// CAMERA FLOATING EFFECT
// ===========================================

let angle = 0;



// ===========================================
// ANIMATION LOOP
// ===========================================

function animate() {

    requestAnimationFrame(animate);

    angle += 0.002;

    camera.position.x = Math.sin(angle) * 2;

    camera.lookAt(0,4,0);



    // Hearts

    hearts.forEach((heart)=>{

        heart.rotation.x += heart.rotationSpeed;

        heart.rotation.y += heart.rotationSpeed;

        heart.position.y += heart.speed;

        if(heart.position.y>12){

            heart.position.y=-10;

        }

    });



    // Sparkles

    sparkles.forEach((s)=>{

        s.position.y+=s.speed;

        if(s.position.y>15){

            s.position.y=-15;

        }

    });



    // Stars

    stars.forEach((star)=>{

        star.rotation.x+=0.002;

        star.rotation.y+=0.002;

    });



    renderer.render(

        scene,

        camera

    );

}

animate();



// ===========================================
// RESPONSIVE
// ===========================================

window.addEventListener("resize",()=>{

    camera.aspect=

        window.innerWidth/

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});



// ===========================================
// LOADING SCREEN
// ===========================================

setTimeout(()=>{

    document.getElementById("loading").style.display="none";

},3000);



// ===========================================
// CONFETTI
// ===========================================

setInterval(()=>{

    confetti({

        particleCount:5,

        spread:70,

        origin:{y:0}

    });

},2000);
