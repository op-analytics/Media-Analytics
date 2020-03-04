const chai = require('chai');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const {
  ensureLoggedIn,
  checkTokenSetUser,
  getUserFromBearer,
  verifyJWT,
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
  describe('verifyJWT', () => {
    it('It should try to verify the token against the secret', () => {
      sinon.replace(jwt, 'verify', sinon.fake());

      verifyJWT('token');

      expect(jwt.verify).to.be.calledWithMatch(
        'token',
        process.env.TOKEN_SECRET,
      );
    });

    it('It should return a promise', () => {
      verifyJWT('token');
      expect(verifyJWT()).to.be.an('promise');
    });
  });

  // function getUserFromBearer(bearer) {
  //   const token = getTokenFromBearer(bearer);
  //
  //   if (token) {
  //     return verifyJWT(token).then(user => {
  //       return user;
  //     });
  //   }
  //   return Promise.resolve();
  // }
  describe('getUserFromBearer', () => {
    it('It should return the user if the token is verified', () => {});
    it('It should not return the user if the token is not verified', () => {});
  });

  // function checkTokenSetUser(req, res, next) {
  //   const token = getTokenFromRequest(req);
  //
  //   if (token) {
  //     verifyJWT(token).then(user => {
  //       req.user = user;
  //       next();
  //     });
  //   } else {
  //     next();
  //   }
  // }
  describe('checkTokenSetUser', () => {
    it('It should set req.user if the token is verified', () => {});
    it('It should not set req.user if the token is not verified', () => {});
  });

  afterEach(function() {
    sinon.restore();
  });
});
