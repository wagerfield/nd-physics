NDP.CollisionBehaviour = function() {
  NDP.Behaviour.call(this);
};

NDP.CollisionBehaviour.id = 'CollisionBehaviour';

NDP.CollisionBehaviour.prototype = Object.create(NDP.Behaviour.prototype);

NDP.CollisionBehaviour.prototype.addParticle = function(particle) {
};

NDP.CollisionBehaviour.prototype.removeParticle = function(particle) {
};
