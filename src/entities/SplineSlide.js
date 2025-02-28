import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const stoneTexture = textureLoader.load('../../assets/stone.png');
stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
stoneTexture.repeat.set( 2 , 2 );
stoneTexture.offset.set( 0.1, 0.5 );
// Create sign mesh and set its properties
const StoneFloorMaterial = new THREE.MeshPhysicalMaterial({
    map: stoneTexture,
    color: 0x4a403f,
    roughness: 0.5,
    metalness: 0,
});

export class SplineSlide {
    constructor(scene) {
        this.scene = scene;
        this.MapLayoutMesh = null;

        const curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ] );
        
    
        // A 2D shape that defines the cross-section of the extruded path
        const shape = new THREE.Shape();
        const thickness = 1;   // Thickness of the vertical bars
        const width = 5;       // Outer width of the U shape
        const height = 4;      // Outer height of the U shape
        const baseHeight = 1;  // Height of the bottom bar

        // Start at the bottom-left
        shape.moveTo(0, 0);
        shape.lineTo(0, height);                  // Left vertical bar (up)
        shape.lineTo(thickness, height);          // Top-left inner corner
        shape.lineTo(thickness, baseHeight);      // Down to the base
        shape.lineTo(width - thickness, baseHeight);  // Move right across base
        shape.lineTo(width - thickness, height);  // Up to top-right inner corner
        shape.lineTo(width, height);              // Right vertical bar (up)
        shape.lineTo(width, 0);                   // Down to bottom-right
        shape.lineTo(0, 0);  

        const extrudeSettings = {
            steps: 100,
            depth: 16,
            extrudePath: curve
        };

        const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        const splineSlideMesh = new THREE.Mesh( geometry, StoneFloorMaterial ) ;
        splineSlideMesh.castShadow = true;
        splineSlideMesh.receiveShadow = true;
        splineSlideMesh.position.set(10, 10, 50); // Move the entire slide to its final position
        this.MapLayoutMesh = splineSlideMesh;

        this.scene.add( splineSlideMesh );
    }
}