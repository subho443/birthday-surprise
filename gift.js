/* ==========================================================
   HappyBirthdaySamm
   gift.js

   Premium Interactive 3D Gift Box
   ========================================================== */

"use strict";

window.GiftManager = (() => {

    let group;

    let boxMesh;
    let lidMesh;
    let ribbonVertical;
    let ribbonHorizontal;
    let bowMesh;

    let raycaster;
    let mouse;

    let rotating = false;
    let enabled = false;
    let opened = false;

    const config = {

        rotationSpeed: 0.45,

        hoverScale: 1.05,

        positionY: 1.2

    };

    /* ====================================================== */

    function init() {

        createGift();

        setupRaycaster();

        registerEvents();

    }

    /* ====================================================== */

    function createGift() {

        group = new THREE.Group();

        group.position.set(0, config.positionY, 0);

        createBox();

        createLid();

        createRibbon();

        createBow();

        group.visible = false;

    }

    /* ====================================================== */

    function createBox() {

        const geometry = new THREE.BoxGeometry(
            2,
            2,
            2
        );

        const material = new THREE.MeshPhysicalMaterial({

            color: 0x111111,

            metalness: 1,

            roughness: 0.18,

            clearcoat: 1,

            clearcoatRoughness: 0.05

        });

        boxMesh = new THREE.Mesh(

            geometry,

            material

        );

        boxMesh.castShadow = true;
        boxMesh.receiveShadow = true;

        group.add(boxMesh);

    }

    /* ====================================================== */

    function createLid() {

        const geometry = new THREE.BoxGeometry(

            2.15,

            0.35,

            2.15

        );

        const material = new THREE.MeshPhysicalMaterial({

            color: 0x171717,

            metalness: 1,

            roughness: 0.2,

            clearcoat: 1

        });

        lidMesh = new THREE.Mesh(

            geometry,

            material

        );

        lidMesh.position.y = 1.15;

        lidMesh.castShadow = true;

        group.add(lidMesh);

    }

    /* ====================================================== */

    function createRibbon() {

        const gold = new THREE.MeshStandardMaterial({

            color: 0xd4af37,

            metalness: 1,

            roughness: 0.15

        });

        ribbonVertical = new THREE.Mesh(

            new THREE.BoxGeometry(

                0.25,

                2.35,

                2.02

            ),

            gold

        );

        ribbonHorizontal = new THREE.Mesh(

            new THREE.BoxGeometry(

                2.02,

                2.35,

                0.25

            ),

            gold

        );

        group.add(ribbonVertical);

        group.add(ribbonHorizontal);

    }

    /* ====================================================== */

    function createBow() {

        const material = new THREE.MeshStandardMaterial({

            color: 0xffd34d,

            metalness: 1,

            roughness: 0.08

        });

        bowMesh = new THREE.Group();

        const loopGeometry = new THREE.TorusGeometry(

            0.28,

            0.08,

            20,

            40

        );

        const leftLoop = new THREE.Mesh(

            loopGeometry,

            material

        );

        const rightLoop = new THREE.Mesh(

            loopGeometry,

            material

        );

        leftLoop.rotation.y = Math.PI / 2;
        rightLoop.rotation.y = Math.PI / 2;

        leftLoop.position.x = -0.22;
        rightLoop.position.x = 0.22;

        bowMesh.add(leftLoop);
        bowMesh.add(rightLoop);

        bowMesh.position.y = 1.42;

        group.add(bowMesh);

    }

    /* ====================================================== */

    function setupRaycaster() {

        raycaster = new THREE.Raycaster();

        mouse = new THREE.Vector2();

    }

    /* ====================================================== */

    function registerEvents() {

        window.addEventListener(

            "pointermove",

            onPointerMove

        );

        window.addEventListener(

            "click",

            onClick

        );

    }

    /* ====================================================== */

    function onPointerMove(e) {

        mouse.x =
            (e.clientX / window.innerWidth) * 2 - 1;

        mouse.y =
            -(e.clientY / window.innerHeight) * 2 + 1;

    }

    /* ====================================================== */

    function onClick() {

        if (!enabled) return;

        if (opened) return;

        const camera =
            SceneManager.getCamera();

        raycaster.setFromCamera(

            mouse,

            camera

        );

        const hit = raycaster.intersectObject(

            boxMesh,

            true

        );

        if (hit.length > 0) {

            openGift();

        }

    }

    /* ====================================================== */

    function showGift() {

        group.visible = true;

        rotating = true;

        gsap.fromTo(

            group.scale,

            {

                x: 0,

                y: 0,

                z: 0

            },

            {

                x: 1,

                y: 1,

                z: 1,

                duration: 1.5,

                ease: "elastic.out(1,0.5)"

            }

        );

    }

    /* ====================================================== */

    function enableInteraction() {

        enabled = true;

        document.body.style.cursor = "pointer";

    }



                          /* ======================================================
       OPEN GIFT ANIMATION
    ====================================================== */

    function openGift() {

        if (opened) return;

        opened = true;
        enabled = false;
        rotating = false;

        document.body.style.cursor = "default";

        const tl = gsap.timeline({

            defaults: {
                ease: "power3.out"
            }

        });

        // Lift lid

        tl.to(lidMesh.position, {

            y: 3,

            duration: 1

        });

        tl.to(lidMesh.rotation, {

            z: -0.45,
            x: 0.25,

            duration: 1

        }, "<");

        // Ribbon separates

        tl.to(ribbonVertical.scale, {

            y: 0,

            duration: 0.6

        }, "<0.1");

        tl.to(ribbonHorizontal.scale, {

            y: 0,

            duration: 0.6

        }, "<");

        // Bow flies upward

        tl.to(bowMesh.position, {

            y: 4,

            duration: 1

        }, "<");

        tl.to(bowMesh.rotation, {

            y: Math.PI * 4,
            x: Math.PI,

            duration: 1

        }, "<");

        tl.call(() => {

            launchEffects();

        });

        tl.to(group.scale, {

            x: 0.92,
            y: 0.92,
            z: 0.92,

            duration: 0.4,

            yoyo: true,
            repeat: 1

        });

        tl.call(() => {

            if (window.AppEvents) {

                AppEvents.emit("giftOpened");

            }

        });

    }

    /* ======================================================
       PARTICLE / CONFETTI EFFECTS
    ====================================================== */

    function launchEffects() {

        if (typeof confetti === "function") {

            confetti({

                particleCount: 250,

                spread: 90,

                startVelocity: 55,

                origin: {

                    x: 0.5,
                    y: 0.55

                }

            });

        }

        if (window.ParticlesManager) {

            ParticlesManager.fireworks();

            ParticlesManager.hearts();

            ParticlesManager.sparkles();

        }

    }

    /* ======================================================
       HOVER ANIMATION
    ====================================================== */

    function hoverAnimation(delta) {

        if (!enabled || opened) return;

        const scale =

            1 +

            Math.sin(

                performance.now() * 0.003

            ) * 0.025;

        group.scale.lerp(

            new THREE.Vector3(

                scale,

                scale,

                scale

            ),

            delta * 3

        );

    }

    /* ======================================================
       ROTATION
    ====================================================== */

    function update(delta) {

        if (!group) return;

        if (rotating) {

            group.rotation.y +=

                config.rotationSpeed *

                delta;

            group.position.y =

                config.positionY +

                Math.sin(

                    performance.now() * 0.0018

                ) * 0.12;

        }

        hoverAnimation(delta);

    }

    /* ======================================================
       HIDE
    ====================================================== */

    function hide() {

        gsap.to(group.scale, {

            x: 0,
            y: 0,
            z: 0,

            duration: 0.8,

            ease: "back.in(1.8)",

            onComplete() {

                group.visible = false;

            }

        });

    }

    /* ======================================================
       RESET
    ====================================================== */

    function reset() {

        opened = false;

        enabled = false;

        rotating = false;

        group.visible = false;

        group.scale.set(1, 1, 1);

        lidMesh.position.set(0, 1.15, 0);

        lidMesh.rotation.set(0, 0, 0);

        ribbonVertical.scale.set(1, 1, 1);

        ribbonHorizontal.scale.set(1, 1, 1);

        bowMesh.position.set(0, 1.42, 0);

        bowMesh.rotation.set(0, 0, 0);

    }

    /* ======================================================
       DISPOSE
    ====================================================== */

    function dispose() {

        window.removeEventListener(
            "pointermove",
            onPointerMove
        );

        window.removeEventListener(
            "click",
            onClick
        );

        group.traverse(obj => {

            if (obj.geometry) {

                obj.geometry.dispose();

            }

            if (obj.material) {

                if (Array.isArray(obj.material)) {

                    obj.material.forEach(m => m.dispose());

                } else {

                    obj.material.dispose();

                }

            }

        });

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        init,

        update,

        reset,

        hide,

        showGift,

        enableInteraction,

        dispose,

        openGift,

        get object3D() {

            return group;

        }

    };

})();
