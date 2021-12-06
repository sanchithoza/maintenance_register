const boom = require('boom')
const knex = require('./../knex');
async function routes(fastify, options) {
    fastify.post(`/addUser`, (req, res) => {
        console.log(req.body);
    })
    fastify.post('/login', async(request, reply) => {
        await knex('tbl_user')
            .where({ "user_name": request.body.user_name, "password": request.body.password })
            .then(rows => {
                if (rows.length > 0) {
                    console.log(rows);
                    reply.status(200).send(rows)
                } else {
                    throw "Invalid User Name or Password !!";
                }
            }).catch(error => {
                reply.status(400).send(error)
            })
    })
    fastify.get('/getUsers',async(request,reply)=>{
        await knex('tbl_user').select().then(async(result)=>{
            console.log(result);
            reply.status(200).send(result)
        }).catch((error)=>{
            console.log(error);
            reply.status(400).send(error)
        })
    })
}
module.exports = routes