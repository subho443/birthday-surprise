// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create floating particles (hearts effect substitute)
const geometry = new THREE.SphereGeometry(0.2, 16, 16);

const material = new THREE.MeshBasicMaterial({ color: 0xff4d6d });

const hearts = [];

for (let i = 0; i < 200; i++) {
  const heart = new THREE.Mesh(geometry, material);
  
  heart.position.x = (Math.random() - 0.5) * 20;
  heart.position.y = (Math.random() - 0.5) * 20;
  heart.position.z = (Math.random() - 0.5) * 20;

  scene.add(heart);
  hearts.push(heart);
}

camera.position.z = 10;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  hearts.forEach(h => {
    h.rotation.x += 0.01;
    h.rotation.y += 0.01;
    h.position.y += 0.01;

    if (h.position.y > 10) {
      h.position.y = -10;
    }
  });

  renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
