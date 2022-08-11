import express from "express"
import 'dotenv/config'
import log from "./logger";
import connect from "./db/connect";

const PORT = process.env.PORT as any;
const HOST = process.env.HOST as string;

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(PORT,HOST, () => {
log.info(`Server listening at http://${HOST}:${PORT}`)
    connect();
})