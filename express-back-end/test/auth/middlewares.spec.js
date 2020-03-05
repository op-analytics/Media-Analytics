const chai = require('chai');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const {
  ensureLoggedIn,
  checkTokenSetUser,
  getTokenFromBearer,
  getTokenFromRequest,
} = require('../../src/api/auth/middlewares');

chai.use(sinonChai);

describe('auth', () => {
  describe('ensureLoggedIn', () => {
    it('It should return unauthorised if there is no user on the request', () => {
      const next = sinon.spy();
      const req = mockReq();
      const res = mockRes();

      ensureLoggedIn(req, res, next);

      expect(next).to.have.callCount(0);
      expect(res.status).to.be.calledWith(401);
      expect(res.json).to.be.calledWith({ message: 'UnAuthorized' });
    });

    it('It should return unauthorised if if there is a user with no id on the request', () => {
      const next = sinon.spy();
      const req = mockReq({
        user: {},
      });
      const res = mockRes();

      ensureLoggedIn(req, res, next);

      expect(next).to.have.callCount(0);
      expect(res.status).to.be.calledWith(401);
      expect(res.json).to.be.calledWith({ message: 'UnAuthorized' });
    });

    it('It should call next if there is a user with an id on the request', () => {
      const next = sinon.spy();
      const req = mockReq({
        user: {
          _id: 1,
        },
      });
      const res = mockRes();

      ensureLoggedIn(req, res, next);

      expect(next).to.have.been.called;
      expect(res.status).to.have.callCount(0);
      expect(res.json).to.have.callCount(0);
    });
  });
});

describe('tokenValidation', () => {
  describe('checkTokenSetUser', () => {
    it('It should call jwt.verify', () => {
      const req = {
        get() {
          return 'token';
        },
      };
      const res = mockRes();
      const next = sinon.spy();

      fakeVerify = sinon.fake.returns({ name: 'test' });
      sinon.replace(jwt, 'verify', fakeVerify);

      checkTokenSetUser(req, res, next);

      expect(fakeVerify).to.be.called;
    });

    it('It should set req.user if the token is verified', () => {
      const req = {
        get() {
          return 'token';
        },
      };
      const res = mockRes();
      const next = sinon.spy();

      fakeVerify = sinon.fake.returns({ name: 'test' });
      sinon.replace(jwt, 'verify', fakeVerify);

      checkTokenSetUser(req, res, next);
      expect(req.user).to.be.an('object');
    });

    it('It should not set req.user if the token is not verified', () => {
      const req = {
        get() {
          return 'token';
        },
      };
      const res = mockRes();
      const next = sinon.spy();

      fakeVerify = sinon.fake.throws(new Error('Oh no'));
      sinon.replace(jwt, 'verify', fakeVerify);

      checkTokenSetUser(req, res, next);
      expect(req.user).to.be.undefined;
      expect(next).to.be.called;
    });
  });

  describe('getTokenFromBearer', () => {
    it('It should return the word at the 1st index if there is more than 1 word ', () => {
      const bearer = 'jim jam';
      const result = getTokenFromBearer(bearer);
      expect(result).to.equals('jam');
    });
    it('It should return the word at the 0th index if there is 1 word ', () => {
      const bearer = 'jim';
      const result = getTokenFromBearer(bearer);
      expect(result).to.equals('jim');
    });
  });

  describe('getTokenFromRequest', () => {
    it('It should return the token seporated from bearer if it was in the auth header', () => {
      const req = {
        get() {
          return 'Bearer token';
        },
      };
      const result = getTokenFromRequest(req);
      expect(result).to.equals('token');
    });
    it('It should return the token only the token was in the auth header', () => {
      const req = {
        get() {
          return 'token';
        },
      };
      const result = getTokenFromRequest(req);
      expect(result).to.equals('token');
    });
    it('It should return false if there was no token in the auth header', () => {
      const req = {
        get() {},
      };
      const result = getTokenFromRequest(req);
      expect(result).to.be.false;
    });
  });

  afterEach(function() {
    sinon.restore();
  });
});
