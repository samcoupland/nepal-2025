// Fundraising data
let currentRaised = 650;
const target = 600;
const stretchTarget = 1000;

// Initialize the page
window.onload = function () {
	firstDisplay();

	setTimeout(() => {
		animateToAmount(currentRaised);

		// Check every 100ms until target reached
		const checkInterval = setInterval(() => {
			if (currentRaised >= target) {
				clearInterval(checkInterval); // stop checking
				startFireworks();
				document
					.getElementById("currentAmount")
					.classList.add("shimmer");
					setTimeout(() => {
						document.querySelectorAll('.hidden').forEach(el => {
							el.classList.remove('hidden');
						})
					}, 2000);
			}
		}, 100);
	}, 500);
};

function firstDisplay(params) {
	const amountElement = document.getElementById("currentAmount");
	const progressBar = document.getElementById("progressBar");
	const progressText = document.getElementById("progressText");
	const percentageText = document.getElementById("percentageText");

	// Update amount with animation
	amountElement.textContent = `£0`;

	// Calculate percentage
	let percentage = Math.round((currentRaised) / target * 100);
	
	let barPercentage = 0;

	// Update progress bar
	progressBar.style.width = barPercentage + "%";

	// Update text
	progressText.textContent = `£0 of £${target.toLocaleString()} target`;

	percentageText.textContent = "0%";
}

function updateDisplay() {
	const amountElement = document.getElementById("currentAmount");
	const progressBar = document.getElementById("progressBar");
	const progressText = document.getElementById("progressText");
	const percentageText = document.getElementById("percentageText");

	// Update amount with animation
	amountElement.textContent = `£${currentRaised.toLocaleString()}`;

	// Calculate percentage
	let percentage = Math.round(currentRaised / target * 100);

  let barPercentage = Math.round((currentRaised - target) / (stretchTarget - target) * 100);

	// Update progress bar
	progressBar.style.width = barPercentage + "%";

	// Update text
	progressText.textContent = `£${currentRaised.toLocaleString()} of £${target.toLocaleString()} target`;

	percentageText.textContent = Math.round(percentage) + "%";
}

function animateToAmount(targetAmount) {
	currentRaised = 0;
	const startAmount = 0;
	const duration = 2000; // 2 seconds
	const startTime = Date.now();

	function animate() {
		const elapsed = Date.now() - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Easing function for smooth animation
		const easeOutCubic = 1 - Math.pow(1 - progress, 3);

		currentRaised = Math.round(
			startAmount + (targetAmount - startAmount) * easeOutCubic
		);
		updateDisplay();

		if (progress < 1) {
			requestAnimationFrame(animate);
		}
	}

	animate();
}

document.addEventListener("DOMContentLoaded", function () {
	const infoBox = document.querySelectorAll(".info-box");

	infoBox.forEach((el) => {
		el.addEventListener("mouseleave", () => {
			el.style.transform = "none";
			el.classList.remove("hovered");
		});
	});

	infoBox.forEach((el) => {
		el.addEventListener("mouseenter", () => {
			const randomRotate = (Math.random() * 6 - 3).toFixed(2); // -3deg to +3deg
			const randomScale = (Math.random() * 0.1 + 1.02).toFixed(2); // 1.02 to 1.12
			el.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
			el.classList.add("hovered");
		});
	});
});

// Fireworks

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let animationId;
let fireworks = [];
let particles = [];
let isRunning = false;

// Resize canvas to fullscreen
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Firework class
class Firework {
	constructor(x, y, targetX, targetY) {
		this.x = x;
		this.y = y;
		this.targetX = targetX;
		this.targetY = targetY;
		this.distanceToTarget = Math.sqrt(
			(targetX - x) ** 2 + (targetY - y) ** 2
		);
		this.distanceTraveled = 0;
		this.coordinates = [];
		this.coordinateCount = 3;

		// Populate initial coordinates
		for (let i = 0; i < this.coordinateCount; i++) {
			this.coordinates.push([this.x, this.y]);
		}

		this.angle = Math.atan2(targetY - y, targetX - x);
		this.speed = 15;
		this.acceleration = 1.05;
		this.brightness = Math.random() * 50 + 50;
		this.targetRadius = 1;
	}

