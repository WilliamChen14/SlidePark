import * as THREE from 'three';

export class Snow {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.totalCount = options.totalCount || 1000;
        this.totalArea = options.totalArea || 100;
        this.height = options.height || 50;
        this.snowfallSpeed = options.snowfallSpeed || 0.2;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.totalCount * 3);
        for (let i = 0; i < this.totalCount; i++) {
            positions[i * 3] = Math.random() * this.totalArea - this.totalArea / 2;
            positions[i * 3 + 1] = Math.random() * this.height;
            positions[i * 3 + 2] = Math.random() * this.totalArea - this.totalArea / 2;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: options.size || 0.5,
            transparent: true,
            opacity: options.opacity || 0.8,
            depthWrite: false,
        });

        this.particles = new THREE.Points(geometry, material);
        scene.add(this.particles);
    }

    update() {
        const positions = this.particles.geometry.attributes.position.array;
        for (let i = 0; i < this.totalCount; i++) {
            positions[i * 3 + 1] -= this.snowfallSpeed;
            if (positions[i * 3 + 1] < 0) {
                positions[i * 3 + 1] = this.height;
            }
        }
        this.particles.geometry.attributes.position.needsUpdate = true;
    }
}