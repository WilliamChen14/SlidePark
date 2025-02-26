import { BaseLevel } from './BaseLevel.js';


export class SlideHill extends BaseLevel {
    async build() {
        const floorSize = 30;
        // Create a complete floor with walls
        this.addWallsAndFloorsAroundGrid(-1, floorSize + 1, -1, floorSize + 1);
        //this.addWallsAndFloorsAroundGrid(2, 5, 2, 5);
        this.addSlickSlope(1, 1, 1);
        this.addStoneFloor(5,1,2);
        this.addHillBlock(1, 1, 6);



        await this.addHill(0, -11, -15, Math.PI);



        return this.getLevelData();
    }
}