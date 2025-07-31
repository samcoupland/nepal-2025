
// Fundraising data
let currentRaised = 0;
const target = 2500;
const increment = 50;

// Initialize the page
window.onload = function() {
    // Start with £1000 as shown in the image
    currentRaised = 1000;
    updateDisplay();
    
    // Simulate gradual fundraising progress
    setTimeout(() => {
        animateToAmount(1000);
    }, 500);
};

function updateDisplay() {
    const amountElement = document.getElementById('currentAmount');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const percentageText = document.getElementById('percentageText');
    
    // Update amount with animation
    amountElement.textContent = `£${currentRaised.toLocaleString()}`;
    
    // Calculate percentage
    const percentage = Math.min((currentRaised / target) * 100, 100);
    
    // Update progress bar
    progressBar.style.width = percentage + '%';
    
    // Update text
    progressText.textContent = `£${currentRaised.toLocaleString()} of £${target.toLocaleString()} target`;
    percentageText.textContent = Math.round(percentage) + '%';
}

function animateToAmount(targetAmount) {
    const startAmount = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        currentRaised = Math.round(startAmount + (targetAmount - startAmount) * easeOutCubic);
        updateDisplay();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function handleDonation() {
    // Simulate a donation
    const donationAmount = Math.floor(Math.random() * 200) + 25; // Random donation between £25-£225
    const newTotal = Math.min(currentRaised + donationAmount, target);
    
    // Animate to new amount
    animateToAmount(newTotal);
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = `+£${donationAmount}!`;
    button.style.backgroundColor = 'var(--progress-fill)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = 'var(--button-color)';
    }, 1500);
}

function showInfo(type) {
    const messages = {
        nepal: "🏔️ Supporting communities in Nepal through sustainable development projects and disaster relief efforts.",
        village: "🏘️ Building essential infrastructure and providing resources for rural villages in need.",
        cycling: "🚴‍♂️ Cycling challenge to raise awareness and funds - every mile counts towards our goal!"
    };
    
    alert(messages[type]);
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click counter for fun
    let clickCount = 0;
    
    document.getElementById('currentAmount').addEventListener('click', function() {
        clickCount++;
        if (clickCount >= 5) {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
                this.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 500);
            }, 10);
            clickCount = 0;
        }
    });
});