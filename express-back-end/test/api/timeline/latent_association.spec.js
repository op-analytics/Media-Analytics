const request = require('supertest');
const expect = require('chai').expect;
const { createDB, destroyDB } = require('../../test-helper');

const app = require('../../../src/app');

const { Models: TimelineModels } = require('../../../src/api/timeline/');
const LatentAssociation = TimelineModels.LatentAssociation;

describe('Latent-Association', () => {
  before(() => {
    createDB();
  });

  describe('Validation', () => {
    it('It should return an array of errors for non-existent required fields', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({ concept_1: ['man'] })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(3);
    });

    it('It should require concept_1 and 2', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({ year_from: 2020, year_to: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(2);
    });

    it('It should require year_from', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({ concept_1: ['man'], concept_2: ['woman'], year_to: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(2);
    });

    it('It should require year_to', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({ concept_1: ['man'], concept_2: ['woman'], year_from: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should require concepts to have a length greater than zero', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({ concept_1: [], concept_2: [], year_from: 2021, year_to: 2022 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(2);
    });

    it('It should require year_from to be before year_to', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({
          year_from: 2022,
          year_to: 2021,
          concept_1: ['man'],
          concept_2: ['woman'],
        })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });
  });

  describe('Retrieval', () => {
    it('It should return data if it exists', async () => {
      await new LatentAssociation({
        word: 'man',
        year_from: 2000,
        year_to: 2004,
        vectors: [0.3213, 0.642324, 0.5342],
      }).save();

      await new LatentAssociation({
        word: 'woman',
        year_from: 2000,
        year_to: 2004,
        vectors: [0.6242, 0.87234, 0.23422],
      }).save();

      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({
          year_from: 2000,
          year_to: 2004,
          concept_1: ['man'],
          concept_2: ['woman'],
        })
        .expect(200);

      await expect(res.body.data).to.be.an('array');
      await expect(res.body.data).to.have.lengthOf(1);
      await expect(res.body.data[0].association).to.be.a('number');
      await expect(res.body.data[0].yearRange).to.be.a('string');
    });

    it('It should fail to return data if it does not exist', async () => {
      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({
          year_from: 2000,
          year_to: 2004,
          concept_1: ['man'],
          concept_2: ['woman'],
        })
        .expect(404);
      await expect(res.body.error).to.be.a('string');
    });

    it(`It should fail to return data if one concept's data does not exist`, async () => {
      await new LatentAssociation({
        word: 'man',
        year_from: 2000,
        year_to: 2004,
        vectors: [0.3213, 0.642324, 0.5342],
      }).save();

      const res = await request(app)
        .post('/api/timeline/latent-association')
        .send({
          year_from: 2000,
          year_to: 2004,
          concept_1: ['man'],
          concept_2: ['woman'],
        })
        .expect(404);

      await expect(res.body.error).to.be.a('string');
    });
  });
  afterEach(async () => {
    await LatentAssociation.deleteMany();
  });
  after(() => {
    destroyDB();
  });
});
