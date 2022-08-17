
import 'dotenv/config'
import log from "./logger";

import connect from "./db/connect";
import createServer from './utils/server';

const PORT = process.env.PORT as any;
const HOST = process.env.HOST as string;

const app = createServer()

app.listen(PORT,HOST, () => {
log.info(`Server listening at http://${HOST}:${PORT}`)
    connect();
})