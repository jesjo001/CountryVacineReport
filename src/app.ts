import express, { Request, Response } from "express"
import 'dotenv/config'
import log from "./logger";

import connect from "./db/connect";
import Route from "./routes/routes";

const PORT = process.env.PORT as any;
const HOST = process.env.HOST as string;

const app = express()

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/api/v1', Route)
app.use('*', (req: Request, res: Response ) => res.status(404).send('Page Not Found'))

app.listen(PORT,HOST, () => {
log.info(`Server listening at http://${HOST}:${PORT}`)
    connect();
})