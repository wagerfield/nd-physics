describe('NDP.EulerIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.integrator = new NDP.EulerIntegrator();
    this.particle = new NDP.Particle(2);
    this.vector = NDP.getVector(NDP.DIMENSIONS);

    this.identity = this.vector.create();
    this.force = this.vector.create();
    this.slave = this.vector.create();
    this.acc = this.vector.create();
    this.vel = this.vector.create();
    this.pos = this.vector.create();

    this.integrate = function(fx, fy, delta, lubricity) {

      // Set force.
      this.vector.set(this.force, fx, fy);


      // Euler Integration
      // 1) v = v + a * dt

      // force = mass * acceleration
      // acceleration = force / mass || force * inverseMass
      this.vector.scale(this.acc, this.force, this.particle.__inverseMass);

      // acceleration *= delta
      this.vector.scale(this.acc, this.acc, delta);

      // velocity += acceleration
      this.vector.add(this.vel, this.vel, this.acc);

      // velocity *= lubricity
      this.vector.scale(this.vel, this.vel, lubricity);


      // Euler Integration
      // 2) x = x + v * dt

      // velocity *= delta
      // DO NOT MUTATE
      this.vector.scale(this.slave, this.vel, delta);

      // position += velocity
      this.vector.add(this.pos, this.pos, this.slave);
    };
  });

  it('should be a Function Object', function() {
    expect(NDP.EulerIntegrator).toEqual(jasmine.any(Function));
  });

  describe('__integrate(particle, delta, lubricity)', function() {
    it('should integrate motion using Euler integration', function() {

      var DELTA = 2,
          LUBRICITY = 0.8;

      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.identity);
      expect(this.particle.__vel).toEqualArray(this.identity);
      expect(this.particle.__pos).toEqualArray(this.identity);

      this.integrator.__integrate(this.particle, DELTA, LUBRICITY);

      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.identity);
      expect(this.particle.__vel).toEqualArray(this.identity);
      expect(this.particle.__pos).toEqualArray(this.identity);

      this.integrate(2, 4, DELTA, LUBRICITY);

      // Set particle force
      this.particle.fx = 2;
      this.particle.fy = 4;
      this.integrator.__integrate(this.particle, DELTA, LUBRICITY);
      expect(this.particle.__force).toEqualArray(this.identity);
      expect(this.particle.__acc).toEqualArray(this.acc);
      expect(this.particle.__vel).toEqualArray(this.vel);
      expect(this.particle.__pos).toEqualArray(this.pos);

      console.log('acc:', this.acc, this.particle.__acc);
      console.log('vel:', this.vel, this.particle.__vel);
      console.log('pos:', this.pos, this.particle.__pos);
    });
  });
});
