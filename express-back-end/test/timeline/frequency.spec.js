const request = require('supertest');
const chai = require('chai');
const { expect } = chai;
const { createDB, destroyDB } = require('../test-helper');

const app = require('../../src/app');

const { Models: TimelineModels } = require('../../src/api/timeline/');
const Frequency = TimelineModels.Frequency;

chai.use(require('chai-sorted'));

describe('Frequency', () => {
  before(() => {
    createDB();
  });

  describe('Validation', () => {
    it('It should return an array of errors for non-existent required fields', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'] })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(2);
    });

    it('It should require words', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ year_from: 2020, year_to: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should require year_from', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_to: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(2);
    });

    it('It should require year_to', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_from: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should require words to have a length greater than zero', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: [], year_from: 2021, year_to: 2022 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });

    it('It should require year_from to be before year_to', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_from: 2022, year_to: 2021 })
        .expect(422);
      await expect(res.body.errors).to.be.an('array');
      await expect(res.body.errors).to.have.lengthOf(1);
    });
  });

  describe('Retrieval', () => {
    it('It should return data if it exists', async () => {
      await new Frequency({
        word: 'man',
        year: '2001',
        rank: 600,
        count: 56,
        freq: 0.000435,
      }).save();

      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_from: 2000, year_to: 2004 })
        .expect(200);

      await expect(res.body.data).to.be.an('array');
      await expect(res.body.data).to.have.lengthOf(1);
      await expect(res.body.data[0].data).to.have.lengthOf(1);
      await expect(res.body.data[0].data[0].year).to.be.a('string');
      await expect(res.body.data[0].data[0].rank).to.be.a('number');
      await expect(res.body.data[0].data[0].count).to.be.a('number');
      await expect(res.body.data[0].data[0].freq).to.be.a('number');
    });

    it('It should return an array sorted by year', async () => {
      await Frequency.insertMany([
        {
          word: 'man',
          year: '2003',
          rank: 420,
          count: 69,
          freq: 0.002435,
        },
        {
          word: 'man',
          year: '2002',
          rank: 600,
          count: 56,
          freq: 0.001435,
        },
        {
          word: 'man',
          year: '2001',
          rank: 700,
          count: 38,
          freq: 0.000435,
        },
      ]);

      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_from: 2000, year_to: 2004 })
        .expect(200);

      await expect(res.body.data).to.be.an('array');
      await expect(res.body.data[0].data).to.have.lengthOf(3);
      await expect(res.body.data[0].data).to.be.sortedBy('year', {
        accending: true,
      });
    });

    it('It should fail to return data if it does not exist', async () => {
      const res = await request(app)
        .post('/api/timeline/frequency')
        .send({ words: ['man'], year_from: 2000, year_to: 2004 })
        .expect(404);
      await expect(res.body.error).to.be.a('string');
    });
  });
  afterEach(async () => {
    await Frequency.deleteMany();
  });
  after(() => {
    destroyDB();
  });
});
