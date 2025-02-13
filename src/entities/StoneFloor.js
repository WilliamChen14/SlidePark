// src/entities/Sign.js
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const stoneTexture = textureLoader.load('../../assets/stone.png');
// Create sign mesh and set its properties
const StoneFloorMaterial = new THREE.MeshPhysicalMaterial({
    map: stoneTexture,
    color: 0x4a403f,
    roughness: 0.5,
    metalness: 0,
});

export class StoneFloor {
    constructor(scene, x, y, z) {
        this.scene = scene;
        this.MapLayoutMesh = null;
        this.friction = 10;
        this.normal = new THREE.Vector3(0,1,0);

        const stoneFloor = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), StoneFloorMaterial);
        stoneFloor.castShadow = true;
        stoneFloor.receiveShadow = true;
        stoneFloor.position.set(x, y, z);
        this.MapLayoutMesh = stoneFloor;
        scene.add(stoneFloor);

    }

    // Method to remove the sign from the scene if needed
    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}