// Set initial time (5 minutes)
const initialTime = 5 * 60;
let timeLeft = initialTime;

// Select the h1 element
const timerElement = document.getElementById('timer');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = `Time left until next match: ${formatTime(timeLeft)}`;
    } else {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
    }
}

function changeColor() {
    timerElement.style.color = getRandomColor();
}

const timerInterval = setInterval(updateTimer, 1000);

const colorInterval = setInterval(changeColor, 1000);

document.getElementById('timer').addEventListener('click', function(event) {
    event.stopPropagation(); //stop the event from bubbling up
    const target = event.target;
    const currentTarget = event.currentTarget;

    if (target === timerElement) {
        console.log('Clicked on the timer!');
        timerElement.classList.toggle('highlight');

        const computedStyle = window.getComputedStyle(timerElement);
        console.log('Current timer color:', computedStyle.color);
    }

    if (currentTarget === this) {
        console.log('Clicked on the #timer h1!');
    }
});

//modificare evenimentelor de la mouse 
document.querySelectorAll('.team-logo').forEach(logo => {
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'scale(1.25)';
    });

    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'scale(1)';
    });
});

