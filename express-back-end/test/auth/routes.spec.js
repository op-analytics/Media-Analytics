const request = require('supertest');
const expect = require('chai').expect;
const { createDB, destroyDB } = require('../test-helper');
const bcrypt = require('bcrypt');

const app = require('../../src/app');

const User = require('../../src/api/auth/models/user.model');

describe('POST /Login', () => {
  before(() => {
    createDB();
  });

  describe('Validation', () => {
    it('It should return an array of errors for non-existent required fields', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(422);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(2);
    });
    it('It should require a password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'email@gmail.com' })
        .expect(422);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
    });
    it('It should require a email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password' })
        .expect(422);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
    });
    it('It should require a valid email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@email', password: 'password' })
        .expect(422);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
    });
  });

  describe('Response', () => {
    it('It should fail to login with a non-existing email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@email.com', password: 'password' })
        .expect(400);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should fail to login with an incorrect password', async () => {
      const UserData = {
        name: 'Bob',
        email: 'bob@builder.com',
        password: 'Yes@WeCan',
      };
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(UserData.password, salt);

      // Try save and tokenize the user return error if it doesn't work
      const user = new User({
        ...UserData,
        password: hashedPassword,
      });
      await user.save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'bob@builder.com', password: 'password' })
        .expect(400);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should login with the correct credentials', async () => {
      const UserData = {
        name: 'Bob',
        email: 'bob@builder.com',
        password: 'Yes@WeCan',
      };
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(UserData.password, salt);

      // Try save and tokenize the user return error if it doesn't work
      const user = new User({
        ...UserData,
        password: hashedPassword,
      });
      await user.save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'bob@builder.com', password: 'Yes@WeCan' })
        .expect(200);
      expect(res.body.token).to.be.an('string');
    });
  });
  afterEach(async () => {
    await User.deleteMany();
  });

  after(() => {
    destroyDB();
  });
});