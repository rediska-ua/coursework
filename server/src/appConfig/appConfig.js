'use strict'
require('dotenv').config()

const loadEnvVariable = (keyName) => {
    const envVariable = process.env[keyName];

    if (!envVariable ) {
        throw new Error(`Must include ${keyName} in the environment file`)
    }
    return envVariable ;
}

const loadArrayEnvVariable = (keyName) => {
    return loadEnvVariable(keyName).split(',')
}

module.exports = {
    sessionSecret: loadArrayEnvVariable('SESSION_SECRET')
}
