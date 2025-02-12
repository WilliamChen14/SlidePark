import { BaseLevel } from './BaseLevel.js';


export class SlideHill extends BaseLevel {
    async build() {
        const floorSize = 30;
        // Create a complete floor with walls
        this.addWallsAndFloorsAroundGrid(-1, floorSize + 1, -1, floorSize + 1);

        return this.getLevelData();
    }
}