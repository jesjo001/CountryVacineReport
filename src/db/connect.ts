import * as mongoose from 'mongoose';
import  { ConnectOptions } from 'mongoose';
import log from '../logger'


function connect(){
    const dbUri = process.env.dbUri as string;

    return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() =>{
        log.info("Database connected")
    })
    .catch((err) =>{
        log.error("Database Error: ", err);
        process.exit(1)
    })
}

export default connect;