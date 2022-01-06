import vars from './helpers/appConfig.js';
import {build} from "./app.js";


const setupServer = () => {

    const server = build(vars);
    server.listen(8080, (error, address) => {
        if (error) {
            server.log.error(error)
            process.exit(1)
        }
       server.log.info(`server listening on ${address}`)
    })

}

setupServer();

