import express from "express";
import rateLimiterMiddleware from "../../middleware/rateLimiter";
import { getCountryReportHandler } from "../../controller/CountryReport";
import { loadData } from "../../controller/loadDatabase"
const CountryDataRouter = express.Router();

CountryDataRouter.get('/vaccine-summary', rateLimiterMiddleware, getCountryReportHandler)
export default CountryDataRouter