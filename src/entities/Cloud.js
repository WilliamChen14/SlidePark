// src/entities/Cloud.js
import * as THREE from 'three';

export class Cloud {
    constructor(scene, x, y, z, rotation) {
        this.scene = scene;
        this.MapLayoutMesh = new THREE.Group();

        // Create a soft white material for the cloud
        const cloudMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0,
            transparent: true,
            opacity: 0.9,
        });

        // Create and position 11 spheres to form a cloud
        const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

        const positions = [
            [0, 0, 0], [1, 0.2, 0], [-1, 0.2, 0], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5],
            [0.5, -0.2, -0.5], [-0.5, -0.2, -0.5], [0.8, 0.1, -0.5], [-0.8, 0.1, -0.5],
            [0, 0.6, -0.3], [0, -0.3, 0.3]
        ];

        for (let pos of positions) {
            const sphere = new THREE.Mesh(sphereGeometry, cloudMaterial);
            sphere.position.set(...pos);
            this.MapLayoutMesh.add(sphere);
        }

        // Set cloud position in the scene
        this.MapLayoutMesh.position.set(x, y, z);
        this.MapLayoutMesh.rotateY(rotation);

        // Add the cloud to the scene
        scene.add(this.MapLayoutMesh);
    }

    // Method to remove the cloud from the scene if needed
    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}