const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const initBtn = document.getElementById('init');
const distSelect = document.getElementById('distribution');

const POINT_COUNT = 100;
const DESIRED_DIST = 10;
const STEP_SIZE = 0.01; // learning rate
let points = [];
let running = false;

function initPoints() {
    const choice = distSelect.value;
    points = [];
    if (choice === 'random') {
        for (let i = 0; i < POINT_COUNT; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
    } else if (choice === 'elongated') {
        // elongated rectangle horizontally
        const rectWidth = canvas.width;
        const rectHeight = canvas.height / 5;
        for (let i = 0; i < POINT_COUNT; i++) {
            points.push({
                x: Math.random() * rectWidth,
                y: (canvas.height - rectHeight) / 2 + Math.random() * rectHeight
            });
        }
    } else if (choice === 'star') {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const arms = 5;
        const outerRadius = Math.min(canvas.width, canvas.height) / 3;
        for (let i = 0; i < POINT_COUNT; i++) {
            const arm = i % arms;
            const angle = (arm / arms) * 2 * Math.PI + Math.random() * (Math.PI / arms);
            const radius = outerRadius * (0.5 + Math.random() * 0.5);
            points.push({
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            });
        }
    }
    draw();
}

function step() {
    const forces = points.map(() => ({x:0, y:0}));
    for (let i = 0; i < POINT_COUNT; i++) {
        for (let j = i + 1; j < POINT_COUNT; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy) + 1e-6;
            const diff = dist - DESIRED_DIST;
            const force = 2 * diff / dist; // derivative
            forces[i].x += force * dx;
            forces[i].y += force * dy;
            forces[j].x -= force * dx;
            forces[j].y -= force * dy;
        }
    }
    for (let i = 0; i < POINT_COUNT; i++) {
        points[i].x -= STEP_SIZE * forces[i].x;
        points[i].y -= STEP_SIZE * forces[i].y;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#007acc';
    for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function loop() {
    if (!running) return;
    step();
    draw();
    requestAnimationFrame(loop);
}

startBtn.addEventListener('click', () => {
    if (!running) {
        running = true;
        startBtn.textContent = 'Stop Simulation';
        loop();
    } else {
        running = false;
        startBtn.textContent = 'Start Simulation';
    }
});

initBtn.addEventListener('click', () => {
    running = false;
    startBtn.textContent = 'Start Simulation';
    initPoints();
});

// initialize with default distribution
initPoints();
