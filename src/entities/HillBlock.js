import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const dirtTexture = textureLoader.load('../../assets/dirt.png');

// Create material
const StoneFloorMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x959c9c,
    roughness: 0.9,
    metalness: 0
});

export class HillBlock {
    constructor(scene, x, y, z, width = 10, height = 5, depth = 20) {
        this.scene = scene;
        this.MapLayoutMesh = null;

        // Define 6 unique vertices
        const vertices = new Float32Array([
            // Bottom rectangle (4 points)
            0, 0, 0,          // 0 - Front left
            20, 0, 0,      // 1 - Front right
            20 + 20, 0, 60,  // 2 - Back right
            -20, 0, 60,      // 3 - Back left

            // Top sloped points (2 points)
            0, 20, 0,      // 4 - Front left (high)
            20, 20, 0   // 5 - Front right (high)
        ]);

        // Define triangle indices (faces)
        const indices = [
            // Bottom face
            0, 1, 2,
            0, 2, 3,

            // Front face (vertical)
            0, 4, 5,
            0, 5, 1,

            // Left face (vertical)
            0, 3, 4,

            // Right face (vertical)
            1, 5, 2,

            // Back face (sloped triangle)
            3, 2, 4,
            2, 5, 4
        ];

        // Create geometry and assign attributes
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals(); // Compute normals for proper shading

        // Create the mesh
        const rampMesh = new THREE.Mesh(geometry, StoneFloorMaterial);
        rampMesh.castShadow = true;
        rampMesh.receiveShadow = true;
        rampMesh.position.set(x, y, z);
        this.MapLayoutMesh = rampMesh;
        scene.add(rampMesh);
    }

    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}
