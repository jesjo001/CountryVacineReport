import * as supertest from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createReport, findAllReports, aggregateReport } from "../service/countryService"

const app = createServer();

const newReport = {
    "YearWeekISO": "2020-W53",
    "FirstDose": 0,
    "FirstDoseRefused": "",
    "SecondDose": 0,
    "DoseAdditional1": 0,
    "DoseAdditional2": 0,
    "UnknownDose": 0,
    "NumberDosesReceived": 12,
    "NumberDosesExported": 0,
    "Region": "AT",
    "Population": "8901064",
    "ReportingCountry": "AT",
    "TargetGroup": "ALL",
    "Vaccine": "JANSS",
    "Denominator": 7388778
}

const secondReport = {
    "YearWeekISO": "2020-W60",
    "FirstDose": 0,
    "FirstDoseRefused": "",
    "SecondDose": 0,
    "DoseAdditional1": 0,
    "DoseAdditional2": 0,
    "UnknownDose": 0,
    "NumberDosesReceived": 12,
    "NumberDosesExported": 0,
    "Region": "AT",
    "Population": "8901064",
    "ReportingCountry": "AT",
    "TargetGroup": "ALL",
    "Vaccine": "JANSS",
    "Denominator": 748778
  }

describe("reports ", () => {

  beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("given all query params is provided", () => {
    it("should return 200 and empty body provided all query parameters are provided and no data exist in db", async ()=> {
       jest.setTimeout(30000);
        
       const dateFrom = "2021-W10";
       const country = "AT";
       const dateTo = "2021-W20";
       const rangeSize = 5;
       const sortDate = "NumberDosesReceived";

       const reportBody = {
          "report": {
            "summary": []
          }, 
          "status": 200 
        };
   
        const {statusCode, body} = await supertest(app).get(`/api/v1/report/vaccine-summary?c=${country}&dateFrom=${dateFrom}&dateTo=${dateTo}&rangeSize=${rangeSize}&sort=${sortDate}`)

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(reportBody);
      })
    })


    describe("given the report exists", () => {
        it("should return 200 and the report", async ()=> {
          jest.setTimeout(30000);
          const report = await createReport(newReport)
          const secondreport = await createReport(newReport)
          const thirdRep = await createReport(secondReport)

          const response = {
            "report": 
            {
                "summary": 
                [
                    {
                        "NumberDosesReceived": 12, 
                        "weekEnd": "2020-W60", 
                        "weekStart": "2020-W60"
                    }, 
                    {
                        "NumberDosesReceived": 24, 
                        "weekEnd": "2020-W53", 
                        "weekStart": "2020-W53"
                    }
                ]
            }, 
            "status": 200
        }
          const {statusCode, body} = await supertest(app).get(`/api/v1/report/vaccine-summary?c=${newReport.ReportingCountry}&dateFrom=${newReport.YearWeekISO}&dateTo=2020-W70&rangeSize=${5}&sort=NumberDosesReceived`)
  
          expect(statusCode).toBe(200);
          expect(body).toStrictEqual(response);
        })
      })
})  
