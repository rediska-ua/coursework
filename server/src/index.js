const routes = require('./routes/user')

const setupServer = () => {
    const fastify = require('fastify')({
        logger: true
    });

    fastify.register(require('fastify-postgres'), {
        connectionString: 'postgres://postgres:Maksim2012@localhost/infoChecker'
    })

    fastify.register(routes, { prefix: '/api'})

    fastify.register(require('fastify-jwt'), {
        secret: 'secret'
    })

    fastify.listen(8080, (err, address) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`server listening on ${address}`)
    })

    return fastify
}

/*module.exports = {
    setupServer
}*/

setupServer()

