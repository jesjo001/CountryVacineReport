import  * as express from 'express';
import {Request, Response} from 'express';
import CountryDataRouter from './countryDataRoute/router';
import rateLimiterMiddleware  from '../middleware/rateLimiter';
import { getCountryReportHandler } from '../controller/CountryReport';

const Route = express.Router();

Route.use('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))


Route.use('/report', rateLimiterMiddleware, CountryDataRouter);

export default Route;