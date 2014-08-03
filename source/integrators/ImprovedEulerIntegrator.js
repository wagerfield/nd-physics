/**
 * ImprovedEulerIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('ImprovedEulerIntegrator',

  /**
   * Integrates motion for a single particle using Improved Euler integration.
   * a(i+1) = a(i) * dt(i) * dt(i) * 0.5
   * x(i+1) = x(i) + v(i) * dt(i) + a(i+1)
   * v(i+1) = v(i) + a(i) * dt(i)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(this.__acc, particle.__force, particle.__inverseMass * this.__halfDeltaSquared);

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
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);
