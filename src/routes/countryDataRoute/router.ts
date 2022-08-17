import * as express from "express";
import rateLimiterMiddleware from "../../middleware/rateLimiter";
import { getCountryReportHandler, getAgregateCountryReportHandler } from "../../controller/CountryReport";
import { 
    validate,
    queryParamsValidationRules,
    reportValidationRules,
 } from '../../middleware/validation/validator'

const CountryDataRouter = express.Router();

CountryDataRouter.use(rateLimiterMiddleware)
CountryDataRouter.get('/vaccine-summary', queryParamsValidationRules(), validate, getAgregateCountryReportHandler)
export default CountryDataRouter