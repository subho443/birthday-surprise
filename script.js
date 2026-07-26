<script src="threeScene.js"></script>
<script src="script.js"></script>
// ==========================
// ELEMENTS
// ==========================

const loading = document.getElementById("loading");
const gift = document.getElementById("gift");
const message = document.getElementById("message");
const gallery = document.getElementById("gallery");
const finalSection = document.getElementById("final");
const cakeSection = document.getElementById("cakeSection");

const galleryBtn = document.getElementById("galleryBtn");
const cakeBtn = document.getElementById("cakeBtn");
const wishBtn = document.getElementById("wishBtn");

const music = document.getElementById("music");
const typing = document.getElementById("typing");

// ==========================
// LOADING SCREEN
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        gsap.to("#loading", {

            opacity:0,
            duration:1,

            onComplete(){

                loading.style.display="none";

            }

        });

    },2500);

});

// ==========================
// LOVE LETTER
// ==========================

const text = `

Happy Birthday Samm ❤️

Today is all about celebrating you.

You are the smile that brightens my darkest days.

Thank you for entering my life.

Every moment with you feels magical.

I hope this little surprise makes you smile.

May your dreams come true.

May your heart always stay happy.

Stay the amazing person you are.

I promise to always cheer for you.

Happy Birthday once again ❤️

Love You Forever.

`;

let i = 0;

function typeWriter(){

    if(i < text.length){

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,35);

    }

}

// ==========================
// GIFT CLICK
// ==========================

gift.addEventListener("click",()=>{

    gift.classList.add("open");

    music.play();

    confetti({

        particleCount:250,

        spread:180,

        origin:{y:0.5}

    });

    setTimeout(()=>{

        message.classList.remove("hidden");

        message.scrollIntoView({

            behavior:"smooth"

        });

        typeWriter();

    },1800);

});

// ==========================
// GALLERY BUTTON
// ==========================

galleryBtn.addEventListener("click",()=>{

    gallery.classList.remove("hidden");

    gallery.scrollIntoView({

        behavior:"smooth"

    });

});

// ==========================
// CAKE
// ==========================

cakeBtn.addEventListener("click",()=>{

    cakeSection.classList.remove("hidden");

    cakeSection.scrollIntoView({

        behavior:"smooth"

    });

});

// ==========================
// WISH BUTTON
// ==========================

wishBtn.addEventListener("click",()=>{

    confetti({

        particleCount:400,

        spread:360,

        startVelocity:50

    });

    finalSection.classList.remove("hidden");

    finalSection.scrollIntoView({

        behavior:"smooth"

    });

});

// ==========================
// FLOATING HEARTS
// ==========================

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";

    heart.style.left=Math.random()*100+"vw";

    heart.style.bottom="-50px";

    heart.style.fontSize=Math.random()*20+20+"px";

    heart.style.pointerEvents="none";

    heart.style.zIndex="999";

    document.body.appendChild(heart);

    gsap.to(heart,{

        y:-window.innerHeight-200,

        x:Math.random()*200-100,

        rotation:360,

        duration:7,

        ease:"none",

        onComplete(){

            heart.remove();

        }

    });

}

setInterval(createHeart,700);

// ==========================
// PHOTO ANIMATION
// ==========================

const photos=document.querySelectorAll(".photos img");

photos.forEach(photo=>{

    photo.addEventListener("mouseenter",()=>{

        gsap.to(photo,{

            scale:1.08,

            duration:.3

        });

    });

    photo.addEventListener("mouseleave",()=>{

        gsap.to(photo,{

            scale:1,

            duration:.3

        });

    });

});

// ==========================
// BUTTON GLOW
// ==========================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        gsap.to(btn,{

            scale:1.08,

            duration:.3

        });

    });

    btn.addEventListener("mouseleave",()=>{

        gsap.to(btn,{

            scale:1,

            duration:.3

        });

    });

});

// ==========================
// PARALLAX
// ==========================

window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*20;

    const y=(e.clientY/window.innerHeight-.5)*20;

    gsap.to("#gift",{

        x:x,

        y:y,

        duration:.8

    });

});
