/**
 * ImprovedEulerIntegrator constructor.
 * Integrates particle motion using Euler integration:
 * x += v * dt + a * dt * dt * 0.5
 * v += a * dt
 * @constructor
 * @param {String} namespace ImprovedEulerIntegrator namespace.
 * @param {Function} integration Improved Euler integration function.
 */
NDP.Integrator.create('ImprovedEulerIntegrator',
  function(particle, delta, lubricity) {
  }
);
