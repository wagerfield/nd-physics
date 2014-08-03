/**
 * VerletIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('VerletIntegrator',

  /**
   * Integrates motion for a single particle using Verlet integration.
   * a(i+1) = a(i) * dt(i) * dt(i)
   * v(i+1) = x(i) - x(i-1)
   * x(i+1) = x(i) + v(i+1) + a(i+1)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * this.__deltaSquared);

    // Calculate velocity.
    // velocity = position - oldPosition
    this.__vector.subtract(particle.__vel, particle.__pos, particle.__old.pos);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Store old position.
    // oldPosition = position
    this.__vector.copy(particle.__old.pos, particle.__pos);

    // Add velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, particle.__vel);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);
