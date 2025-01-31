
// Create animated background circles
function createBackground() {
    const background = document.getElementById('background');
    const circles = 15;

    for (let i = 0; i < circles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        const size = Math.random() * 200 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;

        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${x}%`;
        circle.style.top = `${y}%`;
        circle.style.animationDuration = `${duration}s`;

        background.appendChild(circle);
    }
}

createBackground();
