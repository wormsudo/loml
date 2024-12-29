// Background music setup
let musicStarted = false;

const bgMusic = new Audio('audios/smhwak.mp3');
const receiveMessageSound = new Audio('audios/aol.mp3');
const sendMessageSound = new Audio('audios/send.mp3');
const specialSceneMusic = new Audio('audios/geetar.mp3');  // Replace with your special song file
specialSceneMusic.loop = false;
specialSceneMusic.volume = 0.1;
bgMusic.loop = true;
bgMusic.volume = 0.05;
receiveMessageSound.volume = 1.0;
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
        text: "Because come to think of it, he has been acting a bit strange lately.",
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
        text: "You two head over to the fancy restauraunt and take your seats.",
        choices: [
            { text: "Wow... this place is really fancy.", nextScene: 'order' },
            { text: "Take a look at the menu.", nextScene: 'order' }
        ]
    },

    order: {
        text: "He assures you not to hold back on getting the fanciest meals they have.",
        choices: [
            { text: "Order your food.", nextScene: 'order1' }
        ]
    },

    order1: {
        text: "You two order your food, sitting and chatting in the meantime. And before you know it, your meals have arrived, freshly hot from preparation. They look absolutely delicious.",
        choices: [
            { text: "Dig in.", nextScene: 'pay' }
        ]
    },

    pay: {
        text: "You two finish the meal and he pays the check. You two soon head on your way out.",
        choices: [
            { text: "That meal was amazing..", nextScene: 'butwait' },
            { text: "Their food was pretty good, can't wait to get home and rest.", nextScene: 'butwait' }
        ]
    },

    butwait: {
        text: "'I absolutely loved that place, but that's not all there is for tonight.'",
        choices: [
            { text: "What?", nextScene: 'youllsee' },
            { text: "What why? I'm literally just a girl 🎀", nextScene: 'youllsee' }
        ]
    },

    youllsee: {
        text: "'Come on, there's some place near here I'd like to take you real quick.'",
        choices: [
            { text: "Okay...", nextScene: 'where' },
            { text: "Where are we going?", nextScene: 'where' }
        ]
    },

    where: {
        text: "'Don't worry, I promise it'll be worth it.'",
        choices: [
            { text: "Go with him.", nextScene: 'drive' }
        ]
    },

    drive: {
        text: "You two pull up to a beautiful cliffside view. You overlook endless trees that are illuminated by the beauty of all the stars in the sky.",
        choices: [
            { text: "Take in the beautiful view.", nextScene: 'view' }
        ]
    },

    view: {
        text: "It's a beautiful view. You bask in the gorgeous rows of trees and stars in the horizon. You look to your side only to find nobody there. You turn to your other side to only find it also empty.",
        choices: [
            { text: "What?", nextScene: 'what' }
        ]
    },

    what: {
        text: "You turn around to see him on one knee. In his hands, he has an opened ring box containing the most beautiful diamond studded ring you could ever imagine.",
        choices: [
            { text: "...", nextScene: 'proposal' }
        ]
    },

    proposal: {
        text: "'You've changed my life in every way for the better. For as long as I've known you, you've made my life something worthwhile and every second that I'm with you I only dream for more. I want to spend my life with you. So...'",
        choices: [
            { text: "...", nextScene: 'proposal1' }
        ]
    },

    proposal1: {
        text: "'Will you marry me?'",
        choices: [], // Empty choices since we're using custom input
        render: (container) => {
            // Create input container
            const inputContainer = document.createElement('div');
            inputContainer.className = 'proposal-input-container';
    
            // Create text input
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'proposal-input';
            input.placeholder = 'Type your answer...';
            input.autocomplete = 'off';
    
            // Create invalid text
            const invalidText = document.createElement('div');
            invalidText.className = 'invalid-text';
            invalidText.textContent = 'invalid input';
    
            // Add input handler
            input.addEventListener('input', (e) => {
                const value = e.target.value.toLowerCase();
                
                // Show invalid text if something is typed and it's not heading towards "yes"
                if (value && !'yes'.startsWith(value)) {
                    invalidText.classList.add('show');
                } else {
                    invalidText.classList.remove('show');
                }
    
                // If they type "yes", proceed to next scene
                if (value === 'yes') {
                    input.disabled = true;
                    setTimeout(() => {
                        handleChoice('final_scene');
                    }, 500);
                }
            });
    
            // Append elements
            inputContainer.appendChild(input);
            inputContainer.appendChild(invalidText);
            container.appendChild(inputContainer);
    
            // Focus input
            setTimeout(() => input.focus(), 100);
        }
    },

    final_scene: {
        text: "You rush towards him as he slips the ring on your finger. You two immediately hug with the greatest affection in the world and then give each other a kiss. ",
        choices: [
            { text: "...", nextScene: 'special_scene' }
        ]
    },

    // Add more scenes here...

    special_scene: {
        type: 'special',
        images: [
            'images/image1.jpg',
            'images/image2.jpg',
            'images/image3.jpg',
            'images/image4.jpg',
            'images/image5.jpg'
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
    // Fade out current music and switch to special music
    const fadeOut = setInterval(() => {
        if (bgMusic.volume > 0.1) {
            bgMusic.volume -= 0.1;
        } else {
            clearInterval(fadeOut);
            bgMusic.pause();
            bgMusic.currentTime = 0;
            // Start special music with fade in
            specialSceneMusic.volume = 0;
            specialSceneMusic.play();
            const fadeIn = setInterval(() => {
                if (specialSceneMusic.volume < 0.2) {
                    specialSceneMusic.volume += 0.1;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        }
    }, 100);

    // Hide main game container with a smooth fade out
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.transition = 'opacity 2s';
    gameContainer.style.opacity = '0';
    
    // Wait for fade out before hiding and showing special scene
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    gameContainer.style.display = 'none';
    specialScene.style.display = 'flex';

    // Add a small delay before starting images
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    // After all images, show final text with longer display time
    await new Promise(resolve => {
        setTimeout(() => {
            finalText.classList.add('active');
            resolve();
        }, 2000);
    });

    // Wait longer on the final text before showing letter (increased to 6 seconds)
    await new Promise(resolve => setTimeout(resolve, 6000));

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
        button.style.setProperty('--index', index); // For staggered animation
        button.addEventListener('click', () => handleChoice(choice.nextScene));
        choicesArea.appendChild(button);
    });
}

// Function to handle choice selection
async function handleChoice(nextScene) {
    if (scenes[nextScene] && !isTyping) {
        // Immediately disable all choice buttons
        const currentButtons = choicesArea.querySelectorAll('.choice-button');
        currentButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'default';
        });

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

        // Add fade-out animation to current text and choices
        gameText.classList.add('fade-out');
        currentButtons.forEach(button => button.classList.add('fade-out'));

        // Wait for fade-out animation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Clear content
        choicesArea.innerHTML = '';
        gameText.textContent = '';
        
        // Remove fade-out class and reset opacity
        gameText.classList.remove('fade-out');
        
        // Type new text and show new choices
        await typeText(scenes[currentScene].text);
        
        // Check if scene has custom render
        if (scenes[currentScene].render) {
            scenes[currentScene].render(choicesArea);
        } else {
            createChoices(scenes[currentScene].choices);
        }
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