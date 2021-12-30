const fastify = require('fastify')({
    logger: true
});

fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
})

fastify.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})



