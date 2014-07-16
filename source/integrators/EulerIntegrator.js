NDP.EulerIntegrator = function() {
  NDP.Integrator.call(this);
};

NDP.EulerIntegrator.id = 'EulerIntegrator';

NDP.EulerIntegrator.prototype = Object.create(NDP.Integrator.prototype);
NDP.EulerIntegrator.prototype.constructor = NDP.EulerIntegrator;
