const boom = require('boom')
const knex = require('../knex');
async function routes(fastify, options) {
    fastify.post(`/makeRequest`, async (request, reply) => {
        try {
            let result = await knex('tbl_maintenance_request').insert(request.body);
            console.log(result);
            reply.status(200).send(result)
        } catch (error) {
            reply.status(400).send(error)
        }
    })
        /*get all Master Record Routes*/
    fastify.get('/getRequests', async(request, reply) => {
        console.log(request.body);
        //return newpost
        knex.select().table('tbl_maintenance_request').then((result) => {
            console.log(result);
            if (result.length) {
                reply.status(200).send(result);
            } else {
                reply.status(200).send({ "result": "No Record Available" })
            }
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error);
        })
    })
    
    fastify.post('/deleteRequest', async(request, reply) => {
        console.log(request.body);
        
        await knex.del().where({ "id": request.body.id }).table("tbl_maintenance_request").then((result) => {
            console.log(result);
            reply.status(200).send(result)
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error)
        })
    })
    

    //user login



}

module.exports = routes