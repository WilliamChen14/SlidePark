import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const iceTexture = textureLoader.load('../../assets/ice-field-bl/ice_field_albedo.png');
iceTexture.wrapS = iceTexture.wrapT = THREE.RepeatWrapping;
iceTexture.repeat.set( 2 , 2 );
const iceRoughness = textureLoader.load('../../assets/ice-field-bl/ice_field_roughness.png');
const iceNormal = textureLoader.load('../../assets/ice-field-bl/ice_field_normal-ogl.png');
// Create sign mesh and set its properties
const IceFloorMaterial = new THREE.MeshPhysicalMaterial({
    map: iceTexture,
    roughnessMap: iceRoughness,
    normalMap: iceNormal,
    color: 0xc0f0eb,
    roughness: 1,
    metalness: 0,
});

function clamp( value, min, max ) {
	return Math.max( min, Math.min( max, value ) );
}

export class SplineSlide {
    constructor(scene, x, y, z, theta) {
        this.scene = scene;
        this.MapLayoutMesh = null;

        const curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, 0, 20 ),
            new THREE.Vector3( 17, 0, 40 ),
            new THREE.Vector3( 11, 0, 60 )
        ] );

        curve.computeFrenetFrames = function (segments, closed = false) {
            const normal = new THREE.Vector3(0, 1, 0);
            const tangents = [];
            const normals = [];
            const binormals = [];
    
            const vec = new THREE.Vector3();
            const mat = new THREE.Matrix4();
    
            // compute the tangent vectors for each segment on the curve
            for ( let i = 0; i <= segments; i ++ ) {
                const u = i / segments;
                tangents[ i ] = this.getTangentAt( u, new THREE.Vector3() );
            }

            if (Math.abs(tangents[0].dot(normal)) > 0.99) {  // If tangent is nearly vertical
                normal.set(1, 0, 0); // Use (1,0,0) as fallback normal
            }
        
            // 🔹 Compute the initial normal and binormal
            normals[0] = new THREE.Vector3().crossVectors(normal, tangents[0]).normalize(); 
            binormals[0] = new THREE.Vector3().crossVectors(tangents[0], normals[0]); 
    
    
            // compute the slowly-varying normal and binormal vectors for each segment on the curve
    
            for ( let i = 1; i <= segments; i ++ ) {
    
                normals[ i ] = normals[ i - 1 ].clone();
                binormals[ i ] = binormals[ i - 1 ].clone();
                vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );
                if ( vec.length() > Number.EPSILON ) {
                    vec.normalize();
                    const theta = Math.acos( clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors
                    normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );
                }
                binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );
            }
    
            // if the curve is closed, postprocess the vectors so the first and last normal vectors are the same
            if ( closed === true ) {
                let theta = Math.acos( clamp( normals[ 0 ].dot( normals[ segments ] ), - 1, 1 ) );
                theta /= segments;
                if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ segments ] ) ) > 0 ) {
                    theta = - theta;
                }
                for ( let i = 1; i <= segments; i ++ ) {
                    // twist a little...
                    normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
                    binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );
                }
            }
    
            return {
                tangents: tangents,
                normals: normals,
                binormals: binormals
            };
        };
        
    
        // A 2D shape that defines the cross-section of the extruded path
        const shape = new THREE.Shape();
        const thickness = 0.2;   // Thickness of the vertical bars
        const width = 5;       // Outer width of the U shape
        const height = 1.5;      // Outer height of the U shape
        const baseHeight = 0.2;  // Height of the bottom bar

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

        // shape.lineTo(0, width);
        // shape.lineTo(height, width);
        // shape.lineTo(height, width - thickness);
        // shape.lineTo(baseHeight, width - thickness);
        // shape.lineTo(baseHeight, thickness);
        // shape.lineTo(height, thickness);
        // shape.lineTo(height, 0);
        // shape.lineTo(0, 0); 

        const extrudeSettings = {
            steps: 100,
            depth: 16,
            extrudePath: curve
        };

        const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        geometry.rotateX(theta);
        const splineSlideMesh = new THREE.Mesh( geometry, IceFloorMaterial ) ;
        splineSlideMesh.castShadow = true;
        splineSlideMesh.receiveShadow = true;
        splineSlideMesh.position.set(x, y, z); // Move the entire slide to its final position
        this.MapLayoutMesh = splineSlideMesh;

        this.scene.add( splineSlideMesh );
    }
}