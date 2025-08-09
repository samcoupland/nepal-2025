// Fundraising data
let currentRaised = 570;
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

document.addEventListener('DOMContentLoaded', function() {
    
    const infoBox = document.querySelectorAll('.info-box');
    
    infoBox.forEach((el) => {
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'none';
            el.classList.remove('hovered');
        });
    })  

    infoBox.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            const randomRotate = (Math.random() * 6 - 3).toFixed(2); // -3deg to +3deg
            const randomScale = (Math.random() * 0.1 + 1.02).toFixed(2); // 1.02 to 1.12
            el.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
            el.classList.add('hovered');
        }); 
    });
});
