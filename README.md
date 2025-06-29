# Points Cloud Simulation

This project is a small web application that visualizes how a cloud of points evolves when each pair of points interacts according to the energy law:

```
E = (r - 10)^2
```

where `r` is the distance between two points. Points attract each other when they are farther than 10 units and repel each other when closer.

## Usage

1. Open `index.html` in a web browser.
2. Choose an initial distribution for the 100 points (random, star-shaped, or elongated rectangle).
3. Click **Initialize** to populate the canvas.
4. Click **Start Simulation** to start the stochastic gradient descent minimization. Points move every frame to reduce the total energy.

You can stop the simulation at any time by pressing the button again.
