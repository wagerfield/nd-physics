describe('NDP.ImprovedEulerIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);

    NDP.DIMENSIONS = 2;

    this.integrator = new NDP.ImprovedEulerIntegrator();
    this.particle = new NDP.Particle(1);
    this.particles = [this.particle];

    this.vector = NDP.getVector(NDP.DIMENSIONS);
    this.identity = this.vector.create();
    this.accSlave = this.vector.create();
    this.velSlave = this.vector.create();
    this.force = this.vector.create();
    this.acc = this.vector.create();
    this.vel = this.vector.create();
    this.pos = this.vector.create();

    this.integrate = function(force, delta, lubricity) {

      // Set force.
      this.vector.copy(this.force, force);


      // Improved Euler Integration
      // 1) x = x + v * dt + a * dt * dt * 0.5

      // force = mass * acceleration
      // acceleration = force / mass || force * inverseMass
      this.vector.scale(this.acc, this.force, this.particle.__inverseMass);

      // acceleration *= delta * delta * 0.5
      this.vector.scale(this.accSlave, this.acc, delta * delta * 0.5);

      // velocity *= delta
      this.vector.scale(this.velSlave, this.vel, delta);

      // velocity += acceleration
      this.vector.add(this.velSlave, this.velSlave, this.accSlave);

      // position += velocity
      this.vector.add(this.pos, this.pos, this.velSlave);


      // Improved Euler Integration
      // 2) v = v + a * dt

      // acceleration *= delta
      this.vector.scale(this.acc, this.acc, delta);

      // velocity += acceleration
      this.vector.add(this.vel, this.vel, this.acc);

      // velocity *= lubricity
      this.vector.scale(this.vel, this.vel, lubricity);
    };
  });

  it('should be a Function Object', function() {
    expect(NDP.ImprovedEulerIntegrator).toEqual(jasmine.any(Function));
  });

  it('should inherit from NDP.Integrator', function() {
    expect(this.integrator instanceof NDP.Integrator).toBeTruthy();
  });

  describe('__integrate(particle, delta, lubricity)', function() {
    it('should integrate motion using Improved Euler integration', function() {

      var DELTA = 2,
          LUBRICITY = 0.8;

      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.identity);
      expect(this.particle.__vel).toEqualArray(this.identity);
      expect(this.particle.__pos).toEqualArray(this.identity);

      this.integrator.integrate(this.particles, DELTA, LUBRICITY);

      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.identity);
      expect(this.particle.__vel).toEqualArray(this.identity);
      expect(this.particle.__pos).toEqualArray(this.identity);



      // Set particle force.
      this.particle.fx = 2;
      this.particle.fy = 4;

      // Integrate using test integration method.
      this.integrate(this.particle.__force, DELTA, LUBRICITY);

      // Integrate using integrator integration method.
      this.integrator.integrate(this.particles, DELTA, LUBRICITY);

      // Compare vectors.
      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.acc);
      expect(this.particle.__vel).toEqualArray(this.vel);
      expect(this.particle.__pos).toEqualArray(this.pos);

      // console.log('acc1:', this.acc, this.particle.__acc);
      // console.log('vel1:', this.vel, this.particle.__vel);
      // console.log('pos1:', this.pos, this.particle.__pos);



      // Change DELTA & LUBRICITY.
      DELTA = 3;
      LUBRICITY = 0.5;

      // Set particle force.
      this.particle.fx = 5;
      this.particle.fy = 7;

      // Integrate using test integration method.
      this.integrate(this.particle.__force, DELTA, LUBRICITY);

      // Integrate using integrator integration method.
      this.integrator.integrate(this.particles, DELTA, LUBRICITY);

      // Compare vectors.
      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.acc);
      expect(this.particle.__vel).toEqualArray(this.vel);
      expect(this.particle.__pos).toEqualArray(this.pos);

      // console.log('acc2:', this.acc, this.particle.__acc);
      // console.log('vel2:', this.vel, this.particle.__vel);
      // console.log('pos2:', this.pos, this.particle.__pos);
    });
  });
});
