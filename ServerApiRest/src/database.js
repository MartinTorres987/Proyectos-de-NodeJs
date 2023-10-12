import { connect } from "mongoose";
import config from './config'

(async () =>{
    try {
        const db = await connect(config.mongodbURL);
        console.log('DB connectec to', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})();

