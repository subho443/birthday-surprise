/* ==========================================================
   HappyBirthdaySamm
   app.js

   Main Application Controller

   Coordinates:
   - Loader
   - Scene
   - Gift
   - Gallery
   - Cake
   - Music
   - Particles
   - UI
   ========================================================== */

"use strict";

window.BirthdayApp = (() => {

    const state = {

        loaded: false,

        introFinished: false,

        giftOpened: false,

        galleryOpened: false,

        cakeShown: false,

        musicStarted: false,

        currentSection: "loading"

    };


    const elements = {

        loader: null,

        progressBar: null,

        loadingText: null,

        canvas: null,

        overlay: null,

        introTitle: null,

        enterButton: null,

        giftButton: null,

        letter: null,

        gallery: null,

        cake: null,

        ending: null

    };


    function cacheDOM() {

        elements.loader = document.getElementById("loader");

        elements.progressBar = document.getElementById("loader-progress");

        elements.loadingText = document.getElementById("loading-text");

        elements.canvas = document.getElementById("scene");

        elements.overlay = document.getElementById("overlay");

        elements.introTitle = document.getElementById("intro-title");

        elements.enterButton = document.getElementById("enter-btn");

        elements.giftButton = document.getElementById("gift-btn");

        elements.letter = document.getElementById("love-letter");

        elements.gallery = document.getElementById("gallery");

        elements.cake = document.getElementById("cake-section");

        elements.ending = document.getElementById("ending-screen");

    }

    /* ------------------------------------------------------ */

    function preloadAssets() {

        return new Promise(resolve => {

            const fakeAssets = [

                "textures",

                "music",

                "models",

                "gallery",

                "fonts",

                "particles",

                "scene",

                "cake"

            ];

            let loaded = 0;

            const total = fakeAssets.length;

            const timer = setInterval(() => {

                loaded++;

                const percent = Math.floor((loaded / total) * 100);

                if (elements.progressBar) {

                    elements.progressBar.style.width = percent + "%";

                }

                if (elements.loadingText) {

                    elements.loadingText.textContent =
                        "Loading " + percent + "%";

                }

                if (loaded >= total) {

                    clearInterval(timer);

                    resolve();

                }

            }, 350);

        });

    }

    /* ------------------------------------------------------ */

    async function initializeModules() {

        if (window.SceneManager) {

            await SceneManager.init();

        }

        if (window.ParticlesManager) {

            ParticlesManager.init();

        }

        if (window.MusicManager) {

            MusicManager.init();

        }

        if (window.GiftManager) {

            GiftManager.init();

        }

        if (window.GalleryManager) {

            GalleryManager.init();

        }

        if (window.CakeManager) {

            CakeManager.init();

        }

    }

    /* ------------------------------------------------------ */

    async function hideLoader() {

        return new Promise(resolve => {

            gsap.to(elements.loader, {

                opacity: 0,

                duration: 1.2,

                ease: "power3.out",

                onComplete: () => {

                    elements.loader.style.display = "none";

                    resolve();

                }

            });

        });

    }

    /* ------------------------------------------------------ */

    async function playIntroAnimation() {

        state.currentSection = "intro";

        const tl = gsap.timeline();

        tl.from(elements.introTitle, {

            opacity: 0,

            y: 120,

            duration: 1.6,

            ease: "power4.out"

        });

        tl.from(elements.enterButton, {

            opacity: 0,

            scale: 0.5,

            duration: 1,

            ease: "back.out(2)"

        });

    }

    /* ------------------------------------------------------ */

    function bindEvents() {

        if (elements.enterButton) {

            elements.enterButton.addEventListener("click", beginExperience);

        }

        window.addEventListener("resize", () => {

            if (window.SceneManager) {

                SceneManager.resize();

            }

        });

    }

    /* ------------------------------------------------------ */

    async function beginExperience() {

        if (state.introFinished) return;

        state.introFinished = true;

        gsap.to("#intro-screen", {

            opacity: 0,

            duration: 1,

            onComplete() {

                const intro = document.getElementById("intro-screen");

                if (intro) {

                    intro.style.display = "none";

                }

            }

        });

        if (window.SceneManager) {

            SceneManager.start();

        }

        if (window.MusicManager) {

            MusicManager.play();

            state.musicStarted = true;

        }

        setTimeout(() => {

            if (window.GiftManager) {

                GiftManager.showGift();

            }

        }, 1500);

    }

    /* ------------------------------------------------------ */

    function showLoveLetter() {

        state.currentSection = "letter";

        if (window.GiftManager) {

            GiftManager.hide();

        }

        if (window.Typewriter) {

            Typewriter.start();

        }

        gsap.to(elements.letter, {

            opacity: 1,

            y: 0,

            duration: 1.2,

            ease: "power3.out"

        });

    }

    /* ------------------------------------------------------ */

    function openGallery() {

        state.galleryOpened = true;

        state.currentSection = "gallery";

        if (window.GalleryManager) {

            GalleryManager.open();

        }

    }

    /* ------------------------------------------------------ */

    function showCake() {

        state.cakeShown = true;

        state.currentSection = "cake";

        if (window.CakeManager) {

            CakeManager.show();

        }

    }

    /* ------------------------------------------------------ */

    function finishExperience() {

        state.currentSection = "ending";

        gsap.to(elements.ending, {

            opacity: 1,

            duration: 2,

            ease: "power2.out"

        });

    }

    /* ------------------------------------------------------ */

    async function init() {

        cacheDOM();

        bindEvents();

        await preloadAssets();

        await initializeModules();

        await hideLoader();

        await playIntroAnimation();

        state.loaded = true;

    }

    return {

        init,

        showLoveLetter,

        openGallery,

        showCake,

        finishExperience,

        state

    };

})();

document.addEventListener("DOMContentLoaded", () => {

    BirthdayApp.init();

});
