// Fundraising data
let currentRaised = 60;
const target = 600;

// Initialize the page
window.onload = function() {
  firstDisplay();
    
    // Simulate gradual fundraising progress
    setTimeout(() => {
        animateToAmount(currentRaised);
    }, 500);
};

function firstDisplay(params) {
  const amountElement = document.getElementById('currentAmount');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const percentageText = document.getElementById('percentageText');
  
  // Update amount with animation
  amountElement.textContent = `£0`;
  
  // Calculate percentage
  let percentage = Math.min((currentRaised / target) * 100, 100);
  
  // Update progress bar
  progressBar.style.width = percentage + '%';
  
  // Update text
  progressText.textContent = `£0 of £${target.toLocaleString()} target`;

  percentageText.textContent = '0%';
}

function updateDisplay() {
    const amountElement = document.getElementById('currentAmount');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const percentageText = document.getElementById('percentageText');
    
    // Update amount with animation
    amountElement.textContent = `£${currentRaised.toLocaleString()}`;
    
    // Calculate percentage
    let percentage = Math.min((currentRaised / target) * 100, 100);
    
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