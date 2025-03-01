// src/Character.js
import * as THREE from 'three';
import { Model } from '../Models.js';
import { AudioPlayer } from '/src/Audio.js';

import CHARACTER from '/assets/models/character.glb';
import PENGUIN from '../../assets/models/basicPenguinText.glb';
import EXCITED_PENGUIN from '../../assets/models/excitedPenguin.glb';


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

        this.isSliding = false;



    }

    async init() {
        // Create a group to hold all parts of the character
        this.characterMesh = new THREE.Group();
        await this.model.loadModel(PENGUIN, {
            transformOffset: {
                x: 0.0,
                y: 0.1,
                z: 0.0,
            },
            rotationOffset: {
                x: 0,
                y: Math.PI / 2,
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
        this.collisionDistance = 0.5;

        this.lastDirection = new THREE.Vector3(0, 0, -1);

        // Add the character to the scene
        this.scene.add(this.characterMesh);

        this.heldItem = null;
        this.pickupCooldown = 500;
        this.lastPickupTime = 0;
    }

    async changeFacial(penguinModel) {
        if (this.model.sceneObject) {
            this.characterMesh.remove(this.model.sceneObject);
        }

        await this.model.loadModel(penguinModel, {
            transformOffset: {
                x: 0.0,
                y: 0.1,
                z: 0.0,
            },
            rotationOffset: {
                x: 0,
                y: Math.PI / 2,
                z: 0,
            },
            scaleOffset: {
                x: 0.5,
                y: 0.5,
                z: 0.5,
            }
        });
        this.characterMesh.add(this.model.sceneObject);
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

    getSurfaceNormal(sceneMeshes, currentCharacterPosition) {
        // Position just below the character
        const raycaster = new THREE.Raycaster();
        const downVector = new THREE.Vector3(0, -1, 0);
        const origin = currentCharacterPosition;


        raycaster.set(origin, downVector);
        const intersections = raycaster.intersectObjects(sceneMeshes, true);

        if (intersections.length > 0) {
            const firstHit = intersections[0]; // Closest surface
            const normal = firstHit.face.normal.clone(); // Get face normal
            //console.log(normal);

            // Transform normal to world space if the object is rotated

            return normal; // Normal in world space
        }

        return null; // No surface detected
    }
    // Method to update character position each frame
    update(keysPressed, MapLayout, Signs, Exit, Tools, moveX, moveZ, changeLevel, stateManager) {

        const currentTime = Date.now();
        let deltaTime = clock.getDelta();
        this.levelData = MapLayout;
        this.signs = Signs;
        this.Exit = Exit;
        this.Tools = Tools;

        const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, Math.cos(this.yaw)).normalize(); // Forward direction
        const right = new THREE.Vector3(Math.cos(this.yaw), 0, Math.sin(this.yaw)).normalize(); // Right direction
        const backward = forward.clone().negate();
        const left = right.clone().negate();

        const forwardDir = backward.clone();  // too lazy to figure out the movement math, so just made 2 extra vectors inverting the forward and backward for raycasting purposes only
        const backwardDir = forward.clone();

        this.characterMesh.rotation.x = 0;
        if(this.isSliding){
            this.characterMesh.rotation.x = Math.PI/2;
        }


        this.characterMesh.rotation.y = -this.yaw + Math.PI;

        if(keysPressed.p){
            this.characterMesh.rotation.y = -this.yaw;
        }

        // Switch to SLiding Mode
        if(keysPressed.j){
            this.isSliding = !this.isSliding;
            if (this.isSliding) {
                this.changeFacial(EXCITED_PENGUIN);
            } else {
                this.changeFacial(PENGUIN);
            }
            keysPressed.j = false;
        }


        this.signs.forEach(obj => obj.checkSignCollision(this.characterMesh));





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
        this.raycaster.set(this.characterMesh.position, forwardDir);
        const intersectsForward = this.raycaster.intersectObjects(this.levelData);
        if (intersectsForward.length > 0 && intersectsForward[0].distance <= this.collisionDistance) {
            canMoveForward = false;
        }
        const intersectsExitForward = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitForward.length > 0 && intersectsExitForward[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        this.raycaster.set(this.characterMesh.position, backwardDir);
        const intersectsBackward = this.raycaster.intersectObjects(this.levelData);
        if (intersectsBackward.length > 0 && intersectsBackward[0].distance <= this.collisionDistance) {
            canMoveBackward = false;
        }
        const intersectsExitBack = this.raycaster.intersectObjects(this.Exit);
        if (intersectsExitBack.length > 0 && intersectsExitBack[0].distance <= this.collisionDistance) {
            console.log("exit hit");
            changeLevel();
        }

        this.raycaster.set(this.characterMesh.position, left);
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

        // If is sliding dont take movement commands all sliding stuff should be bellow this point
        if(this.isSliding){
            this.moveX = 0;
            this.moveZ = 0;
        }

        if (keysPressed.w || keysPressed.a || keysPressed.s || keysPressed.d) {
            if(!this.isSliding){
                this.model.mixer.update(deltaTime * 15);
                this.audio.playRunSound();
            }
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

        let floorNormal = this.getSurfaceNormal(this.levelData, this.characterMesh.position.clone());
        //console.log(this.characterMesh.position);

        const walkSpeed = 5;
        const friction = 10;
        if(!this.isSliding){
            this.velocityX += (movement.x * walkSpeed - this.velocityX * friction) * deltaTime;
            this.velocityZ += (movement.z * walkSpeed - this.velocityZ * friction) * deltaTime;
        }

        if(floorNormal != null && this.isSliding){
            this.velocityX = (this.velocityX * 57.5 + floorNormal.x * 1) * deltaTime;
            this.velocityZ = (this.velocityZ * 57.5 + floorNormal.z * 1) * deltaTime;
        }


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
