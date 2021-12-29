const boom = require('boom');
const { result } = require('lodash');
const knex = require('../knex');
async function routes(fastify, options) {
    fastify.post('/newEntry',async(request,reply)=>{
        console.log(request.body);
        reply.status(200).send("success")
    })    
}
module.exports = routes