import * as THREE from 'three';
import { GameState } from './GameState';
import { InstructionState } from './InstructionState';

export class HomeState {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.homeScreenElement = null;
        this.handleClick = this.handleClick.bind(this);
    }

    async enter() {
        try {
            this.homeScreenElement = document.createElement('div');
            this.homeScreenElement.style.position = 'fixed';
            this.homeScreenElement.style.top = '0';
            this.homeScreenElement.style.left = '0';
            this.homeScreenElement.style.width = '100%';
            this.homeScreenElement.style.height = '100%';
            this.homeScreenElement.style.zIndex = '1';
            this.homeScreenElement.style.pointerEvents = 'auto';
            this.homeScreenElement.style.background = 'linear-gradient(to bottom, #b8e0f2, #e0f7fa)'; // Set background as per provided HTML

            // Set the HTML structure (excluding <html>, <head>, and <body>)
            this.homeScreenElement.innerHTML = `
                <div class="snowflakes"></div>
                <div class="mountains-container">
                <!-- SVG Mountains -->
                <svg class="mountain" style="left: 5%" viewBox="0 0 200 300">
                    <!-- Mountain 1 -->
                    <path d="M20,280 L100,0 L180,280 Z" fill="#8b8b8b"/>
                    <path d="M100,0 L70,60 L130,60 Z" fill="#ffffff" fill-opacity="0.8"/>
                </svg>
                <svg class="mountain" style="left: 25%" viewBox="0 0 200 300">
                    <!-- Mountain 2 -->
                    <path d="M30,280 L100,10 L170,280 Z" fill="#909090"/>
                    <path d="M100,10 L80,70 L120,70 Z" fill="#ffffff" fill-opacity="0.8"/>
                </svg>
                <svg class="mountain" style="left: 45%" viewBox="0 0 200 300">
                    <!-- Mountain 3 -->
                    <path d="M20,280 L100,0 L180,280 Z" fill="#787878"/>
                    <path d="M100,0 L75,60 L125,60 Z" fill="#ffffff" fill-opacity="0.8"/>
                </svg>
                <svg class="mountain" style="left: 65%" viewBox="0 0 200 300">
                    <!-- Mountain 4 -->
                    <path d="M20,280 L100,10 L180,280 Z" fill="#848484"/>
                    <path d="M100,10 L80,70 L120,70 Z" fill="#ffffff" fill-opacity="0.8"/>
                </svg>
                <svg class="mountain" style="left: 85%" viewBox="0 0 200 300">
                    <!-- Mountain 5 -->
                    <path d="M20,280 L100,0 L180,280 Z" fill="#8e8e8e"/>
                    <path d="M100,0 L75,60 L125,60 Z" fill="#ffffff" fill-opacity="0.8"/>
                </svg>
            </div>

                <div class="title-banner">
                    <div class="chains">
                        <div class="chain"></div>
                        <div class="chain"></div>
                        <div class="chain"></div>
                        <div class="chain"></div>
                    </div>
                    <h1 class="title">Slide Park</h1>
                </div>

                <div class="mushroom-container">
                    <a href="#" class="mushroom">
                        <span class="mushroom-top">Exit</span>
                        <span class="mushroom-stem"></span>
                    </a>
                    <a href="#" class="mushroom">
                        <span class="mushroom-top">Instructions</span>
                        <span class="mushroom-stem"></span>
                    </a>
                    <a href="#" class="mushroom">
                        <span class="mushroom-top play">Play</span>
                        <span class="mushroom-stem"></span>
                    </a>
                    </a>
                </div>
            `;

            // Add styles
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                @keyframes fall {
                    0% { transform: translateY(-10vh) scale(1); opacity: 1; }
                    100% { transform: translateY(100vh) scale(0.5); opacity: 0; }
                }

                .snowflakes {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                }

                .snowflake {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0.8;
                    animation: fall linear infinite;
                }
                
                @import url('https://fonts.googleapis.com/css2?family=Griffy&display=swap');

                body {
                    margin: 0;
                    height: 100vh;
                    background: #b8c5b9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Griffy', cursive;
                    overflow: hidden;
                }

                .mountains-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                .mountain {
                    position: absolute;
                    bottom: 0;
                    width: 180px;
                    height: 280px;
                }

                .title-banner {
                    position: absolute;
                    top: 10%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ffffffcc;
                    padding: 20px 40px;
                    border-radius: 15px;
                    border: 4px solid #7393B3;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 60%;
                    min-width: 600px;
                    text-align: center;
                }

                .title-banner::before {
                    content: '';
                    position: absolute;
                    top: -25px;
                    left: 0;
                    right: 0;
                    height: 25px;
                    background: #A7C7E7;
                    border: 4px solid #7393B3;
                    border-bottom: none;
                    border-radius: 15px 15px 0 0;
                }

                .chains {
                    position: absolute;
                    top: -50px;
                    left: 15%;
                    right: 15%;
                    height: 50px;
                    display: flex;
                    justify-content: space-around;
                }

                .chain {
                    width: 6px;
                    height: 100%;
                    background: linear-gradient(to bottom, #999, #777);
                    border-radius: 2px;
                }

                .title {
                    margin: 0;
                    color: #443328;
                    font-size: 4.5em; /* Increased font size */
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    letter-spacing: 4px;
                }

                .mushroom-container {
                    position: absolute;
                    bottom: 15%;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: space-around;
                    padding: 0 10%; /* Adjusted padding for better spacing */
                }

                .mushroom {
                    text-decoration: none;
                    text-align: center;
                    color: #443328;
                    font-size: 2.5em; /* Increased font size for larger buttons */
                    font-family: 'Griffy', cursive;
                    transition: transform 0.3s ease;
                    position: relative;
                    animation: float 3s ease-in-out infinite;
                }

                .mushroom:nth-child(2) {
                    animation-delay: -1s;
                }

                .mushroom:nth-child(3) {
                    animation-delay: -2s;
                }

                .mushroom:hover {
                    transform: scale(1.2); /* Increased scale on hover for bigger effect */
                }

                .mushroom-top {
                    display: block;
                    background: #A7C7E7;
                    padding: 25px 70px; /* Increased padding for larger buttons */
                    border-radius: 60px 60px 0 0;
                    position: relative;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .mushroom-top.play {
                    background: #A7C7E7;
                }

                .mushroom-top:hover {
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }

                .mushroom-stem {
                    width: 40px; /* Increased width for larger buttons */
                    height: 60px; /* Increased height for larger buttons */
                    background: #d4b5a9;
                    margin: 0 auto;
                    border-radius: 0 0 12px 12px;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); } /* Increased float distance */
                }
            `;

            document.head.appendChild(styleElement);
            document.body.appendChild(this.homeScreenElement);

            this.createSnowflakes();

            // Add event listeners
            const mushrooms = this.homeScreenElement.querySelectorAll('.mushroom');
            mushrooms.forEach(mushroom => {
                mushroom.addEventListener('click', this.handleClick);
            });
        } catch (error) {
            console.error('Error creating homescreen:', error);
        }
    }

    createSnowflakes() {
        const snowflakes_container = this.homeScreenElement.querySelector('.snowflakes');
        const total_snowflakes = 50;

        for (let i = 0; i < total_snowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.animationDelay = `${Math.random() * 2}s`;
            snowflake.style.width = snowflake.style.height = `${Math.random() * 15 + 10}px`;
            snowflakes_container.appendChild(snowflake);
        }
    }

    handleClick(e) {
        e.preventDefault();
        const buttonText = e.currentTarget.querySelector('.mushroom-top').textContent.toLowerCase();

        switch(buttonText) {
            case 'play':
                console.log('Play clicked');
                this.stateManager.changeState(GameState, 1);
                break;
            case 'instructions':
                console.log('Instructions clicked');
                this.stateManager.changeState(InstructionState);
                // Implement instructions logic here
                break;
            case 'exit':
                console.log('Exit clicked');

                // Implement exit logic here
                alert("Press 'Ctrl + W' (Windows/Linux) or 'Cmd + W' (Mac) to close the tab.");
                break;
            default:
                console.log('Unknown button clicked:', buttonText);
        }
    }

    update() {
        //maybe later
    }

    exit() {
        //cleanup
        if (this.homeScreenElement) {
            // Remove event listeners
            const mushrooms = this.homeScreenElement.querySelectorAll('.mushroom');
            mushrooms.forEach(mushroom => {
                mushroom.removeEventListener('click', this.handleClick);
            });

            // Remove the element
            document.body.removeChild(this.homeScreenElement);
            this.homeScreenElement = null;

            // Remove the style element
            /*
            const style = document.querySelector('style');
            if (style) {
                document.head.removeChild(style);
            }
            */
        }
    }
}