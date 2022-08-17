import * as supertest from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const app = createServer();

describe("reports route test", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

    describe("get reports route", () => {
      it("should return a 404", async () => {
        jest.setTimeout(30000);
        await supertest(app).get('/api/v1/report/vaccine-summaarry')
        .expect(404);
      })
    });

    describe("given a queryparams is missing", () => {
      it("should return 422 and validation error if query params is missing", async ()=> {
        jest.setTimeout(30000);

        const dateFrom = "2021-W10";
        const country = "AT";
        const dateTo = "2021-W20";
        const rangeSize = "";
        const sortDate = "weekStart";
        const error = "Invalid value";

        const {statusCode, body} = await supertest(app).get(`/api/v1/report/vaccine-summary?c=${country}&dateFrom=${dateFrom}&dateTo=${dateTo}&rangeSize=${rangeSize}&sort=${sortDate}`);

        expect(statusCode).toBe(422);
        expect(body.errors[0].rangeSize).toBe(error);
      })
    })

    describe("Should rate Limit when route is hit", () => {
      it("should return 429 provided provided rate limit is reached", async ()=> {
        jest.setTimeout(30000);

        const dateFrom = "2021-W10";
        const country = "AT";
        const dateTo = "2021-W20";
        const rangeSize = 5;
        const sortDate = "NumberDosesReceived";
        const error = "Too Many Retrys Per minute.";
   
        const {statusCode, body} = await supertest(app).get(`/api/v1/report/vaccine-summary?c=${country}&dateFrom=${dateFrom}&dateTo=${dateTo}&rangeSize=${rangeSize}&sort=${sortDate}`);
        expect(statusCode).toBe(429);
      })
    })
})  