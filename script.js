// Quantum Engine 🚀
const silaJokes = [
    "Sıla o kadar hızlı koşar ki... Gölgesi yetişemez!",
    "Sıla'nın boyunu ölçmek için hangi alet? Mikroskop!",
    "Sıla uçakta nereye oturur? Pilotun kulağına!",
    "Sıla'nın favori sporu? Yüksek atlama (ama zıplamadan!)"
];

// Sistem Başlatıcı
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    init3DCharacter();
    loadPreferences();
    initHeatMap();
});

// 3B Karakter Sistemi (Three.js Entegrasyonu)
function init3DCharacter() {
    const container = document.getElementById('sila3d');
    container.style.height = '300px';

    // Three.js Sahne Kurulumu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Karakter Modeli
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
    const silaMesh = new THREE.Mesh(geometry, material);
    scene.add(silaMesh);

    // Işıklandırma
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    // Animasyon Loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Karakter Kontrolleri
    window.dance = () => {
        new TWEEN.Tween(silaMesh.rotation)
            .to({ y: Math.PI * 2 }, 2000)
            .repeat(Infinity)
            .start();
    };

    window.jump = () => {
        new TWEEN.Tween(silaMesh.position)
            .to({ y: 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out)
            .chain(
                new TWEEN.Tween(silaMesh.position)
                .to({ y: 0 }, 300)
                .easing(TWEEN.Easing.Quadratic.In)
            )
            .start();
    };
}

// Oyun Motoru
function startGame(type) {
    switch(type) {
        case 'zurafa':
            startZurafaRace();
            break;
        case 'merdiven':
            startClimbing();
            break;
        case 'konfetti':
            startConfettiStorm();
            break;
    }
}

// Merdiven Tırmanma Oyunu
function startClimbing() {
    const climbMap = document.getElementById('climbMap');
    climbMap.innerHTML = '';
    let currentStep = 0;

    for(let i = 0; i < 10; i++) {
        const step = document.createElement('div');
        step.className = 'climb-step';
        step.onclick = () => {
            if(i === currentStep) {
                step.style.background = '#00ff00';
                currentStep++;
                if(currentStep === 10) {
                    alert('Tebrikler! Zirveye ulaştın! 🏔️');
                }
            }
        };
        climbMap.appendChild(step);
    }
}

// Konfetti Fırtınası
function startConfettiStorm() {
    let count = 0;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    const storm = setInterval(() => {
        for(let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                left: ${Math.random() * 100}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti-fall ${2 + Math.random() * 3}s linear;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
        
        count += 5;
        document.getElementById('confettiCount').textContent = count;
        if(count > 150) clearInterval(storm);
    }, 50);
}

// Isı Haritası İzleyici
function initHeatMap() {
    document.addEventListener('mousemove', (e) => {
        const heat = document.createElement('div');
        heat.className = 'heat-spot';
        heat.style.left = e.pageX + 'px';
        heat.style.top = e.pageY + 'px';
        document.body.appendChild(heat);
        
        setTimeout(() => heat.remove(), 1000);
    });
}

// Kullanıcı Tercihleri
function loadPreferences() {
    if(localStorage.getItem('musicPref') === 'on') {
        toggleMusic();
    }
}

// CSS Animasyonları (style.css'e eklenmeli)
/*
.confetti {
    position: fixed;
    width: 8px;
    height: 8px;
    z-index: 9999;
}

@keyframes confetti-fall {
    0% { top: -10px; transform: rotate(0deg); }
    100% { top: 100vh; transform: rotate(720deg); }
}

.heat-spot {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255,0,0,0.3);
    border-radius: 50%;
    pointer-events: none;
}
*/
