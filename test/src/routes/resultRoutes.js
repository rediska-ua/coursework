const ResultService = require('../services/ResultService.js');
const resultService = new ResultService();

const createResultRoutes = async fastify => {
    fastify.options('/*', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*")
        reply.header("Access-Control-Allow-Headers", "content-type, authorization")
        reply.code(200)
    });


    fastify.get('/result/:id', async (request, reply) => {
        const resultId = request.params.id;
        try {
            const result = await resultService.getResultById(resultId);
            console.log(result)
            reply.code(200);
            reply.send(result);
        } catch (error) {
            reply.code(500);
            reply.send(error);
        }
    });


    fastify.put('/result/:id', async (request, reply) => {
        const resultId = request.params.id;
        const statement = request.body;
        try {
            const result = await resultService.updateResultById(resultId, statement);
            console.log(result)
            reply.code(200);
            reply.send(result);
        } catch (error) {
            reply.code(500);
            reply.send(error);
        }
    });

    fastify.delete('/result/:id', async (request, reply) => {
        const resultId = request.params.id;
        try {
            const result = await resultService.deleteResultById(resultId);
            console.log(result)
            reply.code(200);
            reply.send(result);
        } catch (error) {
            reply.code(500);
            reply.send(error);
        }
    });

    fastify.post('/analyse_text', async (request, reply) => {
        const { text, sources } = request.body;
        try {
            const result = await resultService.analyseText(text, sources);
            console.log(result);
            reply.code(200);
            reply.send({result});
        } catch (error) {
            reply.code(500);
            reply.send({error});
        }
    });

    fastify.post('/sendResultInfo', async (request, reply) => {
        try {
            const resultId = await resultService.postResult(request.body);
            console.log(resultId);
            reply.code(200);
            reply.send({resultId});
        } catch (error) {
            reply.code(500);
            reply.send({error});
        }
    });

    fastify.get('/getResultsByUser/:id', async (request, reply) => {
        const userId = request.params.id;
        try {
            const result = await resultService.getAllByUserId(userId);
            console.log(result);
            reply.code(200);
            reply.send(result);
        } catch (error) {
            reply.code(500);
            reply.send({error});
        }
    });

}

module.exports = createResultRoutes;