/* ==========================================================
   HappyBirthdaySamm
   gallery.js

   Premium Cinematic Photo Gallery
   ========================================================== */

"use strict";

window.GalleryManager = (() => {

    let gallery;
    let track;
    let slides = [];

    let currentIndex = 0;
    let opened = false;
    let autoplay = null;

    const config = {

        autoPlay: true,

        autoPlayDelay: 4500,

        transitionDuration: 1.2

    };

    /* ====================================================== */

    function init() {

        gallery = document.getElementById("gallery");

        if (!gallery) return;

        track = gallery.querySelector(".gallery-track");

        slides = Array.from(

            gallery.querySelectorAll(".gallery-slide")

        );

        bindEvents();

    }

    /* ====================================================== */

    function bindEvents() {

        const nextBtn =

            document.getElementById("gallery-next");

        const prevBtn =

            document.getElementById("gallery-prev");

        if (nextBtn) {

            nextBtn.addEventListener(

                "click",

                next

            );

        }

        if (prevBtn) {

            prevBtn.addEventListener(

                "click",

                previous

            );

        }

        window.addEventListener(

            "keydown",

            keyboardNavigation

        );

        enableTouch();

    }

    /* ====================================================== */

    function open() {

        if (!gallery) return;

        opened = true;

        gallery.style.display = "flex";

        gsap.fromTo(

            gallery,

            {

                opacity: 0

            },

            {

                opacity: 1,

                duration: 1.2

            }

        );

        currentIndex = 0;

        updateSlides();

        if (config.autoPlay) {

            startAutoPlay();

        }

    }

    /* ====================================================== */

    function close() {

        stopAutoPlay();

        opened = false;

        gsap.to(gallery, {

            opacity: 0,

            duration: 0.8,

            onComplete() {

                gallery.style.display = "none";

            }

        });

    }

    /* ====================================================== */

    function next() {

        if (currentIndex < slides.length - 1) {

            currentIndex++;

            updateSlides();

        } else {

            finishGallery();

        }

    }

    /* ====================================================== */

    function previous() {

        if (currentIndex <= 0) return;

        currentIndex--;

        updateSlides();

    }

    /* ====================================================== */

    function updateSlides() {

        slides.forEach((slide, index) => {

            const offset = index - currentIndex;

            gsap.to(slide, {

                xPercent: offset * 100,

                scale: index === currentIndex ? 1 : 0.85,

                opacity: index === currentIndex ? 1 : 0.3,

                rotateY: offset * -20,

                duration: config.transitionDuration,

                ease: "power3.inOut"

            });

        });

    }

    /* ====================================================== */

    function keyboardNavigation(event) {

        if (!opened) return;

        switch (event.key) {

            case "ArrowRight":

                next();

                break;

            case "ArrowLeft":

                previous();

                break;

            case "Escape":

                close();

                break;

        }

    }

                             /* ======================================================
       TOUCH SUPPORT
    ====================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    function enableTouch() {

        gallery.addEventListener("touchstart", e => {

            touchStartX = e.changedTouches[0].clientX;

        }, { passive: true });

        gallery.addEventListener("touchend", e => {

            touchEndX = e.changedTouches[0].clientX;

            handleSwipe();

        }, { passive: true });

    }

    function handleSwipe() {

        const distance = touchStartX - touchEndX;

        if (Math.abs(distance) < 40) return;

        if (distance > 0) {

            next();

        } else {

            previous();

        }

    }

    /* ======================================================
       AUTOPLAY
    ====================================================== */

    function startAutoPlay() {

        stopAutoPlay();

        autoplay = setInterval(() => {

            next();

        }, config.autoPlayDelay);

    }

    function stopAutoPlay() {

        if (autoplay) {

            clearInterval(autoplay);

            autoplay = null;

        }

    }

    /* ======================================================
       FINISH GALLERY
    ====================================================== */

    function finishGallery() {

        stopAutoPlay();

        gsap.to(gallery, {

            opacity: 0,

            duration: 1,

            ease: "power2.inOut",

            onComplete() {

                gallery.style.display = "none";

                if (window.AppEvents) {

                    AppEvents.emit("galleryFinished");

                }

            }

        });

    }

    /* ======================================================
       JUMP TO SLIDE
    ====================================================== */

    function goTo(index) {

        if (!slides.length) return;

        index = Math.max(
            0,
            Math.min(index, slides.length - 1)
        );

        currentIndex = index;

        updateSlides();

    }

    /* ======================================================
       ADD IMAGE RUNTIME
    ====================================================== */

    function addImage(src, alt = "") {

        if (!track) return;

        const slide = document.createElement("div");
        slide.className = "gallery-slide";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;

        slide.appendChild(img);

        track.appendChild(slide);

        slides.push(slide);

        updateSlides();

    }

    /* ======================================================
       REMOVE IMAGE
    ====================================================== */

    function removeImage(index) {

        if (
            index < 0 ||
            index >= slides.length
        ) return;

        slides[index].remove();

        slides.splice(index, 1);

        currentIndex = Math.min(
            currentIndex,
            slides.length - 1
        );

        updateSlides();

    }

    /* ======================================================
       RESET
    ====================================================== */

    function reset() {

        stopAutoPlay();

        currentIndex = 0;

        opened = false;

        if (gallery) {

            gallery.style.display = "none";
            gallery.style.opacity = 0;

        }

    }

    /* ======================================================
       DISPOSE
    ====================================================== */

    function dispose() {

        stopAutoPlay();

        window.removeEventListener(
            "keydown",
            keyboardNavigation
        );

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        init,

        open,

        close,

        next,

        previous,

        goTo,

        addImage,

        removeImage,

        reset,

        dispose,

        get currentIndex() {

            return currentIndex;

        },

        get isOpen() {

            return opened;

        }

    };

})();
