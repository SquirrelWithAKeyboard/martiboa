let questionIndex = 1;
let glitchLevel = 0;
let userLocation = "";

// Fetch the user's location based on their IP
function getUserLocation() {
    fetch('https://ipinfo.io/json?token=f9ce098250277a') // Replace with your own API token from ipinfo.io
        .then(response => response.json())
        .then(data => {
            userLocation = data.city || data.country; // Get the city or country
            startGame(); // Start the game after getting the location
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            userLocation = "Unknown"; // Fallback in case of error
            startGame(); // Start the game even if location fetch fails
        });
}

// Start the game after location data is fetched
function startGame() {
    nextQuestion();
}

// Function to ask questions and apply glitches
function nextQuestion() {
    const form = document.getElementById("endlessForm");
    
    // Hide current question and show next one
    const currentQuestion = document.getElementById(`question${questionIndex}`);
    currentQuestion.style.display = 'none';
    questionIndex++;
    
    // Show next question
    const nextQuestion = document.getElementById(`question${questionIndex}`);
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
    
    // Apply increasing glitch effect
    applyGlitchEffect();
    
    // Increase the glitch level as the form progresses
    glitchLevel++;
    
    // Add creepy location-based or disturbing question at certain points
    if (questionIndex === 3) {
        creepyLocationQuestion();
    } else if (questionIndex === 5) {
        creepyQuestionBasedOnLocation();
    }
}

// Function to apply glitch effect based on progression
function applyGlitchEffect() {
    const formContainer = document.querySelector(".form-container");
    
    // Apply different glitch levels based on progression
    if (glitchLevel < 5) {
        formContainer.classList.add('glitch');
    } else if (glitchLevel < 10) {
        formContainer.classList.remove('glitch');
        formContainer.classList.add('glitch-strong');
    } else {
        formContainer.classList.remove('glitch-strong');
        formContainer.classList.add('glitch-bad');
    }
    
    // Play audio glitch effect based on the progression
    playGlitchAudio();
}

// Function for creepy location-based question
function creepyLocationQuestion() {
    const feedbackDiv = document.getElementById('question3');
    const creepyQuestion = document.createElement('div');
    
    creepyQuestion.innerHTML = `
        <label for="locationFeedback">How’s the weather in ${userLocation}? 
        Seems kind of off, doesn’t it?</label>
        <input type="text" id="locationFeedback" name="locationFeedback">
    `;
    
    feedbackDiv.appendChild(creepyQuestion);
}

// Function for location-based creepy question based on progression
function creepyQuestionBasedOnLocation() {
    const feedbackDiv = document.getElementById('question4');
    const creepyQuestion = document.createElement('div');
    
    creepyQuestion.innerHTML = `
        <label for="locationCheck">Have you checked outside your window in ${userLocation}? 
        I think I saw something moving out there...</label>
        <input type="text" id="locationCheck" name="locationCheck">
    `;
    
    feedbackDiv.appendChild(creepyQuestion);
}

// Play audio glitch effect as the user progresses
function playGlitchAudio() {
    const audio = document.getElementById("glitchSound");
    if (glitchLevel > 5) {
        audio.play();
    }
}

// Handle form submission
const form = document.getElementById("endlessForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Move to the next question
    nextQuestion();
});

// Start the process by getting the user's location
getUserLocation();
