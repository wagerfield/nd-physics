/**
 * VerletIntegrator constructor.
 * Integrates particle motion using Verlet integration:
 * v = x - ox
 * x += v + a * dt * dt
 * @constructor
 * @param {String} namespace VerletIntegrator namespace.
 * @param {Function} integration Verlet integration function.
 */
NDP.Integrator.create('VerletIntegrator',
  function(particle, delta, lubricity) {

    // Calculate velocity.
    // velocity = position - oldPosition
    this.__vector.subtract(particle.__vel, particle.__pos, particle.__old.pos);

    // Scale velocity by lubricity.
    // velocity *= friction
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Calculate acceleration.
    // acceleration *= delta * delta
    this.__vector.scale(particle.__acc, particle.__acc, delta * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Store old position.
    // oldPosition = position
    this.__vector.copy(particle.__old.pos, particle.__pos);

    // Add velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, particle.__vel);

    // Reset acceleration.
    this.__vector.identity(particle.__acc);
  }
);
