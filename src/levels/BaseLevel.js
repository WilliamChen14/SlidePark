import * as THREE from 'three';

import { StoneFLoor } from '../entities/StoneFloor.js';


export class BaseLevel {
    constructor(scene) {
        this.scene = scene;
        this.MapLayout = [];
        this.Mobs = [];
        this.Exits = [];
        this.Signs = [];
        this.Tools = [];
        this.Hazards = []; // New array to track fire hazards
        this.Waters = [];
        this.Updatables = [];
    }

    addStoneFloor(x, y, z) {
        const stoneFloor = new StoneFLoor(this.scene, x, y, z);
        this.MapLayout.push(stoneFloor.MapLayoutMesh);
        return stoneFloor;
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
            Mobs: this.Mobs,
            Signs: this.Signs,
            Exits: this.Exits,
            Tools: this.Tools,
            Hazards: this.Hazards, // Include hazards in level data
            Waters: this.Waters
        };
    }

    update() {
        // Update all hazards (fires)
        this.Hazards.forEach(hazard => {
            if (hazard.update) {
                hazard.update();
            }
        });
        this.Updatables.forEach(updateable => {
            if (updateable.update) {
                updateable.update();
            }
        });
    }
}