# SlidePark
It's a giant slide builder game you play as a penguin that loves sliding. You will be able to build slides out of various slide pieces and then go down the slide while witnessing your creation's glory in a first-person view.

## To run
```
git clone https://github.com/WilliamChen14/SlidePark.git
cd SlidePark
npm i
npx vite
```
## Report
```
Slide Park
Harry Huang, William Chen, Susana Sun
 


Abstract

This project is a giant slide park game featuring a penguin as the main character, offering an exciting and immersive sliding experience. Players navigate through pre-built slides, each designed with unique twists, turns, and dynamic elements that enhance gameplay. With a first-person view, the player can fully immerse themselves in the ride, feeling the speed and excitement as they glide through the park. Not only can players experience the thrill of the slide, but they can also look around and explore the vibrant 3D environment, taking in all the cool details along the way.

The game is developed using THREE.js, enabling real-time 3D rendering within a web browser, ensuring smooth and interactive gameplay. Additionally, Blender is utilized for creating detailed models and animations, bringing the penguin and environment to life. The combination of these technologies delivers a visually engaging and fluid experience, making the game an enjoyable and accessible adventure for players of all ages.


Introduction
Players can explore the slide park in third-person mode, guiding the penguin to different slide entrances, waddling around, and even snapping pictures in Picture Mode. Once they’re ready to slide, they can either watch the penguin go or switch to first-person mode for a fully immersive experience, seeing everything from the penguin’s perspective as they race down at high speeds.
What makes this game even more engaging is the lively, interactive world. The environment features falling snow, created using a particle system, making the slide park feel like a true winter wonderland. The penguin itself has expressive facial animations, showing emotions like excitement and behavioral animations such as waddling.
On the technical side, the game is built with THREE.js for real-time 3D rendering, while Blender is used to create detailed models and animations. To ensure smooth and natural slide paths, we use parametric curves with Catmull-Rom splines. The game also features collision detection and response, making sure the penguin stays on track while maintaining realistic movement. Rigid body dynamics is used to refine the penguin’s movement based on gravity, friction, and momentum.

Key Features
This game features smooth, dynamic slides built using Catmull-Rom splines, which ensures a natural and fluid sliding experience. A particle system creates a realistic snowfall effect, enhancing the winter-themed environment. Collision detection and response prevent the penguin from clipping through objects, which helps to keep movement physically accurate and immersive. Additionally, rigid body dynamics handle gravity, friction, and momentum, making the sliding feel natural and responsive. Lastly, the penguin comes to life with joint-based, facial, and behavioral animations, showing expressive emotions, waddling movements, and interactive reactions that make the character more engaging and fun to play with.


Parametric Curve (Catmull-Rom Spline Slides)

In order to create smooth and dynamic slide paths, the game utilizes parametric curves, specifically Catmull-Rom splines. This method allows us to define a series of control points that shape the slide’s path while ensuring smooth transitions between sections. Unlike linear or basic curved paths, Catmull-Rom splines provide a natural and fluid trajectory, which makes the sliding experience feel more realistic and enjoyable. By dynamically generating slide paths based on these splines, this game avoids sharp, unnatural turns and instead offers a continuous, flowing motion that mimics real-world slides. This approach also makes it easier to experiment with different slide designs without manually adjusting every curve.

Particles (Snow Effect)


The snow effect in the game is created using a particle system that simulates a natural snowfall, enhancing the game's winter atmosphere. Thousands of individual snowflakes are randomly distributed throughout the environment, each moving at a steady speed to create a continuous falling effect. As the snowflakes descend, they seamlessly reset once they reach the ground, ensuring an endless snowfall cycle. By adjusting parameters such as size, density, and movement speed, we ensure that the snowfall remains visually appealing without overwhelming the screen. This dynamic effect adds depth and realism to the scene, making the world feel more alive and immersive as players slide through the snowy landscape.

Collision Detection and Response (Vector Collision Detection)

To ensure that the penguin stays on track while sliding requires collision detection and response. We use vector-based collision detection to determine when the penguin interacts with the slide’s edges and surfaces. When a collision is detected, a response mechanism adjusts the penguin’s velocity and direction, preventing it from clipping through objects or flying off the slide. Instead of abruptly stopping movement, we implement smooth redirections, ensuring that the penguin naturally follows the slide’s contours. This method also accounts for different angles of impact, helping to maintain momentum while keeping the movement physically accurate. Collision detection plays a crucial role in preserving the game’s physics-based realism, making sure the penguin’s movement feels responsive and natural rather than rigid or glitchy.

Rigid Body Dynamics (Sliding Dynamics)

The penguin's movement on the slide is designed to feel realistic and natural, using physics-based motion instead of pre-set animations. This means that the penguin reacts dynamically to the shape and steepness of the slide, rather than following a fixed path. As it slides, gravity pulls it downward, making it gain speed on steeper sections, while friction and momentum influence how fast it moves and whether it tilts slightly during turns. The result is a smooth and fluid sliding experience, where the penguin's speed naturally increases on steep slopes and slows down on flatter sections. By using a physics influenced approach, it makes the gameplay feel more immersive and interactive, which gives players a true sense of motion as they race down the slide.

Modeling + Animation (Joint, Facial, and Behavioral Animation)

By adding different animations with Blender and THREE.js, we made the penguin feel more alive and expressive. It waddles naturally when walking toward a slide, making its movements look more realistic. Once the penguin is on the slide, the facial expressions change to the excited facial expression.  It also has behavioral animations that make it feel more dynamic, like waddling when walking. These details help bring the penguin to life, making it feel like a fun and interactive character rather than just a part of the game.

Potential Enhancements and Future Improvements

If we had more time, we would focus on making the game feel even more realistic and engaging by improving its physics, animations, and environment. One major addition would be jump pads that allow the penguin to bounce smoothly and naturally by using a physics system that controls how high and fast it rebounds. We would also work on adding more environmental effects to make the world feel more alive. For example, wind could move the falling snow, making it drift realistically, and water splashes could react to the penguin, creating a more immersive sliding experience. Lastly, we would add customization options, such as letting players change the penguin’s outfit or modify the slide designs, making the game more personal and enjoyable. These improvements would make the game more dynamic, visually exciting, and fun to play.

Conclusion

This project successfully creates a fun and immersive sliding experience, blending realistic physics, expressive animations, and a dynamic winter environment. By using parametric curves for smooth slides, collision detection for accurate movement, and particle effects for snowfall, the game offers a visually engaging and interactive world. The penguin’s animations and facial expressions add personality, making it feel more lively and entertaining.

Beyond just building the game, this project was a fun and exciting challenge to create. We learned a lot about new technologies, especially 3D modeling and animation with Blender, and gained hands-on experience in character animation, environment design, parametric curves, and physics-based movement. Seeing everything come together was incredibly rewarding, as we watched our ideas turn into a fully playable and immersive experience. While there are still ways to improve, like enhancing physics and adding more interactive effects, we are proud of what we have built and excited about its potential.

```