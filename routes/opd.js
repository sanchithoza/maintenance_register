const boom = require('boom');
const { result } = require('lodash');
const pdfGenerator = require('pdfkit')
const knex = require('../knex');
async function routes(fastify, options) {
    fastify.post('/newEntry',async(request,reply)=>{
        knex("tbl_opd_register").insert(request.body).then((result)=>{
            reply.status(200).send(result)
        }).catch((error)=>{
            reply.status(400).send(error)
        })
    })  
    fastify.get('/getEntries',async(request,reply)=>{
        await knex("tbl_opd_register").select().then((result)=>{
            reply.status(200).send(result)
        }).catch((error)=>{
            reply.status(400).send(error)
        })
    })  
}
module.exports = routes