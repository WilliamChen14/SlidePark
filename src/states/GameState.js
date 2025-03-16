import { Controls } from '../Controls.js';
import { Character } from '../entities/Character.js';
import * as THREE from 'three';
import { AudioPlayer } from '/src/Audio.js';
import { SlideHill } from '../levels/SlideHill.js';


const clock = new THREE.Clock();

export class GameState {
    constructor(stateManager) {
        this.audio = new AudioPlayer();
        this.stateManager = stateManager;
        this.controls = new Controls();
        this.currentLevel = 0;
        this.levelData = null;
        this.level = null; // Store level instance for updates
        this.changeLevel = this.changeLevel.bind(this);
        this.isInitLevel = false;

        this.yaw = -0.2;    // Left/right rotation (Y-axis)
        this.pitch = -0.2; // Up/down rotation (X-axis), slight downward tilt
        this.sensitivity = 0.002; // Adjust mouse sensitivity

        this.isPaused = false;
        this.lastEscapePress = 0;
        document.body.requestPointerLock();
    }

    // initialize game
    async enter() {
        this.setupLighting();
        
        try {
            console.log("Loading character model...");
            
            this.character = new Character(this.stateManager.scene);
            await this.character.init();
            
            await this.changeLevel();
        } catch (error) {
            console.error("Failed to load character:", error);
        }
    }

    togglePause() {
        const currentTime = Date.now();
        if (currentTime - this.lastEscapePress < 200) {
            return; // Prevent multiple toggles from one press
        }
        
        this.isPaused = !this.isPaused;
        this.lastEscapePress = currentTime;
        
        if (this.isPaused) {
            console.log("Game is paused! Press escape to resume.")
            clock.stop();
        } else {
            clock.start();
        }
    }



    setupLighting() {
        const sunLight = new THREE.DirectionalLight(0xffffff, 4);
        sunLight.castShadow = true;
        sunLight.position.set(2, 10, 2);

        const target = new THREE.Object3D();
        target.position.set(0, 0, 0);
        this.stateManager.scene.add(target);
        sunLight.target = target;

        this.stateManager.scene.add(sunLight);
        sunLight.shadow.mapSize.width = 4096;
        sunLight.shadow.mapSize.height = 4096;

        const size = 50;
        sunLight.shadow.camera.top = size;
        sunLight.shadow.camera.bottom = -size;
        sunLight.shadow.camera.left = -size;
        sunLight.shadow.camera.right = size;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = size * 3;

        const ambientLight = new THREE.AmbientLight(0x404040, 70);
        ambientLight.position.set(-5, 2, 5);
        const ambientLight2 = new THREE.AmbientLight(0x404040, 10);
        ambientLight2.position.set(5, 2, -5);
        this.stateManager.scene.add(ambientLight2);
        this.stateManager.scene.add(ambientLight);
    }

    async resetLevel() {
        // Return if already initializing level
        if (this.isInitLevel) return;
 
        this.stateManager.scene.remove(this.character.characterMesh);
        this.character = new Character(this.stateManager.scene);
        await this.character.init();
        
        console.log("Resetting level:", this.currentLevel);
    }

    async changeLevel() {

        // enter loading state
        if (this.isInitLevel) return;
        this.showLoadMessage("loading level...");
        this.isInitLevel = true;
        

        const objectsToRemove = [];
        this.stateManager.scene.traverse((object) => {
            objectsToRemove.push(object);
        });
        objectsToRemove.forEach((object) => {
            this.stateManager.scene.remove(object);
        });

        this.character = new Character(this.stateManager.scene);
        this.character.init();

        this.level = new SlideHill(this.stateManager.scene);

        console.log("Building level...");
        this.levelData = await this.level.build();
        console.log("Level data:", this.levelData);

        this.setupLighting();
        
        if (this.character && this.character.characterMesh) {
            this.character.characterMesh.position.set(0, 1, 0);
        }

        // exit loading state
        this.hideLoadMessage();
        this.isInitLevel = false;
    }

