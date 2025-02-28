import * as THREE from 'three';
import { Model } from '../Models.js';

import MOUNTAIN from '/assets/models/mountain.glb'

export class Mountain {
    constructor(scene, x, y, z, rotation) {
        this.scene = scene;
        this.positionX = x;
        this.positionY = y;
        this.positionZ = z;
        this.rotation = rotation;
        this.model = new Model();
    }
    async init() {
        await this.model.loadModel(MOUNTAIN, {
            rotationOffset: {
                x: 0,
                y: Math.PI + this.rotation,
                z: 0,
            },
            scaleOffset: {
                x: 10,
                y: 10,
                z: 10,
            }
        });
        this.mountain = this.model.sceneObject;
        this.mountain.position.set(this.positionX, this.positionY - 0.5, this.positionZ - 0.1);
        this.scene.add(this.mountain);
    }

    // Method to remove the mountain from the scene if needed
    remove() {
    }
}