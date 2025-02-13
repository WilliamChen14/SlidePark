import * as THREE from 'three';

import { StoneFloor } from '../entities/StoneFloor.js';

import { SlickSlope } from '../entities/SlickSlope.js';


export class BaseLevel {
    constructor(scene) {
        this.scene = scene;
        this.MapLayout = [];
        this.Exits = [];
        this.Signs = [];
        this.Tools = [];
        this.Updatables = [];
    }

    addStoneFloor(x, y, z) {
        const stoneFloor = new StoneFloor(this.scene, x, y, z);
        this.MapLayout.push(stoneFloor.MapLayoutMesh);
        return stoneFloor;
    }
    
    addSlickSlope(x, y, z) {
        const newSlope = new SlickSlope(this.scene, x, y, z);
        this.MapLayout.push(newSlope.MapLayoutMesh);
        return newSlope;
    }

    addGrid(startX, endX, startZ, endZ, elementCallback) {
        for (let x = startX; x <= endX; x++) {
            for (let z = startZ; z <= endZ; z++) {
                elementCallback(x, z);
            }
        }
    }

    addWallsAndFloorsAroundGrid(startX, endX, startZ, endZ) {

        // Add floor tiles within the perimeter
        for (let x = startX; x <= endX; x++) {
            for (let z = startZ; z <= endZ; z++) {
                this.addStoneFloor(x, 0, z);
            }
        }
    }

    getLevelData() {
        return {
            MapLayout: this.MapLayout,
            Signs: this.Signs,
            Exits: this.Exits,
            Tools: this.Tools,
        };
    }

    update() {
        // Update all hazards (fires)
        this.Updatables.forEach(updateable => {
            if (updateable.update) {
                updateable.update();
            }
        });
    }
}