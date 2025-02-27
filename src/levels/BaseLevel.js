import * as THREE from 'three';

import { StoneFloor } from '../entities/StoneFloor.js';

import { SlickSlope } from '../entities/SlickSlope.js';
import { Tree } from '../entities/Tree.js';
import { Hill } from '../entities/Hill.js';

import { Rocks } from '../entities/Rocks.js';
import { HillBlock } from '../entities/HillBlock.js';
import { Tube } from '../entities/Tube.js';


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

    addHillBlock(x, y, z) {
        const hillBlock = new HillBlock(this.scene, x, y, z);
        this.MapLayout.push(hillBlock.MapLayoutMesh);
        return hillBlock;
    }

    addTube(x, y, z) {
        const tube = new Tube(this.scene, x, y, z);
        this.MapLayout.push(tube.MapLayoutMesh);
        return tube;
    }
    
    addSlickSlope(x, y, z) {
        const newSlope = new SlickSlope(this.scene, x, y, z);
        this.MapLayout.push(newSlope.MapLayoutMesh);
        return newSlope;
    }

    addTree(x, y, z) {
        const tree = new Tree(this.scene, x, y, z);
        this.MapLayout.push(tree.mapLayoutMesh);
        return tree;
    }



    async addRocks(x, y, z, rotation) {
        const fireplace = new Rocks(this.scene, x, y, z, rotation);
        await fireplace.init();
        //this.MapLayout.push(fireplace.MapLayoutMesh);
        return fireplace;
    }

    async addHill(x, y, z, rotation) {
        const fireplace = new Hill(this.scene, x, y, z, rotation);
        await fireplace.init();
        return fireplace;
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