	update() {
		this.coordinates.pop();
		this.coordinates.unshift([this.x, this.y]);

		if (this.targetRadius < 8) {
			this.targetRadius += 0.3;
		} else {
			this.targetRadius = 1;
		}

		this.speed *= this.acceleration;

		const vx = Math.cos(this.angle) * this.speed;
		const vy = Math.sin(this.angle) * this.speed;
		this.distanceTraveled = Math.sqrt(
			(this.x + vx - this.targetX) ** 2 +
				(this.y + vy - this.targetY) ** 2
		);

		if (this.distanceTraveled >= this.distanceToTarget) {
			createParticles(this.targetX, this.targetY);
			fireworks.splice(fireworks.indexOf(this), 1);
		} else {
			this.x += vx;
			this.y += vy;
		}
	}

	draw() {
		ctx.beginPath();
		ctx.moveTo(
			this.coordinates[this.coordinates.length - 1][0],
			this.coordinates[this.coordinates.length - 1][1]
		);
		ctx.lineTo(this.x, this.y);
		ctx.strokeStyle = `hsl(${Math.random() * 60 + 300}, 100%, ${
			this.brightness
		}%)`;
		ctx.lineWidth = this.targetRadius;
		ctx.stroke();
	}
}

// Particle class
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.coordinates = [];
		this.coordinateCount = 5;

		for (let i = 0; i < this.coordinateCount; i++) {
			this.coordinates.push([this.x, this.y]);
		}

		this.angle = Math.random() * Math.PI * 2;
		this.speed = Math.random() * 10 + 1;
		this.friction = 0.95;
		this.gravity = 1;
		this.hue = Math.random() * 360;
		this.brightness = Math.random() * 80 + 50;
		this.alpha = 1;
		this.decay = Math.random() * 0.03 + 0.015;
	}

	update() {
		this.coordinates.pop();
		this.coordinates.unshift([this.x, this.y]);
		this.speed *= this.friction;
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed + this.gravity;
		this.alpha -= this.decay;

		if (this.alpha <= this.decay) {
			particles.splice(particles.indexOf(this), 1);
		}
	}

	draw() {
		ctx.beginPath();
		ctx.moveTo(
			this.coordinates[this.coordinates.length - 1][0],
			this.coordinates[this.coordinates.length - 1][1]
		);
		ctx.lineTo(this.x, this.y);
		ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
		ctx.lineWidth = Math.random() * 3 + 1;
		ctx.stroke();
	}
}

// Create particles when firework explodes
function createParticles(x, y) {
	const particleCount = Math.random() * 50 + 100;
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle(x, y));
	}
}

// Create random firework
function createFirework() {
	const startX = Math.random() * canvas.width;
	const startY = canvas.height;
	const targetX = Math.random() * canvas.width;
	const targetY = Math.random() * canvas.height * 0.5;

	fireworks.push(new Firework(startX, startY, targetX, targetY));
}

// Animation loop
function animate() {
	if (!isRunning) return;

	animationId = requestAnimationFrame(animate);

	// Create fade effect
	ctx.globalCompositeOperation = "destination-out";
	ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "lighter";

	// Create new fireworks randomly
	if (Math.random() < 0.05) {
		createFirework();
	}

	// Update and draw fireworks
	for (let i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].draw();
	}

	// Update and draw particles
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].draw();
	}
}

// Start fireworks show
function startFireworks() {
	if (isRunning) return;

	isRunning = true;
	animate();

	// Auto-stop after 8 seconds
	setTimeout(() => {
		stopFireworks();
	}, 6000);
}

// Stop fireworks
function stopFireworks() {
	isRunning = false;
	if (animationId) {
		cancelAnimationFrame(animationId);
	}

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Clear arrays
	fireworks = [];
	particles = [];
}

// Optional: Auto-start fireworks when page loads
// setTimeout(startFireworks, 1000);
