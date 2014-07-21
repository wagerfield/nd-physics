/**
 * VerletIntegrator constructor.
 * Integrates particle motion using Verlet integration:
 * v = x - ox
 * x += v + a * dt * dt
 * @constructor
 * @param {String} namespace VerletIntegrator namespace.
 * @param {Function} integrate Verlet integration function.
 */
NDP.Integrator.create('VerletIntegrator',
  function(particle, delta, lubricity) {
  }
);
