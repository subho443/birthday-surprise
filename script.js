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

scene.add(new THREE.AmbientLight(0xffffff, 1.4));

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
const starGeo = new THREE.SphereGeometry(0.05, 8, 8);

for (let i = 0; i < 1200; i++) {

    const star = new THREE.Mesh(
        starGeo,
        new THREE.MeshBasicMaterial({ color: 0xffffff })
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
// HEARTS
// ===========================================

const hearts = [];
const heartGeo = new THREE.SphereGeometry(0.18, 20, 20);

for (let i = 0; i < 350; i++) {

    const heart = new THREE.Mesh(
        heartGeo,
        new THREE.MeshPhongMaterial({
            color: 0xff3b7d,
            emissive: 0xff1a66
        })
    );

    heart.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30
    );

    heart.speed = 0.01 + Math.random() * 0.02;
    heart.rotSpeed = 0.01 + Math.random() * 0.03;

    hearts.push(heart);
    scene.add(heart);
}



// ===========================================
// SPARKLES
// ===========================================

const sparkles = [];
const sparkGeo = new THREE.SphereGeometry(0.05, 10, 10);

for (let i = 0; i < 500; i++) {

    const sparkle = new THREE.Mesh(
        sparkGeo,
        new THREE.MeshBasicMaterial({ color: 0xffffaa })
    );

    sparkle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 60
    );

    sparkle.speed = Math.random() * 0.02;

    sparkles.push(sparkle);
    scene.add(sparkle);
}



// ===========================================
// 3D CAKE
// ===========================================

const cake = new THREE.Group();

// bottom
const layer1 = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 1.2, 64),
    new THREE.MeshPhongMaterial({ color: 0xffc2d1 })
);
cake.add(layer1);

// middle
const layer2 = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 1.1, 64),
    new THREE.MeshPhongMaterial({ color: 0xff99bb })
);
layer2.position.y = 1.15;
cake.add(layer2);

// top
const layer3 = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 1, 64),
    new THREE.MeshPhongMaterial({ color: 0xff77aa })
);
layer3.position.y = 2.2;
cake.add(layer3);

// icing
const icing = new THREE.Mesh(
    new THREE.CylinderGeometry(2.1, 2.1, 0.22, 64),
    new THREE.MeshPhongMaterial({ color: 0xffffff })
);
icing.position.y = 2.72;
cake.add(icing);

// base
const base = new THREE.Mesh(
    new THREE.CylinderGeometry(5.2, 5.2, 0.25, 64),
    new THREE.MeshPhongMaterial({ color: 0xd4af37 })
);
base.position.y = -0.7;
cake.add(base);

// candles + flames
const flames = [];

for (let i = 0; i < 5; i++) {

    const candle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.9),
        new THREE.MeshPhongMaterial({ color: 0x87cefa })
    );

    candle.position.set(-1 + i * 0.5, 3.3, 0);
    cake.add(candle);

    const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.09),
        new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );

    flame.position.set(-1 + i * 0.5, 3.85, 0);
    flames.push(flame);
    cake.add(flame);
}

// light
const flameLight = new THREE.PointLight(0xffaa00, 3, 20);
flameLight.position.set(0, 4, 0);
cake.add(flameLight);

cake.position.y = -2;
scene.add(cake);



// ===========================================
// GATE LOGIC
// ===========================================

const gate = document.getElementById("gate");
const yes = document.getElementById("yesBtn");
const no = document.getElementById("noBtn");
const gift = document.getElementById("gift");
const message = document.getElementById("correctMessage");
const music = document.getElementById("music");

document.getElementById("overlay").style.display = "none";
document.getElementById("gallery").style.display = "none";
document.getElementById("musicControl").style.display = "none";

no.addEventListener("mouseenter", () => {
    no.style.position = "fixed";
    no.style.left = Math.random() * (window.innerWidth - 120) + "px";
    no.style.top = Math.random() * (window.innerHeight - 60) + "px";
});

yes.onclick = () => {

    confetti({ particleCount: 250, spread: 180, origin: { y: 0.6 } });

    yes.style.display = "none";
    no.style.display = "none";

    message.style.display = "block";

    music.volume = 0.35;
    music.play().catch(() => {});
};

gift.onclick = () => {

    gift.innerHTML = "💖";
    gift.style.transform = "scale(8)";
    gift.style.opacity = "0";

    setTimeout(() => {
        gate.style.opacity = "0";
    }, 700);

    setTimeout(() => {

        gate.style.display = "none";

        document.getElementById("overlay").style.display = "block";
        document.getElementById("gallery").style.display = "block";
        document.getElementById("musicControl").style.display = "block";

        confetti({ particleCount: 500, spread: 360, origin: { y: 0.5 } });

    }, 1700);
};



// ===========================================
// ANIMATION LOOP
// ===========================================

let angle = 0;

function animate() {

    requestAnimationFrame(animate);

    angle += 0.002;

    camera.position.x = Math.sin(angle) * 2;
    camera.lookAt(0, 4, 0);

    hearts.forEach(h => {
        h.rotation.x += h.rotSpeed;
        h.rotation.y += h.rotSpeed;
        h.position.y += h.speed;
        if (h.position.y > 12) h.position.y = -10;
    });

    sparkles.forEach(s => {
        s.position.y += s.speed;
        if (s.position.y > 15) s.position.y = -15;
    });

    cake.rotation.y += 0.005;

    flames.forEach((f, i) => {
        f.scale.y = 1 + Math.sin(Date.now() * 0.01 + i) * 0.3;
    });

    flameLight.intensity = 2.5 + Math.sin(Date.now() * 0.01) * 0.8;

    stars.forEach(s => {
        s.rotation.x += 0.002;
        s.rotation.y += 0.002;
    });

    renderer.render(scene, camera);
}

animate();



// ===========================================
// RESIZE
// ===========================================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});



// ===========================================
// LOADING SCREEN
// ===========================================

setTimeout(() => {
    document.getElementById("loading").style.display = "none";
}, 3000);



// ===========================================
// CONFETTI LOOP
// ===========================================

setInterval(() => {

    confetti({
        particleCount: 5,
        spread: 70,
        origin: { y: 0 }
    });

}, 2000);
