const boom = require('boom');
const { result } = require('lodash');
const knex = require('./../knex');
async function routes(fastify, options) {
    fastify.post(`/addOrganization`, async(request, reply) => {
        await knex.select().table('tbl_organization').where({ "name": request.body.name })
            .then(async(result) => {
                if (result.length > 0) {
                    throw "organization already exists";
                }
                await knex.select().table('tbl_users').where({ "user_name": request.body.user_name })
                    .then(async(result) => {
                        if (result.length > 0) {
                            throw "user name already exists";
                        }
                    }).catch(error => {
                        reply.status(400).send(error)
                    })
                let organization_data = {
                    "name": request.body.name,
                    "email": request.body.email,
                    "mobile": request.body.mobile
                }
                await knex('tbl_organization').insert(organization_data)
                    .then(async(result) => {
                        if (result.length > 0) {
                            let user_data = {
                                "email": request.body.email,
                                "mobile": request.body.mobile,
                                "user_name": request.body.user_name,
                                "role": "admin ",
                                "password": request.body.password,
                                "access": "admin",
                                "organization_id": result[0]
                            }
                            await knex('tbl_users').insert(user_data)
                                .then(result => {
                                    if (result.length > 0) {
                                        reply.status(200).send(result)
                                    } else {
                                        throw "unable to add user"
                                    }

                                })
                                .catch(error => {
                                    reply.status(400).send(error)
                                })
                        } else {
                            throw "unable to add organization"
                        }
                    })
                    .catch(error => {
                        reply.status(400).send(error)
                    })

            })
            .catch(error => {
                console.log(error);
                reply.status(400).send(error)

            });
    })
}
module.exports = routes