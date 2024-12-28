// Background music setup
let musicStarted = false;
const bgMusic = new Audio('audios/smithereens.mp3');
const receiveMessageSound = new Audio('audios/aol.mp3');
const sendMessageSound = new Audio('audios/send.mp3');
bgMusic.loop = true;

// Set initial volumes
bgMusic.volume = 0.5;
receiveMessageSound.volume = 1.0;  // Make sure it's audible
sendMessageSound.volume = 1.0;

function playMessageSound(type) {
    try {
        if (type === 'received') {
            // Clone the audio for overlapping sounds
            const sound = receiveMessageSound.cloneNode();
            sound.play();
        } else if (type === 'sent') {
            const sound = sendMessageSound.cloneNode();
            sound.play();
        }
    } catch (e) {
        console.log('Sound play failed:', e);
    }
}

receiveMessageSound.load();
sendMessageSound.load();

// Message sequence before main game
const messageSequence = {
    start: {
        messages: [
            { type: 'received', text: "hi love 🥺🥺🥺" },
            { type: 'received', text: "i lowkey got smth important to tell u" }
        ],
        choices: [
            { 
                text: "what is it", 
                response: "what is it",
                nextScene: 'msg2' 
            },
            { 
                text: "omg what", 
                response: "omg what",
                nextScene: 'msg2' 
            }
        ]
    },
    msg2: {
        messages: [
            { type: 'received', text: "you know that one like" },
            { type: 'received', text: "really really fancy place down the street" },
            { type: 'received', text: "i yknow" },
            { type: 'received', text: "lowkey would like to take u there tonight" },
            { type: 'received', text: "🥺" }
        ],
        choices: [
            { 
                text: "omg what when", 
                response: "omg what when",
                nextScene: 'msg3' 
            },
            { 
                text: "woah that place is so fancy", 
                response: "woah that place is so fancy",
                nextScene: 'msg4' 
                
            }
        ]
    },
    msg3: {
        messages: [
            { type: 'received', text: "reservation is in two hours" },
            
        ],
        choices: [
            { 
                text: "coulda given a longer heads up 😭", 
                response: "coulda given a longer heads up 😭",
                nextScene: 'apolo' 
            },
            { 
                text: "ok uhh thats soon i need to get ready", 
                response: "ok uhh thats soon i need to get ready",
                nextScene: 'ready' 
                
            }
        ]
    },
    apolo: {
        messages: [
            { type: 'received', text: "my apolocheese" },
            { type: 'received', text: "ily" },
            
        ],
        choices: [
            { 
                text: "its ok ily i just need to get ready", 
                response: "its ok ily i just need to get ready",
                nextScene: 'ready' 
            },
            { 
                text: "dw ily i'll get ready soon", 
                response: "dw ily i'll get ready soon",
                nextScene: 'ready' 
            }
        ]
    },
    msg4: {
        messages: [
            { type: 'received', text: "i knowwwwww" },
            { type: 'received', text: "its lowkey so fancy it'll be a very special dinner trust" }
            
        ],
        choices: [
            { 
                text: "awe ok i need to get ready then", 
                response: "awe ok i need to get ready then",
                nextScene: 'ready' 
            },
            { 
                text: "awe im sure it'll be really special there", 
                response: "awe im sure it'll be really special there",
                nextScene: 'ready' 
            }
        ]
    },
    ready: {
        messages: [
            { type: 'received', text: "yes yes dress fancy" },
            { type: 'received', text: "ill be home in like half an hour ilysm" },
            
        ],
        choices: [
            { 
                text: "ok drive safe ily", 
                response: "ok drive safe ily",
                nextScene: 'start_game' 
            },
            { 
                text: "ok bye bye ily", 
                response: "ok bye bye ily",
                nextScene: 'start_game' 
            }
        ]
    }
};

function scrollToBottom() {
    const container = document.getElementById('messagesContainer');
    // Force immediate scroll to bottom
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100); // Small delay to ensure message is rendered
}

