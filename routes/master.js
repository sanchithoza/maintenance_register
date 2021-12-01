const boom = require('boom')
const knex = require('./../knex');
const productMaster = require('./../models/productMaster')
const userMaster = require('../models/userMaster')
async function routes(fastify, options) {
    fastify.post(`/addOrganization1`, (req, res) => {
            console.log(req.body);
            res.send(req.body)
        })
        /*get all Master Record Routes*/
    fastify.get('/products', async(request, reply) => {
        console.log(request.body);
        //return newpost
        knex.select().table('tbl_products').then((result) => {
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
    fastify.get('/getProductsByOrgId/:orgId', async(request, reply) => {
        console.log(request.params.orgId);
        //return newpost
        knex.select().table('tbl_products').where({ "organization_id": request.params.orgId }).then((result) => {
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
    fastify.get('/users', async(request, reply) => {
        //return newpost
        knex.select().table('tbl_users').then((result) => {
            if (result.length) {
                reply.status(200).send(result)
            } else {
                reply.status(200).send({ "result": "No Record Available" })
            }
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error);
        })
    })
    fastify.get('/getUser/:id', async(request, reply) => {
        knex.select().table('tbl_users').where({ "id": request.params.id }).then((result) => {
            if (result.length) {
                console.log(result);
                reply.status(200).send(result)
            } else {
                reply.status(200).send({ "result": "No Record Available" })
            }
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error);
        })
    })
    fastify.get('/users/:orgId', async(request, reply) => {
            //return newpost
            knex.select().table('tbl_users').where({ "organization_id": request.params.orgId }).then((result) => {
                if (result.length) {
                    reply.status(200).send(result)
                } else {
                    reply.status(200).send({ "result": "No Record Available" })
                }
            }).catch((error) => {
                console.log(error);
                reply.status(400).send(error);
            })
        })
        /*insert Master Record Routes*/
    fastify.post('/addProduct', async(request, reply) => {
        knex.table('tbl_products').insert(request.body).then((result) => {
            console.log(result);
            reply.status(200).send({ "result": "insert user success" })
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error)
        })
    })
    fastify.post('/addUser', async(request, reply) => {
        knex('tbl_users').insert(request.body).then((result) => {
            console.log(result);
            reply.status(200).send({ "result": "insert user success" })
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error)
        })
    })


    fastify.post('/getUserWhere', async(request, reply) => {

    })
    fastify.get('/getProductById/:id', async(request, reply) => {
        knex.select().where({ "id": request.params.id }).table('tbl_products').then((result) => {
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
    fastify.post('/getUserById', async(request, reply) => {
        try {
            await userMaster.findById(request.body.id).exec((err, result) => {
                if (err) {
                    return reply.send(`Error reading ${err}`)
                }
                reply.send(result)
            })
        } catch (error) {
            throw boom.boomify(err)
        }
    })

    fastify.post('/deleteProduct', async(request, reply) => {
        console.log(request.body);
        knex.del().where({ "id": request.body.id }).table("tbl_products").then((result) => {
            console.log(result);
            reply.status(200).send(result)
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error)
        })
    })
    fastify.delete('/deleteUser/:id', async(request, reply) => {
        knex.del().where({ "id": request.params.id }).table("tbl_users").then((result) => {
            console.log(result);
            reply.status(200).send(result)
        }).catch((error) => {
            console.log(error);
            reply.status(400).send(error)
        })
    })

    fastify.patch('/updateProduct/:id', async(request, reply) => {
        console.log(request.body);
        console.log(request.params);
        knex.update(request.body).table('tbl_products').where({ "id": request.params.id }).then((result) => {
            console.log(result);
            reply.status(200).send(result)
        }).catch((error) => {
            console.log(error);
            reply.status(400).send({ "error": error })
        })
    })
    fastify.patch('/updateUser/:id', async(request, reply) => {
        knex.update(request.body).table('tbl_users').where({ "id": request.params.id }).then((result) => {
            console.log(result);
            reply.status(200).send(result)
        }).catch((error) => {
            console.log(error);
            reply.status(400).send({ "error": error })
        })
    })


    //user login



}

module.exports = routes