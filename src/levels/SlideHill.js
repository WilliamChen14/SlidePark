import { BaseLevel } from './BaseLevel.js';


export class SlideHill extends BaseLevel {
    async build() {
        const floorSize = 10;
        // Create a complete floor with walls
        this.addWallsAndFloorsAroundGrid(-1, 18, -1, floorSize + 1);
        this.addRocks(10, 1, 1, 0);
        this.addHouse(10, 1, 8, 0);

        this.addCloud(-3, 1, -2, Math.PI * 0.7);
        this.addCloud(-3, 1, 1, Math.PI * 0.5);
        this.addCloud(-3, 1, 4, Math.PI * 0.3);
        this.addCloud(-3, 1, 7, Math.PI * 0.9);
        this.addCloud(-3, 1, 10, Math.PI * 0.1);
        this.addCloud(-2, 1, -2, Math.PI * 0.5);
        this.addCloud(1, 1, -2, Math.PI * -0.8);
        this.addCloud(4, 1, -2, Math.PI * 1.3);
        this.addCloud(7, 1, -2, Math.PI * -1.2);
        this.addCloud(10, 1, -2, Math.PI * 0.2);
        this.addCloud(13, 1, -2, Math.PI * -0.5);
        this.addCloud(16, 1, -2, Math.PI * 0.7);
        this.addCloud(19, 1, -2, Math.PI * -1.0);
        this.addCloud(22, 1, -2, Math.PI * 1.1);
        this.addCloud(20, 1, -2, Math.PI * 0.5);
        this.addCloud(20, 1, 1, Math.PI * 0.2);
        this.addCloud(20, 1, 4, Math.PI * 0.8);
        this.addCloud(20, 1, 7, Math.PI * 0.3);
        this.addCloud(20, 1, 10, Math.PI * 0.1);

        this.addMountain(50.6, -30, 7.8, 0);
        this.addMountain(-30.6, -30, 7.8, Math.PI/4);
        this.addMountain(10, -30, -20, 0);
        this.addMountain(60, -25, -25, Math.PI/3);
        this.addMountain(-40, -20, -35, Math.PI/5);
        this.addMountain(60.6, -30, 40, Math.PI/2);
        this.addMountain(-45.6, -30, 45, Math.PI/3);
        this.addMountain(70, -40, 70, Math.PI);
        this.addMountain(-50, -40, 65, Math.PI);
        this.addMountain(80, -45, 80, Math.PI/6);
        this.addMountain(-60, -45, 80, Math.PI/2);
        this.addMountain(65, -45, 100, Math.PI/3);
        this.addMountain(-45, -45, 100, Math.PI/7);
        this.addMountain(-15, -45, 100, Math.PI/11);
        this.addMountain(15, -50, 100, Math.PI);
        this.addMountain(33, -40, 100, Math.PI);

        this.addWallsAndFloorsAroundGrid2(-22, 40, 59 + floorSize, floorSize + 60 + floorSize, -19);
        // Clouds along the x = -22 boundary
        this.addCloud(-22, -18, 59 + floorSize, Math.PI * 0.6);
        this.addCloud(-22, -18, 62 + floorSize, Math.PI * 0.4);
        this.addCloud(-22, -18, 65 + floorSize, Math.PI * 0.7);
        this.addCloud(-22, -18, 68 + floorSize, Math.PI * 0.3);
        this.addCloud(-22, -18, 71 + floorSize, Math.PI * 1.0);
        this.addCloud(-21, -18, 71 + floorSize, Math.PI * 0.5);
        this.addCloud(-18, -18, 71 + floorSize, Math.PI * -0.6);
        this.addCloud(-15, -18, 71 + floorSize, Math.PI * 1.1);
        this.addCloud(-12, -18, 71 + floorSize, Math.PI * 0.2);
        this.addCloud(-9, -18, 71 + floorSize, Math.PI * -0.3);
        this.addCloud(-6, -18, 71 + floorSize, Math.PI * 0.8);
        this.addCloud(-3, -18, 71 + floorSize, Math.PI * -0.9);

        // Clouds along the x = 40 boundary
        this.addCloud(40, -18, 59 + floorSize, Math.PI * -0.2);
        this.addCloud(40, -18, 62 + floorSize, Math.PI * 0.3);
        this.addCloud(40, -18, 65 + floorSize, Math.PI * -0.7);
        this.addCloud(40, -18, 68 + floorSize, Math.PI * 0.5);
        this.addCloud(40, -18, 71 + floorSize, Math.PI * 1.3);
        this.addCloud(39, -18, 71 + floorSize, Math.PI * 0.1);
        this.addCloud(36, -18, 71 + floorSize, Math.PI * 0.8);
        this.addCloud(33, -18, 71 + floorSize, Math.PI * -0.6);
        this.addCloud(30, -18, 71 + floorSize, Math.PI * 1.0);
        this.addCloud(27, -18, 71 + floorSize, Math.PI * -0.5);
        this.addCloud(24, -18, 71 + floorSize, Math.PI * 0.2);
        this.addCloud(21, -18, 71 + floorSize, Math.PI * 0.9);
        this.addCloud(18, -18, 71 + floorSize, Math.PI * 0.3);
        this.addCloud(15, -18, 71 + floorSize, Math.PI * 0.5);
        this.addCloud(12, -18, 71 + floorSize, Math.PI * -0.9);
        this.addCloud(9, -18, 71 + floorSize, Math.PI * -0.2);
        this.addCloud(6, -18, 71 + floorSize, Math.PI * 0.2);
        this.addCloud(3, -18, 71 + floorSize, Math.PI * 0.6);
        this.addCloud(0, -18, 71 + floorSize, Math.PI * 1.7);




        this.addStoneFloor(5,1,2);
        this.addStoneFloor(5,1,3);
        this.addStoneFloor(6,1,3);
        this.addStoneFloor(6,1,2);
        this.addStoneFloor(6,2,2);
      
        this.addHillBlock(-1.5, -19.6, 11.5);
        this.addSlideBlock(1, -0.2, 13.35);
        this.addSlideBlock(1, -1.46, 17.14);
        this.addSlideBlock(1, -2.72, 20.93);
        this.addSlideBlock(1, -3.98, 24.72);
        this.addSlideBlock(1, -5.24, 28.51);
        this.addSlideBlock(1, -6.50, 32.30);
        this.addSlideBlock(1, -7.76, 36.09);
        this.addSlideBlock(1, -9.02, 39.88);
        this.addSlideBlock(1, -10.28, 43.67);
        this.addSlideBlock(1, -11.54, 47.46);
        this.addSlideBlock(1, -12.80, 51.25);
        this.addSlideBlock(1, -14.06, 55.04);
        this.addSlideBlock(1, -15.32, 58.83);
        this.addSlideBlock(1, -16.58, 62.62);
        this.addSlideBlock(1, -17.84, 66.41);
        this.addSlideBlock(1, -19.10, 70.20);

        this.addSplineSlide(10, -6, 30, Math.PI/11);


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