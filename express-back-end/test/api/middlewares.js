const Joi = require('@hapi/joi');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { validateBody } = require('../../src/api/middlewares');
chai.use(sinonChai);

const schema = Joi.object({
  name: Joi.string().required(),
});

describe('validateBody', () => {
  it('It should throw an error when given schema is not valid', async () => {
    expect(() => validateBody()).to.throw('Schema supplied was not valid');
  });
  it('It should return a function', async () => {
    expect(() => validateBody(schema)).to.be.an('function');
  });

  it('It should return a function that calls res.json if the body is invalid', async () => {
    const validate = validateBody(schema);
    const next = sinon.spy();
    const req = mockReq();
    const res = mockRes();

    validate(req, res, next);
    expect(res.json).to.be.calledWith({
      errors: [
        {
          message: '"name" is required',
          type: ['name'],
        },
      ],
    });
  });

  it('It should return a function that calls next if the body is valid', async () => {
    const validate = validateBody(schema);
    const next = sinon.spy();
    const req = {
      name: 'Test',
    };
    const res = mockRes();

    validate(req, res, next);
    expect(next).to.be.called;
  });
});
