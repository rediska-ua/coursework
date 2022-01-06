'use strict'

const Fastify = require('fastify')

function buildFastify () {
    const fastify = Fastify()

    fastify.get('/', function (request, reply) {
        reply.send({ hello: 'world' })
    })

    return fastify
}

module.exports = buildFastify