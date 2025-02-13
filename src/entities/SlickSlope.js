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

const createTriangularPrism = (width, height, depth) => {
    const geometry = new THREE.BufferGeometry();

    // Define the vertices of the triangular prism
    const vertices = new Float32Array([
        // Base triangle (front)
        0, 0, 0,          // Vertex 0
        width, 0, 0,     // Vertex 1
        width, height, 0, // Vertex 2

        // Top triangle (back)
        0, 0, depth,          // Vertex 3
        width, 0, depth,     // Vertex 4
        width, height, depth, // Vertex 5
    ]);

    // Define the faces (indices) of the triangular prism
    const indices = [
        // Front triangle
        0, 1, 2,

        // Back triangle
        3, 5, 4,

        // Side rectangles
        0, 3, 4, 0, 4, 1, // Left side
        1, 4, 5, 1, 5, 2, // Right side
        2, 5, 3, 2, 3, 0, // Bottom side
    ];

    // Set the vertices and indices to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    // Compute normals for lighting
    geometry.computeVertexNormals();

    return geometry;
};


export class SlickSlope {
    constructor(scene, x, y, z) {
        this.scene = scene;
        this.MapLayoutMesh = null;
        this.friction = 0;
        this.normal = new THREE.Vector3(0.5,0.5,0);

        const slickSlope = new THREE.Mesh(createTriangularPrism(1, 1, 1), StoneFloorMaterial);
        slickSlope.castShadow = true;
        slickSlope.receiveShadow = true;
        slickSlope.position.set(x, y, z);
        this.MapLayoutMesh = slickSlope;
        scene.add(slickSlope);

    }

    // Method to remove the sign from the scene if needed
    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}