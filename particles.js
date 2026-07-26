/* ==========================================================
   HappyBirthdaySamm
   particles.js

   Premium Particle Effects Manager
   ========================================================== */

"use strict";

window.ParticlesManager = (() => {

    const particles = [];
    const fireworks = [];
    const hearts = [];

    let scene;

    const clock = new THREE.Clock();

    /* ====================================================== */

    function init() {

        scene = SceneManager.getScene();

        createAmbientParticles();

    }

    /* ====================================================== */

    function createAmbientParticles() {

        const geometry = new THREE.BufferGeometry();

        const positions = [];

        for (let i = 0; i < 2000; i++) {

            positions.push(

                (Math.random() - 0.5) * 120,
                Math.random() * 50,
                (Math.random() - 0.5) * 120

            );

        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                positions,

                3

            )

        );

        const material = new THREE.PointsMaterial({

            color: 0xffd86b,

            size: 0.12,

            transparent: true,

            opacity: 0.55,

            depthWrite: false,

            blending: THREE.AdditiveBlending

        });

        const points = new THREE.Points(

            geometry,

            material

        );

        scene.add(points);

        particles.push({

            mesh: points,

            speed: 0.04

        });

    }

    /* ======================================================
       FIREWORK
    ====================================================== */

    function fireworksBurst(position = new THREE.Vector3()) {

        const geometry = new THREE.BufferGeometry();

        const vertices = [];

        const velocities = [];

        for (let i = 0; i < 220; i++) {

            vertices.push(

                position.x,
                position.y,
                position.z

            );

            velocities.push(

                (Math.random() - 0.5) * 7,
                (Math.random() - 0.5) * 7,
                (Math.random() - 0.5) * 7

            );

        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                vertices,

                3

            )

        );

        const material = new THREE.PointsMaterial({

            color: 0xffd700,

            size: 0.16,

            transparent: true,

            opacity: 1,

            depthWrite: false,

            blending: THREE.AdditiveBlending

        });

        const mesh = new THREE.Points(

            geometry,

            material

        );

        scene.add(mesh);

        fireworks.push({

            mesh,

            velocities,

            life: 2.2

        });

    }

    /* ======================================================
       HEART BURST
    ====================================================== */

    function createHeartSprite() {

        const canvas = document.createElement("canvas");

        canvas.width = 64;
        canvas.height = 64;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ff5a92";

        ctx.font = "52px serif";

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.fillText("❤", 32, 36);

        const texture = new THREE.CanvasTexture(canvas);

        return new THREE.SpriteMaterial({

            map: texture,

            transparent: true

        });

    }

    function heartsBurst() {

        for (let i = 0; i < 35; i++) {

            const sprite = new THREE.Sprite(

                createHeartSprite()

            );

            sprite.position.set(

                (Math.random() - 0.5) * 2,

                2,

                (Math.random() - 0.5) * 2

            );

            sprite.scale.set(0.45, 0.45, 0.45);

            scene.add(sprite);

            hearts.push({

                sprite,

                velocity: new THREE.Vector3(

                    (Math.random() - 0.5) * 0.8,

                    0.7 + Math.random(),

                    (Math.random() - 0.5) * 0.8

                ),

                rotation: Math.random(),

                life: 4

            });

        }

    }

    /* ======================================================
       GOLDEN SPARKLES
    ====================================================== */

    function sparkles() {

        for (let i = 0; i < 6; i++) {

            fireworksBurst(

                new THREE.Vector3(

                    (Math.random() - 0.5) * 3,

                    2 + Math.random() * 2,

                    (Math.random() - 0.5) * 3

                )

            );

        }

    }

                               /* ======================================================
       AMBIENT PARTICLES
    ====================================================== */

    function updateAmbient(delta) {

        particles.forEach(item => {

            item.mesh.rotation.y +=
                item.speed * delta;

            item.mesh.rotation.x +=
                item.speed * 0.25 * delta;

        });

    }

    /* ======================================================
       FIREWORK PHYSICS
    ====================================================== */

    function updateFireworks(delta) {

        for (let i = fireworks.length - 1; i >= 0; i--) {

            const burst = fireworks[i];

            burst.life -= delta;

            const positions =
                burst.mesh.geometry.attributes.position.array;

            for (let p = 0; p < burst.velocities.length; p += 3) {

                positions[p] +=
                    burst.velocities[p] * delta;

                positions[p + 1] +=
                    burst.velocities[p + 1] * delta;

                positions[p + 2] +=
                    burst.velocities[p + 2] * delta;

                // gravity

                burst.velocities[p + 1] -=
                    2.5 * delta;
            }

            burst.mesh.geometry.attributes.position.needsUpdate = true;

            burst.mesh.material.opacity =
                Math.max(0, burst.life / 2.2);

            if (burst.life <= 0) {

                scene.remove(burst.mesh);

                burst.mesh.geometry.dispose();
                burst.mesh.material.dispose();

                fireworks.splice(i, 1);

            }

        }

    }

    /* ======================================================
       HEART ANIMATION
    ====================================================== */

    function updateHearts(delta) {

        for (let i = hearts.length - 1; i >= 0; i--) {

            const heart = hearts[i];

            heart.life -= delta;

            heart.sprite.position.addScaledVector(
                heart.velocity,
                delta
            );

            heart.sprite.material.opacity =
                Math.max(0, heart.life / 4);

            heart.sprite.rotation +=
                delta * 1.5;

            heart.sprite.scale.multiplyScalar(
                1 + delta * 0.08
            );

            if (heart.life <= 0) {

                scene.remove(heart.sprite);

                heart.sprite.material.map.dispose();
                heart.sprite.material.dispose();

                hearts.splice(i, 1);

            }

        }

    }

    /* ======================================================
       UPDATE LOOP
    ====================================================== */

    function update(delta) {

        updateAmbient(delta);

        updateFireworks(delta);

        updateHearts(delta);

    }

    /* ======================================================
       PUBLIC EFFECTS
    ====================================================== */

    function fireworksEffect() {

        fireworksBurst(
            new THREE.Vector3(0, 2, 0)
        );

    }

    function heartsEffect() {

        heartsBurst();

    }

    /* ======================================================
       CLEAR ALL
    ====================================================== */

    function clear() {

        fireworks.forEach(item => {

            scene.remove(item.mesh);

            item.mesh.geometry.dispose();
            item.mesh.material.dispose();

        });

        hearts.forEach(item => {

            scene.remove(item.sprite);

            item.sprite.material.map.dispose();
            item.sprite.material.dispose();

        });

        fireworks.length = 0;

        hearts.length = 0;

    }

    /* ======================================================
       DISPOSE
    ====================================================== */

    function dispose() {

        clear();

        particles.forEach(item => {

            scene.remove(item.mesh);

            item.mesh.geometry.dispose();
            item.mesh.material.dispose();

        });

        particles.length = 0;

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        init,

        update,

        dispose,

        clear,

        fireworks: fireworksEffect,

        hearts: heartsEffect,

        sparkles

    };

})();
