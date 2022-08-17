import * as express from "express"
import { Request, Response } from "express"
import Route from "../routes/routes";

function createServer(){
    const app = express()

    //Middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use('/api/v1', Route)
    app.use('*', (req: Request, res: Response ) => res.status(404).send('Page Not Found'))

    return app;
}

export default createServer;