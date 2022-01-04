
import dotenv from 'dotenv';
dotenv.config()

const loadEnvVariable = (keyName) => {
    const envVariable = process.env[keyName];
    if (!envVariable ) {
        throw new Error(`Must include ${keyName} in the environment file`)
    }
    return envVariable ;
};

const loadArrayEnvVariable = (keyName) => {
    return loadEnvVariable(keyName).split(',')
};
const vars = {
    secret: loadArrayEnvVariable('SESSION_SECRET'),
    mongo: loadEnvVariable('MONGODB_URI')
};
export default vars;
