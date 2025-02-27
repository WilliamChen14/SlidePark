// src/entities/Sign.js
import * as THREE from 'three';
import { CSG } from 'three-csg-ts'; // Install: npm install three-csg-ts


const textureLoader = new THREE.TextureLoader();
const stoneTexture = textureLoader.load('../../assets/stone.png');
// Create sign mesh and set its properties
const TubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 0,
    side: THREE.DoubleSide,
});

export class Tube {
    constructor(scene, x, y, z) {
        this.scene = scene;
        this.MapLayoutMesh = null;
        this.friction = 10;
        this.normal = new THREE.Vector3(0,1,0);

        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(0, 0, 5),
            new THREE.Vector3(5, 0, 0)
        ]);

        const outerRadius = 1;
        const innerRadius = 0.8; // Adjust for thickness
        const segments = 16;

        // Create the outer and inner tubes
        const outerTube = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, outerRadius, segments, false));
        const innerTube = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, innerRadius, segments, false));
        const solidTubeCSG = CSG.subtract(outerTube, innerTube);
        const solidTubeMesh = new THREE.Mesh(solidTubeCSG, TubeMaterial);
        solidTubeMesh.castShadow = true;
        solidTubeMesh.receiveShadow = true;
        solidTubeMesh.position.set(x, y, z);
        this.MapLayoutMesh = solidTubeMesh;
        scene.add(solidTubeMesh);
    }

    // Method to remove the sign from the scene if needed
    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}