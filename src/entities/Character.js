// src/Character.js
import * as THREE from 'three';
import { Model } from '../Models.js';
import { AudioPlayer } from '/src/Audio.js';

import CHARACTER from '/assets/models/character.glb';
import PENGUIN from '/assets/models/basicPenguin.glb';

const clock = new THREE.Clock();

export class Character {
    constructor(scene) {
        this.scene = scene;
        this.audio = new AudioPlayer();
        this.model = new Model();
        this.pitch = 0;
        this.yaw = 0;
        this.bodyYaw = 0;
        this.spinSpeed = 7;
        this.velocityX = 0;
        this.velocityZ = 0;



    }

    async init() {
        // Create a group to hold all parts of the character
        this.characterMesh = new THREE.Group();
        await this.model.loadModel(CHARACTER, {
            transformOffset: {
                x: 0.52,
                y: -0.5,
                z: 0.85,
            },
            rotationOffset: {
                x: 0,
                y: -Math.PI / 2,
                z: 0,
            },
            scaleOffset: {
                x: 0.5,
                y: 0.5,
                z: 0.5,
            }
        });
        this.characterMesh.add(this.model.sceneObject);

        // Set initial position
        this.characterMesh.position.set(0, 1, 0); // Initial position

        // Enable shadow casting and receiving
        this.characterMesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Movement properties
        this.moveSpeed = 0.125;
        this.jumpStrength = 0.15;
        this.gravity = -.5;
        this.moveX = 0;
        this.moveY = 0;
        this.moveZ = 0;
        this.lastJumpTime = 0;
        this.jumpCooldownTime = 400; // Cooldown duration in milliseconds

        this.isOnGround = true;
        this.raycaster = new THREE.Raycaster();
        this.downVector = new THREE.Vector3(0, -2, 0);
        this.upVector = new THREE.Vector3(0, 2, 0);
        this.rightVector = new THREE.Vector3(2, 0, 0);
        this.leftVector = new THREE.Vector3(-2, 0, 0);
        this.forwardVector = new THREE.Vector3(0, 0, -2);
        this.backwardVector = new THREE.Vector3(0, 0, 2);
        this.collisionDistance = 0.25;

        this.lastDirection = new THREE.Vector3(0, 0, -1);

        // Add the character to the scene
        this.scene.add(this.characterMesh);

        this.heldItem = null;
        this.pickupCooldown = 500;
        this.lastPickupTime = 0;
    }

    // Show the message container when collision with sign occurs
    showMessage(message) {
        const messageContainer = document.getElementById("message-container");
        messageContainer.innerText = message;
        messageContainer.style.display = "block"; // Show the message
        setTimeout(() => {
            messageContainer.style.display = "none"; // Hide the message after 3 seconds
        }, 3000);
    }

    // Method to update character position each frame
    update(keysPressed, MapLayout, Signs, Exit, Tools, moveX, moveZ, changeLevel, stateManager) {

        const currentTime = Date.now();
        let deltaTime = clock.getDelta();
        this.levelData = MapLayout;
        this.signs = Signs;
        this.Exit = Exit;
        this.Tools = Tools;

        const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, Math.cos(this.yaw)); // Forward direction
        const right = new THREE.Vector3(Math.cos(this.yaw), 0, Math.sin(this.yaw)); // Right direction

        /*
        const normalizepitch = (pitch) => ((pitch + Math.PI) % (2 * Math.PI)) - Math.PI;

        let targetpitch = Math.atan2(this.lastDirection.x, this.lastDirection.z);
        targetpitch = normalizepitch(targetpitch)
        this.pitch = normalizepitch(this.pitch)

        let deltapitch = normalizepitch(targetpitch - this.pitch);
        this.pitch += this.spinSpeed * deltapitch * deltaTime;*/
        this.characterMesh.rotation.y = -this.yaw + Math.PI;
            

        this.signs.forEach(obj => obj.checkSignCollision(this.characterMesh));

        /*
        if (keysPressed.m && !this.isDashing) {
            this.performDashAttack(currentTime);
        }

        if (this.isDashing) {
            const dashDirection = this.lastDirection.clone().normalize();
            this.velocityX = dashDirection.x * this.dashSpeed;
            this.velocityZ = dashDirection.z * this.dashSpeed;
        }
            */
        

        

        // Initialize movement allowed flags
        let canMoveForward = true;
        let canMoveBackward = true;
        let canMoveLeft = true;
        let canMoveRight = true;

        // Jump logic
        if (keysPressed.space && this.isOnGround && (currentTime - this.lastJumpTime >= this.jumpCooldownTime)) {
            this.isOnGround = false;
            this.moveY = this.jumpStrength;
            this.lastJumpTime = currentTime;
        }

        if (!this.isOnGround) {
            this.moveY += this.gravity * deltaTime;
        }

