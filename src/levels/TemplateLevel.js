// Level.js
import * as THREE from 'three';

import { StoneFLoor } from '../entities/StoneFloor';


export function TemplateLevel(scene) {
    let MapLayout = [];
    let Mobs = [];
    let Exits = [];
    let Signs = [];
    let Tools = [];

    const floorSize = 10;





    

    // Add ground tiles (10x10 grid)
    for (let x = -1; x < floorSize + 1; x++) {
        for (let z = -1; z < floorSize + 1; z++) {
            const stoneFloor = new StoneFLoor(scene, x, 0, z);
            MapLayout.push(stoneFloor.MapLayoutMesh);
        }
    }

    return {MapLayout, Mobs, Signs, Exits, Tools};  // Return all tiles for collision detection
}
