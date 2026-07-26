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
/* ==========================================================
   APP EVENT BUS
========================================================== */

const AppEvents = {

    events: {},

    on(event, callback) {

        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);

    },

    off(event, callback) {

        if (!this.events[event]) return;

        this.events[event] =
            this.events[event].filter(fn => fn !== callback);

    },

    emit(event, data = null) {

        if (!this.events[event]) return;

        this.events[event].forEach(fn => fn(data));

    }

};

window.AppEvents = AppEvents;


/* ==========================================================
   GLOBAL TIMELINE
========================================================== */

let masterTimeline = gsap.timeline({

    paused: true

});

function buildTimeline() {

    masterTimeline.clear();

    masterTimeline.addLabel("gift");

    masterTimeline.call(() => {

        if (window.GiftManager) {

            GiftManager.enableInteraction();

        }

    });

}

buildTimeline();


/* ==========================================================
   GIFT EVENTS
========================================================== */

AppEvents.on("giftOpened", () => {

    BirthdayApp.state.giftOpened = true;

    confetti({

        particleCount: 250,

        spread: 100,

        origin: {

            y: 0.65

        }

    });

    if (window.ParticlesManager) {

        ParticlesManager.fireworks();

    }

    gsap.delayedCall(1.5, () => {

        BirthdayApp.showLoveLetter();

    });

});


/* ==========================================================
   LETTER COMPLETE
========================================================== */

AppEvents.on("letterFinished", () => {

    gsap.delayedCall(1, () => {

        BirthdayApp.openGallery();

    });

});


/* ==========================================================
   GALLERY COMPLETE
========================================================== */

AppEvents.on("galleryFinished", () => {

    gsap.delayedCall(1, () => {

        BirthdayApp.showCake();

    });

});


/* ==========================================================
   CAKE COMPLETE
========================================================== */

AppEvents.on("cakeFinished", () => {

    gsap.delayedCall(2, () => {

        BirthdayApp.finishExperience();

    });

});


/* ==========================================================
   LOOP
========================================================== */

let previous = performance.now();

function animate(now) {

    const delta = (now - previous) / 1000;

    previous = now;

    if (window.SceneManager) {

        SceneManager.update(delta);

    }

    if (window.ParticlesManager) {

        ParticlesManager.update(delta);

    }

    if (window.GiftManager) {

        GiftManager.update(delta);

    }

    if (window.CakeManager) {

        CakeManager.update(delta);

    }

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);


/* ==========================================================
   VISIBILITY API
========================================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        if (window.MusicManager) {

            MusicManager.pause();

        }

    } else {

        if (
            BirthdayApp.state.musicStarted &&
            window.MusicManager
        ) {

            MusicManager.resume();

        }

    }

});


/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

window.addEventListener("keydown", e => {

    switch (e.key.toLowerCase()) {

        case "m":

            if (window.MusicManager) {

                MusicManager.toggleMute();

            }

            break;

        case "g":

            if (window.GalleryManager) {

                GalleryManager.open();

            }

            break;

        case "c":

            if (window.CakeManager) {

                CakeManager.show();

            }

            break;

        case "escape":

            if (window.GalleryManager) {

                GalleryManager.close();

            }

            break;

    }

});


/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

let frameCounter = 0;

let fps = 0;

setInterval(() => {

    fps = frameCounter;

    frameCounter = 0;

}, 1000);

function countFPS() {

    frameCounter++;

    requestAnimationFrame(countFPS);

}

countFPS();


/* ==========================================================
   MOBILE DETECTION
========================================================== */

BirthdayApp.isMobile = function () {

    return window.innerWidth < 768;

};


/* ==========================================================
   REDUCE MOTION SUPPORT
========================================================== */

BirthdayApp.prefersReducedMotion = function () {

    return window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;

};


/* ==========================================================
   SAFE GSAP WRAPPER
========================================================== */

BirthdayApp.animate = function (target, vars) {

    if (!target) return;

    gsap.to(target, vars);

};


/* ==========================================================
   ERROR HANDLER
========================================================== */

window.addEventListener("error", e => {

    console.error(

        "[HappyBirthdaySamm]",

        e.message

    );

});


window.addEventListener(

    "unhandledrejection",

    e => {

        console.error(e.reason);

    }

);


/* ==========================================================
   DEBUG API
========================================================== */

window.DebugBirthday = {

    openGift() {

        AppEvents.emit("giftOpened");

    },

    gallery() {

        AppEvents.emit("galleryFinished");

    },

    cake() {

        AppEvents.emit("cakeFinished");

    },

    ending() {

        BirthdayApp.finishExperience();

    }

};


/* ==========================================================
   APP READY
========================================================== */

console.log(

    "%cHappyBirthdaySamm Loaded",

    "color:gold;font-size:18px;font-weight:bold"

);
