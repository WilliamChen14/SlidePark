import * as THREE from 'three';
import { Model } from '../Models.js';

import SNOWMAN from '../../assets/models/snowman.glb'

export class Snowman {
    constructor(scene, x, y, z, rotation) {
        this.scene = scene;
        this.positionX = x;
        this.positionY = y + 0.5;
        this.positionZ = z;
        this.rotation = rotation;
        this.model = new Model();
    }
    async init() {
        await this.model.loadModel(SNOWMAN, {
            rotationOffset: {
                x: 0,
                y: Math.PI + this.rotation,
                z: 0,
            },
            scaleOffset: {
                x: 0.5,
                y: 0.5,
                z: 0.5,
            }
        });
        this.snowman = this.model.sceneObject;
        this.snowman.position.set(this.positionX, this.positionY - 0.5, this.positionZ - 0.1);

        // Enable shadow casting and receiving
        this.snowman.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        this.scene.add(this.snowman);
    }

    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    // Method to remove the sign from the scene if needed
    remove() {
    }
}