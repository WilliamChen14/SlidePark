import { BaseLevel } from './BaseLevel.js';


export class SlideHill extends BaseLevel {
    async build() {
        const floorSize = 10;
        // Create a complete floor with walls
        this.addWallsAndFloorsAroundGrid(-1, 18, -1, floorSize + 1);
        this.addRocks(10, 1, 1, 0);
        this.addHouse(10, 1, 8, 0);

        this.addMountain(27.6, 1, 7.8, 0);
        this.addMountain(-10.6, 1, 7.8, 0);

        this.addWallsAndFloorsAroundGrid2(-22, 40, 59 + floorSize, floorSize + 60 + floorSize, -19);
        this.addStoneFloor(5,1,2);
        this.addStoneFloor(5,1,3);
        this.addStoneFloor(6,1,3);
        this.addStoneFloor(6,1,2);
        this.addStoneFloor(6,2,2);
        this.addHillBlock(-1.5, -19.5, 11.5);
        this.addSlideBlock(5,2,5);

        this.addTree(-1, 0.5, 11.5);
        this.addTree(-2, -0.5, 14.5);
        this.addTree(-3, -1.5, 17.5);
        this.addTree(-4, -2.5, 20.5);
        this.addTree(-5, -3.5, 23.5);
        this.addTree(-6, -4.5, 26.5);
        this.addTree(-7, -5.5, 29.5);
        this.addTree(-8, -6.5, 32.5);
        this.addTree(-9, -7.5, 35.5);
        this.addTree(-10, -8.5, 38.5);
        this.addTree(-11, -9.5, 41.5);
        this.addTree(-12, -10.5, 44.5);
        this.addTree(-13, -11.5, 47.5);
        this.addTree(-14, -12.5, 50.5);
        this.addTree(-15, -13.5, 53.5);
        this.addTree(-16, -14.5, 56.5);
        this.addTree(-17, -15.5, 59.5);
        this.addTree(-18, -16.5, 62.5);
        this.addTree(-19, -17.5, 65.5);
        this.addTree(-20, -18.5, 68.5);
        this.addTree(-21, -19.5, 71.5);
        this.addTree(-22, -20.5, 74.5);

        this.addTree(18, 0.5, 11.5);
        this.addTree(19, -0.5, 14.5);
        this.addTree(20, -1.5, 17.5);
        this.addTree(21, -2.5, 20.5);
        this.addTree(22, -3.5, 23.5);
        this.addTree(23, -4.5, 26.5);
        this.addTree(24, -5.5, 29.5);
        this.addTree(25, -6.5, 32.5);
        this.addTree(26, -7.5, 35.5);
        this.addTree(27, -8.5, 38.5);
        this.addTree(28, -9.5, 41.5);
        this.addTree(29, -10.5, 44.5);
        this.addTree(30, -11.5, 47.5);
        this.addTree(31, -12.5, 50.5);
        this.addTree(32, -13.5, 53.5);
        this.addTree(33, -14.5, 56.5);
        this.addTree(34, -15.5, 59.5);
        this.addTree(35, -16.5, 62.5);
        this.addTree(36, -17.5, 65.5);
        this.addTree(37, -18.5, 68.5);
        this.addTree(38, -19.5, 71.5);
        this.addTree(39, -20.5, 74.5);



        return this.getLevelData();
    }
}