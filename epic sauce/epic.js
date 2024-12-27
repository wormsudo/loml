const bgMusic = new Audio('audios/smithereens.mp3')
bgMusic.loop = true
bgMusic.play()

// Game scenes and choices
const scenes = {
    beginning: {
        text: '        ',
        choices: [
            {text: 'Hi :D', nextScene: 'start'}
        ]
    },

    start: {
        text: "Hiiiiiiii",
        choices: [
            { text: "hiiiiiiiiiii", nextScene: 'scene1' },
            { text: "heellloooooo", nextScene: 'scene1' }
        ]
    },

    start: {
        text: (() => {
            const today = new Date();
            const isDecember30 = today.getMonth() === 11 && today.getDate() === 30;
            
            if (isDecember30) {
                return `If I'm correct...TODAY IS OUR ANNIVERSARY!!!!!`;
            } else {
                return "So, if I'm correct today isn't our anniversary, it's on the 30th but ur still allowed to play this :)";
            }
        })(),
        choices: [
            { text: "YAYYYYY!!!!!!!!!!!!", nextScene: 'scene2' },
        ]
    },

    pre_scene: {
        text: "Before we start, I want to show you something special...",
        choices: [
            { text: "Show me ❤️", nextScene: 'special_scene' },
        ]
    },

    special_scene: {
        type: 'special',
        // Add your image paths here
        images: [
            '/path/to/image1.jpg',
            '/path/to/image2.jpg',
            '/path/to/image3.jpg',
            '/path/to/image4.jpg',
            '/path/to/image5.jpg'
        ]
    }
};

// Game state
let currentScene = 'start';
let isTyping = false;
let typeInterval = null;

// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create typing sound
const typingSound = new Audio('audios/keyboard.mp3');
let audioBuffer = null;

// Load and decode the audio file
fetch('audios/keyboard.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(decodedBuffer => {
        audioBuffer = decodedBuffer;
    })
    .catch(e => console.log('Error loading sound:', e));

// Get DOM elements
const gameText = document.getElementById('gameText');
const choicesArea = document.getElementById('choicesArea');
const specialScene = document.getElementById('specialScene');
const imageContainer = document.getElementById('imageContainer');
const finalText = document.getElementById('finalText');
const finalLetter = document.getElementById('finalLetter');

// Function to play pitched sound
function playTypeSound() {
    if (!audioBuffer) return;

    // Create audio source
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Create gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.35; // Adjust volume here

    // Set the pitch (playbackRate)
    source.playbackRate.value = 0.71; // Lower values = lower pitch (0.5 = one octave down)

    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Play the sound
    source.start(0);
}

// Resume audio context on user interaction (required by browsers)
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

// Function to display text with typewriter effect
function typeText(text) {
    isTyping = true;
    gameText.textContent = '';
    let index = 0;

    return new Promise((resolve) => {
        typeInterval = setInterval(() => {
            if (index < text.length) {
                const char = text[index];
                gameText.textContent += char;
                if (char !== ' ' && char !== '\n') {
                    playTypeSound();
                }
                index++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                resolve();
            }
        }, 50);
    });
}

// Function to handle the special scene
async function handleSpecialScene(scene) {
    // Hide main game container and show special scene
    document.querySelector('.game-container').style.display = 'none';
    specialScene.style.display = 'flex';

    // Create and add all images
    scene.images.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'transition-image';
        img.style.zIndex = index;
        imageContainer.appendChild(img);
    });

    // Get all images
    const images = document.querySelectorAll('.transition-image');
    
    // Function to handle image transitions
    for (let i = 0; i < images.length; i++) {
        await new Promise(resolve => {
            setTimeout(() => {
                // Fade out previous image if it exists
                if (i > 0) {
                    images[i-1].classList.remove('active');
                }
                // Fade in current image
                images[i].classList.add('active');
                resolve();
            }, i === 0 ? 0 : 10000); // 10 second delay between images
        });
    }

    // After all images, show final text
    await new Promise(resolve => {
        setTimeout(() => {
            finalText.classList.add('active');
            resolve();
        }, 2000);
    });

    // Show final letter
    await new Promise(resolve => {
        setTimeout(() => {
            finalLetter.style.display = 'block';
            setTimeout(() => {
                finalLetter.classList.add('active');
            }, 100);
            resolve();
        }, 4000);
    });
}

// Function to create choice buttons
function createChoices(choices) {
    choicesArea.innerHTML = '';
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = `> ${choice.text}`;
        button.addEventListener('click', () => handleChoice(choice.nextScene));
        choicesArea.appendChild(button);
    });
}

// Function to handle choice selection
async function handleChoice(nextScene) {
    if (scenes[nextScene] && !isTyping) {
        currentScene = nextScene;
        // Check if it's the special scene
        if (scenes[nextScene].type === 'special') {
            handleSpecialScene(scenes[nextScene]);
            return;
        }

        // Clear any existing interval
        if (typeInterval) {
            clearInterval(typeInterval);
        }
        // Hide choices while typing
        choicesArea.innerHTML = '';
        // Type new text and show new choices
        await typeText(scenes[currentScene].text);
        createChoices(scenes[currentScene].choices);
    }
}

// Start the game
handleChoice('beginning');