        // Collision detection in all directions
        this.raycaster.set(this.characterMesh.position, forward);
        const intersectsForward = this.raycaster.intersectObjects(this.levelData);
        if (intersectsForward.length > 0 && intersectsForward[0].distance <= this.collisionDistance) {
            canMoveForward = false;
        }
        const intersectsExitForward = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitForward.length > 0 && intersectsExitForward[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        this.raycaster.set(this.characterMesh.position, forward);
        const intersectsBackward = this.raycaster.intersectObjects(this.levelData);
        if (intersectsBackward.length > 0 && intersectsBackward[0].distance <= this.collisionDistance) {
            canMoveBackward = false;
        }
        const intersectsExitBack = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitBack.length > 0 && intersectsExitBack[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        this.raycaster.set(this.characterMesh.position, right);
        const intersectsLeft = this.raycaster.intersectObjects(this.levelData);
        if (intersectsLeft.length > 0 && intersectsLeft[0].distance <= this.collisionDistance) {
            canMoveLeft = false;
        }
        const intersectsExitLeft = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitLeft.length > 0 && intersectsExitLeft[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        this.raycaster.set(this.characterMesh.position, right);
        const intersectsRight = this.raycaster.intersectObjects(this.levelData);
        if (intersectsRight.length > 0 && intersectsRight[0].distance <= this.collisionDistance) {
            canMoveRight = false;
        }
        const intersectsExitRight = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitRight.length > 0 && intersectsExitRight[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        // Set movement based on key presses
        this.moveX = moveX;
        this.moveZ = moveZ;
        if (moveX !== 0 || moveZ !== 0) {
            this.lastDirection = new THREE.Vector3(moveX, 0, moveZ);
        }
        /*
        this.moveZ = keysPressed.w ? -this.moveSpeed : keysPressed.s ? this.moveSpeed : 0;
        this.moveX = keysPressed.a ? -this.moveSpeed : keysPressed.d ? this.moveSpeed : 0;
        */

        const tempZ = this.moveZ;
        const tempX = this.moveX;
        if (this.moveZ < 0 && !canMoveForward) {
            this.moveZ = 0; // Forward
            this.velocityZ = 0;
        }
        if (this.moveZ > 0 && !canMoveBackward) {
            this.moveZ = 0; // Backward
            this.velocityZ = 0;
        }
        if (this.moveX < 0 && !canMoveLeft) {
            this.moveX = 0;     // Left
            this.velocityX = 0;
        }
        if (this.moveX > 0 && !canMoveRight) {
            this.moveX = 0;    // Right
            this.velocityX = 0;
        }

        if (keysPressed.w || keysPressed.a || keysPressed.s || keysPressed.d) {
            this.model.mixer.update(deltaTime * 15);
            this.audio.playRunSound();
        } else {
            this.model.mixer.setTime(0);
            this.audio.stopRunSound();
        }

        const direction = new THREE.Vector2(this.moveX, this.moveZ);
        direction.normalize().multiplyScalar(this.moveSpeed);
        this.moveZ = tempZ;
        this.moveX = tempX;

        // Combine forward and right movements based on input direction
        const movement = new THREE.Vector3(
            forward.x * direction.y + right.x * direction.x, // X movement
            0, // Y movement (if you want to support jumping or vertical movement, modify this)
            forward.z * direction.y + right.z * direction.x // Z movement
        );

        const walkSpeed = 5;
        const friction = 10;
        this.velocityX += (movement.x * walkSpeed - this.velocityX * friction) * deltaTime;
        this.velocityZ += (movement.z * walkSpeed - this.velocityZ * friction) * deltaTime;


        // Update character position based on movement
        if (deltaTime < .1) {
            this.characterMesh.position.x += this.velocityX * deltaTime * 50;
            this.characterMesh.position.y += this.moveY * deltaTime * 50;
            this.characterMesh.position.z += this.velocityZ * deltaTime * 50;
        }
        /*
        this.model.sceneObject.position.x = this.characterMesh.position.x;
        this.model.sceneObject.position.y = this.characterMesh.position.y;
        this.model.sceneObject.position.z = this.characterMesh.position.z;
        */

        if(this.heldItem){
            this.heldItem.MapLayoutMesh.position.x = this.characterMesh.position.x;
            this.heldItem.MapLayoutMesh.position.y = this.characterMesh.position.y + 1;
            this.heldItem.MapLayoutMesh.position.z = this.characterMesh.position.z;
        }

        // Collision detection can be added here

        // Snap character to ground if on a surface
        this.raycaster.set(this.characterMesh.position, this.downVector);
        const intersectsDown = this.raycaster.intersectObjects(this.levelData);

        // Check if there’s a ground tile directly below within a small distance
        if (!this.isOnGround && intersectsDown.length > 0 && intersectsDown[0].distance <= 0.5) {
            const groundY = intersectsDown[0].point.y;
            this.characterMesh.position.y = groundY + 0.5;
            this.moveY = 0;               // Reset vertical velocity
            this.isOnGround = true;           // Allow jumping again
        }
        else { 
            this.isOnGround = false;
        }
    }
}
