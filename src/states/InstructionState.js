import * as THREE from 'three';
import { HomeState } from './HomeState';

export class InstructionState {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.homeScreenElement = null;
        this.handleClick = this.handleClick.bind(this);
    }

    // Mountain template generation
    getMountainTemplate(position, mountainConfig) {
        return `
        <svg class="mountain" style="left: ${position}%" viewBox="0 0 200 300">
            <!-- Mountain: high peak with snow cap -->
            <path d="M20,280 L100,0 L180,280 Z" fill="${mountainConfig.color1}"/>
            <path d="M100,0 L70,60 L130,60 Z" fill="#ffffff" fill-opacity="0.8"/>
        </svg>
    `;
    }

    createMountainsContainer() {
        const mountainConfigs = [
            { position: 10, color1: '#8b8b8b' },
            { position: 30, color1: '#909090' },
            { position: 50, color1: '#787878' },
            { position: 70, color1: '#848484' },
            { position: 90, color1: '#8e8e8e' }
        ];

        return `
        <div class="mountains-container">
            ${mountainConfigs.map(config => this.getMountainTemplate(config.position, config)).join('')}
        </div>
    `;
    }

    // Icon generators
    getMovementIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M50 10 L65 35 H35 Z" fill="#443328"/>
                <path d="M90 50 L65 65 V35 Z" fill="#443328"/>
                <path d="M50 90 L35 65 H65 Z" fill="#443328"/>
                <path d="M10 50 L35 35 V65 Z" fill="#443328"/>
            </svg>
        `;
    }

    getAttackIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M20 50 L80 50 L70 40 L80 50 L70 60" fill="none" stroke="#443328" stroke-width="4"/>
                <circle cx="85" cy="50" r="6" fill="#ff4d4d"/>
            </svg>
        `;
    }

    getJumpIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M50 80 Q50 30 80 30" fill="none" stroke="#443328" stroke-width="4"/>
                <circle cx="85" cy="30" r="6" fill="#ff4d4d"/>
                <path d="M20 80 L80 80" stroke="#443328" stroke-width="4"/>
            </svg>
        `;
    }

    getDashAttackIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M20 50 L70 50" stroke="#443328" stroke-width="4" stroke-dasharray="4,4"/>
                <circle cx="75" cy="50" r="6" fill="#ff4d4d"/>
                <path d="M60 30 L70 50 L60 70" fill="none" stroke="#443328" stroke-width="4"/>
            </svg>
        `;
    }

    getPickupIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M30 60 Q50 20 70 60" fill="none" stroke="#443328" stroke-width="4"/>
                <rect x="45" y="60" width="10" height="20" fill="#443328"/>
            </svg>
        `;
    }

    getResetIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <path d="M30 30 A30 30 0 1 1 30 70" fill="none" stroke="#443328" stroke-width="4"/>
                <path d="M30 30 L15 30 L30 15" fill="none" stroke="#443328" stroke-width="4"/>
            </svg>
        `;
    }

    getPauseIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <rect x="30" y="25" width="10" height="50" fill="#443328"/>
                <rect x="60" y="25" width="10" height="50" fill="#443328"/>
            </svg>
        `;
    }

    // New Icon Generator for Jump + Attack
    getJumpAttackIcon() {
        return `
            <svg viewBox="0 0 100 100" width="40" height="40">
            </svg>
        `;
    }

    // Main content generator
    getInstructionsContent() {
        return `
            <div class="instruction-sections">
                <div class="instruction-section">
                    <div class="section-icon">${this.getMovementIcon()}</div>
                    <div class="section-content">
                        <h3>Basic Movement</h3>
                        <p>Use <span class="key">W</span><span class="key">A</span><span class="key">S</span><span class="key">D</span> keys to move your character.</p>
                    </div>
                </div>
                <div class="instruction-section">
                    <div class="section-icon">${this.getMovementIcon()}</div>
                    <div class="section-content">
                        <h3>Basic Camera Movement</h3>
                        <p>Use your mouse to position your camera.</p>
                    </div>
                </div>

                <div class="instruction-section">
                    <div class="section-icon">${this.getJumpIcon()}</div>
                    <div class="section-content">
                        <h3>Jump</h3>
                        <p>Press the <span class="key">Space bar</span> to make your character jump.</p>
                    </div>
                </div>
                <div class="instruction-section">
                    <div class="section-icon">${this.getDashAttackIcon()}</div>
                    <div class="section-content">
                        <h3>Slide Toggle</h3>
                        <p>Press <span class="key">J</span> to go into Sliding mode.</p>
                    </div>
                </div>

                <div class="instruction-section">
                    <div class="section-icon">${this.getResetIcon()}</div>
                    <div class="section-content">
                        <h3>Reset Level</h3>
                        <p>Press <span class="key">R</span> to reset the current level.</p>
                    </div>
                </div>

                <div class="instruction-section">
                    <div class="section-icon">${this.getPauseIcon()}</div>
                    <div class="section-content">
                        <h3>Pause Game</h3>
                        <p>Press <span class="key">Escape</span> to pause the game.</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Style generators
    getStyles() {
        return `
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
                opacity: 0.7;
            }

            .mountain {
                position: absolute;
                bottom: 0;
                width: 120px;
                height: 200px;
                transform: scale(0.8);
            }

            .content-container {
                position: absolute;
                top: 5%;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 90%;
                max-width: 1000px;
                text-align: center;
            }

            .title-banner {
                position: relative;
                margin-bottom: 20px;
                background: #ffffffcc;
                padding: 20px 80px;
                border-radius: 10px;
                border: 3px solid #7393B3;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                width: 100%;
                max-width: 800px;
                text-align: center;
            }

            .instructions-box {
                background: #A7C7E7;
                padding: 20px;
                border-radius: 10px;
                border: 3px solid #b39c94;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                color: #443328;
                width: 100%;
                box-sizing: border-box;
            }

            .instruction-sections {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 15px;
                padding: 10px;
            }

            .instruction-section {
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.15);
                padding: 15px;
                border-radius: 8px;
                transition: transform 0.2s, background 0.2s;
            }

            .instruction-section:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.25);
            }

            .section-icon {
                flex-shrink: 0;
                margin-right: 15px;
            }

            .section-content {
                text-align: left;
            }

            .section-content h3 {
                margin: 0 0 5px 0;
                font-size: 1.2em;
                color: #443328;
            }

            .section-content p {
                margin: 0;
                font-size: 1em;
                line-height: 1.3;
            }

            .key {
                display: inline-block;
                padding: 3px 8px;
                margin: 0 3px;
                background: #443328;
                color: #e8c4b8;
                border-radius: 4px;
                font-size: 0.8em;
                font-weight: bold;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            }

            .title-banner::before {
                content: '';
                position: absolute;
                top: -15px;
                left: 10%;
                right: 10%;
                height: 15px;
                background: #ffffffcc;
                border: 3px solid #7393B3;
                border-bottom: none;
                border-radius: 10px 10px 0 0;
            }

            .chains {
                position: absolute;
                top: -35px;
                left: 20%;
                right: 20%;
                height: 35px;
                display: flex;
                justify-content: space-around;
            }

            .chain {
                width: 4px;
                height: 100%;
                background: linear-gradient(to bottom, #999, #777);
                border-radius: 2px;
            }

            .title {
                margin: 0;
                color: #443328;
                font-size: 3em;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                letter-spacing: 2px;
            }

            .mushroom-container {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                padding: 10px;
            }

            .mushroom {
                text-decoration: none;
                text-align: center;
                color: #443328;
                font-size: 2em;
                font-family: 'Griffy', cursive;
                transition: transform 0.3s ease;
                position: relative;
                animation: float 3s ease-in-out infinite;
            }

            .mushroom:hover {
                transform: scale(1.1);
            }

            .mushroom-top {
                display: block;
                background: #ff4d4d;
                padding: 15px 50px;
                border-radius: 50px 50px 0 0;
                position: relative;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }

            .mushroom-top:hover {
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            }

            .mushroom-stem {
                width: 30px;
                height: 45px;
                background: #d4b5a9;
                margin: 0 auto;
                border-radius: 0 0 8px 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            /* Responsive Adjustments */
            @media (max-width: 768px) {
                .title {
                    font-size: 2.5em;
                }

                .instruction-sections {
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 10px;
                }

                .section-icon {
                    margin-right: 10px;
                }

                .section-content h3 {
                    font-size: 1em;
                }

                .section-content p {
                    font-size: 0.9em;
                }

                .key {
                    padding: 2px 6px;
                    margin: 0 2px;
                    font-size: 0.7em;
                }

                .mushroom-top {
                    padding: 10px 40px;
                }

                .mushroom-stem {
                    width: 25px;
                    height: 35px;
                }
            }
        `;
    }

    // State management methods
    async enter() {
        try {
            this.homeScreenElement = document.createElement('div');
            Object.assign(this.homeScreenElement.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '1',
                pointerEvents: 'auto',
                background: 'linear-gradient(to bottom, #b8e0f2, #e0f7fa)'
            });

            this.homeScreenElement.innerHTML = `
                <div class="snowflakes"></div>
                ${this.createMountainsContainer()}
                <div class="content-container">
                    <div class="title-banner">
                        <div class="chains">
                            ${Array(3).fill('<div class="chain"></div>').join('')}
                        </div>
                        <h1 class="title">Instructions</h1>
                        <div class="instructions-box">
                            ${this.getInstructionsContent()}
                        </div>
                        <div class="return-button">
                            <a href="#" class="mushroom">
                                <span class="mushroom-top play">Return to Home</span>
                                <span class="mushroom-stem"></span>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            // Update styles
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                ${this.getStyles()}
                
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
                .return-button {
                    position: absolute;
                    bottom: -50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }

                .title-banner {
                    position: relative;
                    margin-bottom: 30px;
                }

                .instructions-box {
                    margin-top: 20px;
                }

                .mushroom {
                    transform: scale(0.8);
                }

                .content-container {
                    padding-top: 10px;
                }
            `;
            document.head.appendChild(styleElement);
            document.body.appendChild(this.homeScreenElement);

            this.createSnowflakes();

            this.addEventListeners();
        } catch (error) {
            console.error('Error creating instruction screen:', error);
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

    addEventListeners() {
        const mushrooms = this.homeScreenElement.querySelectorAll('.mushroom');
        mushrooms.forEach(mushroom => {
            mushroom.addEventListener('click', this.handleClick);
        });

        // Add hover effects for instruction sections
        const sections = this.homeScreenElement.querySelectorAll('.instruction-section');
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-3px)';
            });
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateY(0)';
            });
        });
    }

    handleClick(e) {
        e.preventDefault();
        const buttonText = e.currentTarget.querySelector('.mushroom-top').textContent.toLowerCase();
        
        if (buttonText === 'return to home') {
            this.stateManager.changeState(HomeState);
        }
    }

    update(deltaTime) {
        // Reserved for future animations or state updates
        // Could be used to add dynamic effects to the icons or background
    }

    removeEventListeners() {
        const mushrooms = this.homeScreenElement.querySelectorAll('.mushroom');
        mushrooms.forEach(mushroom => {
            mushroom.removeEventListener('click', this.handleClick);
        });

        const sections = this.homeScreenElement.querySelectorAll('.instruction-section');
        sections.forEach(section => {
            section.removeEventListener('mouseenter', () => {});
            section.removeEventListener('mouseleave', () => {});
        });
    }

    exit() {
        if (this.homeScreenElement) {
            this.removeEventListeners();
            document.body.removeChild(this.homeScreenElement);
            this.homeScreenElement = null;

            // Clean up style element if needed
            const styles = document.querySelectorAll('style');
            styles.forEach(style => {
                if (style.textContent.includes('.instruction-sections')) {
                    document.head.removeChild(style);
                }
            });
        }
    }
}
