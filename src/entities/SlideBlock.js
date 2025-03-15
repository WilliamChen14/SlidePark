import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const textureLoader = new THREE.TextureLoader();
const stoneTexture = textureLoader.load('../../assets/stone.png');
// Create sign mesh and set its properties
const StoneFloorMaterial = new THREE.MeshPhysicalMaterial({
    map: stoneTexture,
    color: 0x4a403f,
    roughness: 0.5,
    metalness: 0,
});


export class SlideBlock {
    constructor(scene, x, y, z, width = 3.0, length = 4, height = 0.2, angle = Math.atan(1/3)) {
        this.scene = scene;
        this.MapLayoutMesh = null;

        // Bottom plank
        const bottomGeom = new THREE.BoxGeometry(width, height, length);
        bottomGeom.rotateX(angle); // Tilt the slide
        bottomGeom.translate(0, 0, 0); // Centered at (0,0,0)
        

        // Left plank
        const sideLeftGeom = new THREE.BoxGeometry(height, height * 6, length);
        sideLeftGeom.translate(-width / 2, 0.5, 0);
        sideLeftGeom.rotateZ(Math.PI * 2);
        sideLeftGeom.rotateX(angle);
    

        // Right plank
        const sideRightGeom = new THREE.BoxGeometry(height, height * 6, length);
        sideRightGeom.translate(width / 2, 0.5, 0);
        sideRightGeom.rotateZ(-Math.PI * 2);
        sideRightGeom.rotateX(angle);

        // Merge all geometries into one
        const mergedGeometry = mergeGeometries([bottomGeom, sideLeftGeom, sideRightGeom]);

        // Add everything to the group
        const mergedMesh = new THREE.Mesh(mergedGeometry, StoneFloorMaterial);
        mergedMesh.castShadow = true;
        mergedMesh.receiveShadow = true;
        mergedMesh.position.set(x, y, z); // Move the entire slide to its final position
        this.MapLayoutMesh = mergedMesh;

        scene.add(mergedMesh);
    }

    remove() {
        this.scene.remove(this.MapLayoutMesh);
    }
}
