const boom = require('boom');
const { result } = require('lodash');
const knex = require('../knex');
async function routes(fastify, options) {
    fastify.get('/getInstitute',async(request,reply)=>{
        await knex('tbl_institute').select().then(async(result)=>{
            reply.status(200).send(result)
        }).catch(async(error)=>{
            reply.status(400).send(error)
        })
    })
    fastify.post(`/addUser`,async(request,reply)=>{
        await knex('tbl_user').insert(request.body).then(async(result)=>{
            console.log(result);
            reply.status(200).send(result)
        }).catch(async(error)=>{
            reply.status(400).send(error)
        })
    })
}
module.exports = routes