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


    // ==========================================
// 3D BIRTHDAY CAKE
// ==========================================

const cake = new THREE.Group();


// ---------- Bottom Layer ----------

const layer1 = new THREE.Mesh(

    new THREE.CylinderGeometry(4,4,1.2,64),

    new THREE.MeshPhongMaterial({

        color:0xffc2d1,

        shininess:120

    })

);

layer1.position.y=0;

cake.add(layer1);


// ---------- Middle Layer ----------

const layer2 = new THREE.Mesh(

    new THREE.CylinderGeometry(3,3,1.1,64),

    new THREE.MeshPhongMaterial({

        color:0xff99bb,

        shininess:120

    })

);

layer2.position.y=1.15;

cake.add(layer2);


// ---------- Top Layer ----------

const layer3 = new THREE.Mesh(

    new THREE.CylinderGeometry(2,2,1,64),

    new THREE.MeshPhongMaterial({

        color:0xff77aa,

        shininess:120

    })

);

layer3.position.y=2.2;

cake.add(layer3);



// ==========================================
// ICING
// ==========================================

const icing = new THREE.Mesh(

    new THREE.CylinderGeometry(2.1,2.1,0.22,64),

    new THREE.MeshPhongMaterial({

        color:0xffffff

    })

);

icing.position.y=2.72;

cake.add(icing);



// ==========================================
// CAKE BASE
// ==========================================

const base = new THREE.Mesh(

    new THREE.CylinderGeometry(5.2,5.2,0.25,64),

    new THREE.MeshPhongMaterial({

        color:0xd4af37,

        metalness:0.4

    })

);

base.position.y=-0.7;

cake.add(base);



// ==========================================
// CHERRIES
// ==========================================

for(let i=0;i<12;i++){

    const cherry=new THREE.Mesh(

        new THREE.SphereGeometry(0.18,20,20),

        new THREE.MeshPhongMaterial({

            color:0xcc0000,

            emissive:0x550000

        })

    );

    const angle=(Math.PI*2/12)*i;

    cherry.position.set(

        Math.cos(angle)*1.8,

        2.85,

        Math.sin(angle)*1.8

    );

    cake.add(cherry);

}



// ==========================================
// CANDLES
// ==========================================

const candleGroup=new THREE.Group();

for(let i=0;i<5;i++){

    const candle=new THREE.Mesh(

        new THREE.CylinderGeometry(0.08,0.08,0.9,20),

        new THREE.MeshPhongMaterial({

            color:0x87cefa

        })

    );

    candle.position.set(

        -1+i*0.5,

        3.3,

        0

    );

    candleGroup.add(candle);

}

cake.add(candleGroup);



// ==========================================
// FLAMES
// ==========================================

const flames=[];

for(let i=0;i<5;i++){

    const flame=new THREE.Mesh(

        new THREE.SphereGeometry(0.09,16,16),

        new THREE.MeshBasicMaterial({

            color:0xffcc00

        })

    );

    flame.position.set(

        -1+i*0.5,

        3.85,

        0

    );

    flames.push(flame);

    cake.add(flame);

}



// Flame Lights

const flameLight=new THREE.PointLight(

    0xffaa00,

    3,

    20

);

flameLight.position.set(0,4,0);

cake.add(flameLight);



// ==========================================
// SPRINKLES
// ==========================================

for(let i=0;i<150;i++){

    const sprinkle=new THREE.Mesh(

        new THREE.BoxGeometry(

            0.05,

            0.15,

            0.05

        ),

        new THREE.MeshPhongMaterial({

            color:Math.random()*0xffffff

        })

    );

    const theta=Math.random()*Math.PI*2;

    const r=1.7+Math.random()*0.3;

    sprinkle.position.set(

        Math.cos(theta)*r,

        2.82,

        Math.sin(theta)*r

    );

    sprinkle.rotation.set(

        Math.random()*3,

        Math.random()*3,

        Math.random()*3

    );

    cake.add(sprinkle);

}



// ==========================================
// POSITION
// ==========================================

cake.position.y=-2;

scene.add(cake);

},2000);
const gate=document.getElementById("gate");

const yes=document.getElementById("yesBtn");

const no=document.getElementById("noBtn");

const gift=document.getElementById("gift");

const message=document.getElementById("correctMessage");

const music=document.getElementById("music");



// Hide birthday page first

document.getElementById("overlay").style.display="none";

document.getElementById("gallery").style.display="none";

document.getElementById("musicControl").style.display="none";



// ---------------------------
// NO BUTTON RUNS AWAY
// ---------------------------

function moveButton(){

let x=Math.random()*(window.innerWidth-180);

let y=Math.random()*(window.innerHeight-80);

no.style.position="fixed";

no.style.left=x+"px";

no.style.top=y+"px";

}

no.addEventListener("mouseenter",moveButton);

no.addEventListener("mouseover",moveButton);



// ---------------------------
// CORRECT ANSWER
// ---------------------------

yes.onclick=()=>{

confetti({

particleCount:250,

spread:180,

origin:{y:0.6}

});



yes.style.display="none";

no.style.display="none";



message.style.display="block";



music.volume=.35;

music.play().catch(()=>{});

};



// ---------------------------
// OPEN GIFT
// ---------------------------

gift.onclick=()=>{

gift.innerHTML="💖";

gift.style.transform="scale(8)";

gift.style.opacity="0";



setTimeout(()=>{

gate.style.opacity="0";

gate.style.transition="1s";

},700);



setTimeout(()=>{

gate.style.display="none";



document.getElementById("overlay").style.display="block";

document.getElementById("gallery").style.display="block";

document.getElementById("musicControl").style.display="block";



confetti({

particleCount:500,

spread:360,

origin:{y:0.5}

});



},1700);

};
