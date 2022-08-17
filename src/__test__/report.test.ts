import * as supertest from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const app = createServer();

describe("reports", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  })
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

    describe("get reports route", () => {
      it("should return a 404", async () => {
        await supertest(app).get('/api/v1/report/vaccine-summaarry')
        .expect(404)
      })
    })
})  