/**
 * EulerIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('EulerIntegrator',

  /**
   * Integrates motion for a single particle using Euler integration.
   * a(i+1) = a(i) * dt(i)
   * v(i+1) = v(i) + a(i+1)
   * x(i+1) = x(i) + v(i+1) * dt(i)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // NOTE: Force is stored in the acceleration vector,
    //       so needs to be converted to acceleration:
    //       force = mass * acceleration
    //       acceleration = force / mass || force * inverseMass
    // acceleration *= inverseMass * delta
    this.__vector.scale(particle.__acc, particle.__acc, particle.__inverseMass * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
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