    exit() {
        console.log("Exiting Game State");
        this.controls.resetKeys();
    }

    showLoadMessage(message) {
        const messageContainer = document.getElementById("message-container");
        messageContainer.innerText = message;
        messageContainer.style.display = "block"; // Show the message
    }

    hideLoadMessage() {
        const messageContainer = document.getElementById("message-container");
        messageContainer.style.display = "none"; 
    }

    update() {
        let deltaTime = clock.getDelta();
        if (!this.levelData || !this.character) {
            console.error("Level data or character not initialized");
            return;
        }

        // Update level hazards
        if (this.level && this.level.update) {
            this.level.update();
        }

        if (this.controls.keysPressed.escape) {
            this.togglePause();
            this.controls.keysPressed.escape = false;
        }

        if (this.isPaused) {
            return;
        }

        // Update character with hazards included
        this.character.update(
            this.controls.keysPressed,
            this.levelData.MapLayout,
            this.levelData.Signs,
            this.levelData.Exits,
            this.levelData.Tools,
            this.controls.moveX,
            this.controls.moveZ,
            this.changeLevel,
            this.stateManager
        );
        this.character.yaw = this.controls.yaw;
        this.character.pitch = this.controls.pitch;

        if (this.character.characterMesh.position.y < -60) {
            this.levelData = [];
            this.resetLevel();
        }

        if (this.controls.keysPressed.r === true) {
            this.controls.keysPressed.r = false;
            //this.levelData = [];
            this.resetLevel();
        }


        let cameraOffset = new THREE.Vector3(0, 1, 5);

        if(this.controls.keysPressed.f){
            cameraOffset = new THREE.Vector3(0, 1, 1);
            if(this.character.isSliding){
                cameraOffset = new THREE.Vector3(0, 0.25, -1);
            }
        }

        if(this.controls.keysPressed.p){
            cameraOffset = new THREE.Vector3(0, 1, 8);
        }


        // debug camera is activated with "["
        if (!this.controls.debugCameraMode) {
            //this.stateManager.camera.position += new THREE.Vector3(1,1,1);
            
            // Calculate the offset based on the character's yaw and pitch
            const offsetX = Math.sin(this.character.yaw) * Math.cos(this.character.pitch) * cameraOffset.z;
            const offsetY = Math.sin(this.character.pitch) * cameraOffset.z + cameraOffset.y;
            const offsetZ = Math.cos(this.character.yaw) * Math.cos(this.character.pitch) * cameraOffset.z;

            // Calculate the target camera position
            const targetCameraPosition = new THREE.Vector3(
                this.character.characterMesh.position.x - offsetX,
                this.character.characterMesh.position.y + offsetY,
                this.character.characterMesh.position.z + offsetZ
            );
            //console.log(targetCameraPosition);
            /*
            const deltaCameraPosition = this.character.characterMesh.position.clone().sub(targetCameraPosition);
            const angleCamera = this.character.angle;


            const cameraSpeed = 2;
            deltaCameraPosition.multiplyScalar(cameraSpeed * deltaTime);
            this.stateManager.camera.position.x = targetCameraPosition.x;
            this.stateManager.camera.position.y = targetCameraPosition.y;
            this.stateManager.camera.position.z = targetCameraPosition.z;*/

            // Lerp factor to control smoothness (0 = no movement, 1 = instant movement)
            const lerpFactor = 1 - Math.exp(-5 * deltaTime); // Exponential decay for smooth motion

            // Smoothly interpolate the camera position
            this.stateManager.camera.position.x = targetCameraPosition.x;
            this.stateManager.camera.position.y = THREE.MathUtils.lerp(this.stateManager.camera.position.y, targetCameraPosition.y, lerpFactor);
            this.stateManager.camera.position.z = targetCameraPosition.z;

            
            // Clamp pitch to prevent flipping (e.g., -80° to 80°)
            this.stateManager.camera.rotation.set(-this.character.pitch, -this.character.yaw, 0, 'YXZ');

        }
    }
}