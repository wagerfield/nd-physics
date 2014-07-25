/**
 * ImprovedEulerIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('ImprovedEulerIntegrator',

  /**
   * Integrates motion for a single particle using Improved Euler integration.
   * x += v * dt + a * dt * dt * 0.5
   * v += a * dt
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // acceleration *= inverseMass * deltaSquared * 0.5
    this.__vector.scale(this.__acc, particle.__acc, particle.__inverseMass * delta * delta * 0.5);

    // Calculate velocity into slave to preserve momentum.
    // velocity *= delta
    this.__vector.scale(this.__vel, particle.__vel, delta);

    // Add slave acceleration to slave velocity.
    // velocity += acceleration
    this.__vector.add(this.__vel, this.__vel, this.__acc);

    // Add slave velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, this.__vel);

    // Calculate acceleration.
    // acceleration *= delta
    this.__vector.scale(particle.__acc, particle.__acc, delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= friction
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Reset acceleration.
    this.__vector.identity(particle.__acc);
  }
);