// Main game scenes
const scenes = {

    // intro scenes
    start: {
        text: "Your journey begins in your quaint, pretty apartment.",
        choices: [
            { text: "I wonder why he's so suddenly having us go to such a fancy place like this.", nextScene: 'suspicious' },
            { text: "Better start getting ready.", nextScene: 'choose_outfit' }
        ]
    },

    suspicious: {
        text: "Because come to come to think of it, he has been acting a bit strange lately. That one time he was secretive about what he was bringing home, the weird phone calls he was making...",
        choices: [
            { text: "Could it be...?", nextScene: 'realization' },
            { text: "Better start getting ready.", nextScene: 'choose_outfit' }
        ]
    },

    realization: {
        text: "Well whatever it is, I wonder if this dinner has anything to do with it.",
        choices: [
            { text: "Better start getting ready.", nextScene: 'choose_outfit' }
        ]
    },

    // connected 1
    choose_outfit: {
        text: "As you prepare your pretty outfit, he opens the front door and walks into the house. He walks into the room and sees you, looking in awe, wearing your beautiful date outfit.",
        choices: [
            { text: "'hiiii'", nextScene: 'response1' },
            { text: "'erm what're you lookin at'", nextScene: 'response2' }
        ]
    },

    response1: {
        text: "'Hiiii', he says. He heads over the wardrobe to quickly get together his outfit and get dressed all fancy.",
        choices: [
            { text: "Ask about why the sudden fancy dinner.", nextScene: 'question' },
            { text: "Continue getting ready.", nextScene: 'ready' }
        ]
    },

    response2: {
        text: "'At your pretty self obviously 🥰, love you'",
        choices: [
            { text: "'awe, love you too'", nextScene: 'ready' },
            { text: "Continue getting ready.", nextScene: 'ready' }
        ]
    },

    question: {
        text: "He smiles slightly and assures you that 'you'll see.'",
        choices: [
            { text: "Continue getting ready.", nextScene: 'ready' }
        ]
    },

    // connected 2
    ready: {
        text: "He smiles slightly and assures you that 'you'll see.'",
        choices: [
            { text: "Continue getting ready.", nextScene: 'ready' }
        ]
    },

    // Add more scenes here...

    special_scene: {
        type: 'special',
        images: [
            'path/to/image1.jpg',
            'path/to/image2.jpg',
            'path/to/image3.jpg',
            'path/to/image4.jpg',
            'path/to/image5.jpg'
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
const phoneInterface = document.getElementById('phoneInterface');
const gameInterface = document.getElementById('gameInterface');
const messagesContainer = document.getElementById('messagesContainer');
const messageChoices = document.getElementById('messageChoices');

// Function to display messages
async function displayMessages(scene) {
    const messages = messageSequence[scene].messages;
    
    for (let message of messages) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type} fade-in`;
        messageDiv.textContent = message.text;
        messagesContainer.appendChild(messageDiv);
        
        // Ensure message is visible
        scrollToBottom();
        // Wait for scroll and animation
        await new Promise(resolve => setTimeout(resolve, 200));
        
        playMessageSound('received');
    }
    
    displayMessageChoices(messageSequence[scene].choices);
}

// Function to display message choices
function displayMessageChoices(choices) {
    messageChoices.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'message-choice fade-in';
        button.textContent = choice.text;
        button.addEventListener('click', () => handleMessageChoice(choice), { once: true });
        messageChoices.appendChild(button);
    });
}

// Function to handle message choices
async function handleMessageChoice(choice) {
    // Disable all choice buttons immediately
    const buttons = document.querySelectorAll('.message-choice');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });

    // Display user's response with send sound
    const responseDiv = document.createElement('div');
    responseDiv.className = 'message sent fade-in';
    responseDiv.textContent = choice.response;
    messagesContainer.appendChild(responseDiv);
    
    // Scroll after sending message
    scrollToBottom();
    
    playMessageSound('sent');

    // Wait a moment before continuing
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (choice.nextScene === 'start_game') {
        await transitionToGame();
        return;
    }

    displayMessages(choice.nextScene);
}

// Function to transition to main game
async function transitionToGame() {
    // Only start music if it hasn't been started yet
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log('Music play failed:', e));
        musicStarted = true;
    }
    
    phoneInterface.style.transition = 'opacity 1s';
    phoneInterface.style.opacity = '0';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    phoneInterface.style.display = 'none';
    gameInterface.style.display = 'flex';
    
    handleChoice('start');
}

// Function to play pitched sound
function playTypeSound() {
    if (!audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.35;
    source.playbackRate.value = 0.71;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
}

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

// Resume audio context on user interaction (required by browsers)
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

// Start the game with the message sequence
window.onload = async () => {
    // Add initial fade-in to phone interface
    phoneInterface.classList.add('fade-in');
    
    // Wait a moment before starting messages
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Start with message sequence
    displayMessages('start');
};