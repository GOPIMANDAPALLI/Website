// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


// Section Click Animation
document.querySelectorAll('.section').forEach(section => {
  section.addEventListener('click', () => {
    section.classList.add('active');
    setTimeout(() => section.classList.remove('active'), 800);
  });
});

// Chart.js Charts
new Chart(document.getElementById('ageChart'), {
  type: 'bar',
  data: {
    labels: ['10-18', '19-30', '31-45', '46+'],
    datasets: [{
      label: 'Respondents by Age',
      data: [11, 13, 10, 15],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350']
    }]
  }
});

new Chart(document.getElementById('deviceChart'), {
  type: 'pie',
  data: {
    labels: ['Mobile', 'Laptop', 'Tablet', 'Others'],
    datasets: [{
      data: [40, 15, 5, 5],
      backgroundColor: ['#29b6f6', '#ab47bc', '#ffa726', '#ef5350']
    }]
  }
});

new Chart(document.getElementById('usageChart'), {
  type: 'doughnut',
  data: {
    labels: ['Education', 'Communication', 'Entertainment', 'Business'],
    datasets: [{
      data: [15, 45, 30, 20],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350']
    }]
  }
});


// 3D Village
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc2e9fb);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/500, 0.1, 1000);
camera.position.set(0,5,15);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,500);
document.getElementById('three-village').appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor=0.05; controls.enableZoom=true;
scene.add(new THREE.AmbientLight(0xffffff,0.6));
const dirLight = new THREE.DirectionalLight(0xffffff,0.8);
dirLight.position.set(10,20,10);
scene.add(dirLight);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(50,50), new THREE.MeshPhongMaterial({color:0x88cc88}));
ground.rotation.x=-Math.PI/2; ground.position.y=0; scene.add(ground);

function createHouse(x,z){
  const house = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshPhongMaterial({color:0xff7043}));
  house.position.set(x,1,z);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.5,1,4), new THREE.MeshPhongMaterial({color:0xd32f2f}));
  roof.position.set(0,1.5,0); roof.rotation.y=Math.PI/4; house.add(roof);
  scene.add(house);
}
[[-5,-5],[5,-5],[-5,5],[5,5]].forEach(p=>createHouse(p[0],p[1]));

function createTree(x,z){
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,2,16), new THREE.MeshPhongMaterial({color:0x8b5a2b}));
  trunk.position.set(x,1,z);
  const leaves = new THREE.Mesh(new THREE.ConeGeometry(1.5,3,8), new THREE.MeshPhongMaterial({color:0x2e7d32}));
  leaves.position.set(0,2.5,0); trunk.add(leaves);
  scene.add(trunk);
}
[[0,-8],[-8,0],[8,0],[0,8]].forEach(p=>createTree(p[0],p[1]));

const globe = new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32), new THREE.MeshPhongMaterial({color:0x00c3ff, emissive:0x0077aa, emissiveIntensity:0.6}));
globe.position.set(0,2,0); scene.add(globe);

function animate(){
  requestAnimationFrame(animate);
  globe.rotation.y+=0.01;
  controls.update();
  renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/500;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,500);
});



