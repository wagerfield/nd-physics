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
  }
);
