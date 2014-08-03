# nD Physics

> Dimension Agnostic Physics Engine

[![Build Status](https://travis-ci.org/wagerfield/nd-physics.svg?branch=master)](https://travis-ci.org/wagerfield/nd-physics)

## Integrators

#### Newton's Law of Motion
```
force = mass * acceleration
acceleration = force / mass
acceleration = force * (1 / mass)
acceleration = force * inverseMass
```

#### Euler
```
v = v + a * dt
x = x + v * dt
```

#### Improved Euler
```
x = x + v * dt + a * dt * dt * 0.5
v = v + a * dt
```

#### Verlet
```
xi+1 = xi + (xi - xi-1) + a * dt * dt
```

#### Time Corrected Verlet
```
xi+1 = xi + (xi - xi-1) * (dti / dti-1) + a * dti * dti
```
