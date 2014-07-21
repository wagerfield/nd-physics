/**
 * EulerIntegrator constructor.
 * Integrates particle motion using Euler integration:
 * v += a * dt
 * x += v * dt
 * @constructor
 * @param {String} namespace EulerIntegrator namespace.
 * @param {Function} integrate Euler integration function.
 */
NDP.Integrator.create('EulerIntegrator',
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // acceleration *= inverseMass * delta
    this.__vector.scale(particle.__acc, particle.__acc, particle.__inverseMass * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= friction
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Calculate velocity into slave to preserve momentum.
    // velocity *= delta
    this.__vector.scale(this.__vel, particle.__vel, delta);

    // Add slave velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, this.__vel);

    // Reset acceleration.
    this.__vector.identity(particle.__acc);
  }
);
