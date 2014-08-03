describe('NDP.VerletIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);

    NDP.DIMENSIONS = 2;

    this.integrator = new NDP.VerletIntegrator();
    this.particle = new NDP.Particle(1);
    this.particles = [this.particle];

    this.vector = NDP.getVector(NDP.DIMENSIONS);
    this.identity = this.vector.create();
    this.force = this.vector.create();
    this.acc = this.vector.create();
    this.vel = this.vector.create();
    this.pos = this.vector.create();
    this.oldPos = this.vector.create();

    this.integrate = function(force, delta, lubricity) {

      // Set force.
      this.vector.copy(this.force, force);


      // Verlet Integration
      // 1) xi+1 = xi + (xi - xi-1) + a * dt * dt

      // force = mass * acceleration
      // acceleration = force / mass || force * inverseMass
      this.vector.scale(this.acc, this.force, this.particle.__inverseMass);

      // acceleration *= delta
      this.vector.scale(this.acc, this.acc, delta * delta);

      // velocity = position - oldPosition
      this.vector.subtract(this.vel, this.pos, this.oldPos);

      // velocity += acceleration
      this.vector.add(this.vel, this.vel, this.acc);

      // velocity *= lubricity
      this.vector.scale(this.vel, this.vel, lubricity);

      // copy pos to oldPos
      this.vector.copy(this.oldPos, this.pos);

      // position += velocity
      this.vector.add(this.pos, this.pos, this.vel);
    };
  });

  it('should be a Function Object', function() {
    expect(NDP.VerletIntegrator).toEqual(jasmine.any(Function));
  });

  it('should inherit from NDP.Integrator', function() {
    expect(this.integrator instanceof NDP.Integrator).toBeTruthy();
  });

  describe('integrate(particles, delta, lubricity)', function() {
    it('should integrate motion using Verlet integration', function() {

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
