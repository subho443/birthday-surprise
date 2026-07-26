/* ==========================================================
   HappyBirthdaySamm
   scene.js

   Premium Three.js Scene Manager
   ========================================================== */

"use strict";

window.SceneManager = (() => {

    let scene;
    let camera;
    let renderer;
    let clock;

    let starField;
    let starGeometry;
    let starMaterial;

    let floatingLights = [];

    let animationStarted = false;

    const config = {

        fov: 50,

        near: 0.1,

        far: 2000,

        cameraPosition: {
            x: 0,
            y: 2,
            z: 12
        },

        stars: 4000,

        radius: 250

    };

    /* ====================================================== */

    async function init() {

        clock = new THREE.Clock();

        createScene();

        createRenderer();

        createCamera();

        createLights();

        createStars();

        createFloatingLights();

        registerObjects();

    }

    /* ====================================================== */

    function createScene() {

        scene = new THREE.Scene();

        scene.background = new THREE.Color(0x050505);

        scene.fog = new THREE.FogExp2(
            0x000000,
            0.015
        );

    }

    /* ====================================================== */

    function createRenderer() {

        renderer = new THREE.WebGLRenderer({

            canvas: document.getElementById("scene"),

            antialias: true,

            alpha: true,

            powerPreference: "high-performance"

        });

        renderer.setPixelRatio(

            Math.min(window.devicePixelRatio, 2)

        );

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        renderer.shadowMap.enabled = true;

        renderer.shadowMap.type =
            THREE.PCFSoftShadowMap;

    }

    /* ====================================================== */

    function createCamera() {

        camera = new THREE.PerspectiveCamera(

            config.fov,

            window.innerWidth / window.innerHeight,

            config.near,

            config.far

        );

        camera.position.set(

            config.cameraPosition.x,

            config.cameraPosition.y,

            config.cameraPosition.z

        );

        scene.add(camera);

    }

    /* ====================================================== */

    function createLights() {

        const ambient = new THREE.AmbientLight(
            0xfff5d5,
            1.2
        );

        scene.add(ambient);

        const goldLight = new THREE.DirectionalLight(
            0xffd16b,
            2
        );

        goldLight.position.set(
            10,
            20,
            10
        );

        goldLight.castShadow = true;

        goldLight.shadow.mapSize.width = 2048;
        goldLight.shadow.mapSize.height = 2048;

        scene.add(goldLight);

        const rim = new THREE.PointLight(
            0xffaa33,
            20,
            80
        );

        rim.position.set(
            -10,
            8,
            -8
        );

        scene.add(rim);

    }

    /* ====================================================== */

    function createStars() {

        starGeometry = new THREE.BufferGeometry();

        const positions = [];

        for (let i = 0; i < config.stars; i++) {

            const r =
                config.radius *
                Math.random();

            const theta =
                Math.random() *
                Math.PI *
                2;

            const phi =
                Math.acos(
                    (Math.random() * 2) - 1
                );

            positions.push(

                r *
                Math.sin(phi) *
                Math.cos(theta),

                r *
                Math.sin(phi) *
                Math.sin(theta),

                r *
                Math.cos(phi)

            );

        }

        starGeometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                positions,
                3
            )

        );

        starMaterial = new THREE.PointsMaterial({

            color: 0xfff4cc,

            size: 0.6,

            transparent: true,

            opacity: 0.85,

            depthWrite: false

        });

        starField = new THREE.Points(

            starGeometry,

            starMaterial

        );

        scene.add(starField);

    }

    /* ====================================================== */

    function createFloatingLights() {

        for (let i = 0; i < 15; i++) {

            const light = new THREE.PointLight(

                0xffd56b,

                2,

                15

            );

            light.position.set(

                (Math.random() - 0.5) * 18,

                Math.random() * 10,

                (Math.random() - 0.5) * 18

            );

            floatingLights.push({

                light,

                offset: Math.random() * 10,

                speed: 0.3 + Math.random()

            });

            scene.add(light);

        }

    }

    /* ====================================================== */

    function registerObjects() {

        if (
            window.GiftManager &&
            GiftManager.object3D
        ) {

            scene.add(
                GiftManager.object3D
            );

        }

        if (
            window.CakeManager &&
            CakeManager.object3D
        ) {

            scene.add(
                CakeManager.object3D
            );

        }

    }

    /* ====================================================== */

    function start() {

        animationStarted = true;

    }

    /* ======================================================
       CAMERA MOTION
    ====================================================== */

    const mouse = {
        x: 0,
        y: 0
    };

    const target = {
        x: config.cameraPosition.x,
        y: config.cameraPosition.y
    };

    window.addEventListener("mousemove", e => {

        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;

    });

    function updateCamera(delta) {

        target.x = mouse.x * 0.8;
        target.y = 2 + mouse.y * 0.5;

        camera.position.x +=
            (target.x - camera.position.x) *
            delta *
            2.5;

        camera.position.y +=
            (target.y - camera.position.y) *
            delta *
            2.5;

        camera.lookAt(0, 1.5, 0);

    }

    /* ======================================================
       STAR ANIMATION
    ====================================================== */

    function updateStars(delta) {

        if (!starField) return;

        starField.rotation.y += delta * 0.02;
        starField.rotation.x += delta * 0.005;

    }

    /* ======================================================
       FLOATING LIGHT ANIMATION
    ====================================================== */

    function updateLights(time) {

        floatingLights.forEach(item => {

            item.light.position.y =
                4 +
                Math.sin(
                    time * item.speed + item.offset
                ) * 2;

            item.light.position.x +=
                Math.sin(
                    time * 0.2 + item.offset
                ) * 0.002;

        });

    }

    /* ======================================================
       SCENE UPDATE
    ====================================================== */

    function update(delta) {

        if (!animationStarted) return;

        const elapsed = clock.getElapsedTime();

        updateCamera(delta);

        updateStars(delta);

        updateLights(elapsed);

        renderer.render(scene, camera);

    }

    /* ======================================================
       RESIZE
    ====================================================== */

    function resize() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        renderer.setPixelRatio(

            Math.min(window.devicePixelRatio, 2)

        );

    }

    /* ======================================================
       PUBLIC HELPERS
    ====================================================== */

    function add(object) {

        if (object) {

            scene.add(object);

        }

    }

    function remove(object) {

        if (object) {

            scene.remove(object);

        }

    }

    function getScene() {

        return scene;

    }

    function getCamera() {

        return camera;

    }

    function getRenderer() {

        return renderer;

    }

    /* ======================================================
       CLEANUP
    ====================================================== */

    function dispose() {

        if (starGeometry) {

            starGeometry.dispose();

        }

        if (starMaterial) {

            starMaterial.dispose();

        }

        floatingLights.forEach(item => {

            scene.remove(item.light);

        });

        floatingLights.length = 0;

        renderer.dispose();

    }

    /* ======================================================
       API
    ====================================================== */

    return {

        init,

        start,

        update,

        resize,

        add,

        remove,

        dispose,

        getScene,

        getCamera,

        getRenderer

    };

})();









                       
