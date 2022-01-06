'use strict'

const server = require('./app')({
    logger: {
        level: 'info',
        prettyPrint: true
    }
})

server.listen(8080, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
})