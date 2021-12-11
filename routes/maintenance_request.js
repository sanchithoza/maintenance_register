const boom = require("boom");
const knex = require("../knex");
async function routes(fastify, options) {
  fastify.post(`/makeRequest`, async (request, reply) => {
    try {
      let result = await knex("tbl_maintenance_request").insert(request.body);
      console.log(result);
      reply.status(200).send(result);
    } catch (error) {
      reply.status(400).send(error);
    }
  });
  /*get all Master Record Routes*/
  fastify.post("/getRequests", async (request, reply) => {
    //return newpost
    let records = [];
    knex
      .select()
      .table("tbl_maintenance_request")
      .where(request.body)
      .then(async(result) => {
        if (result.length) {
          for(i = 0;i < result.length;i++){
            if(result[i].technician_id !=''){
              let technician_name = await knex.table("tbl_user").select("user_name").where("id", result[i].technician_id);
              console.log(technician_name[0]);
              result[i].technician_name = technician_name[0].user_name
            }
          }
          reply.status(200).send(result);
        } else {
          reply.status(200).send({ result: "No Record Available" });
        }
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });
  fastify.get("/getRequests", async (request, reply) => {
    //return newpost
    const records = []
    knex
      .select()
      .table("tbl_maintenance_request")
      .then( async (result) => {
        if (result.length) {
          for(i = 0;i < result.length;i++){
            if(result[i].technician_id !=''){
              let technician_name = await knex.table("tbl_user").select("user_name").where("id", result[i].technician_id);
              console.log(technician_name[0]);
              result[i].technician_name = technician_name[0].user_name
            }
          }
          //console.log(records);
          reply.status(200).send(result);
        } else {
          reply.status(200).send({ result: "No Record Available" });
        }
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });
  //get request detail
  fastify.get("/getRequest/:id", async (request, reply) => {
    console.log(request.params.id);
    //return newpost

    await knex
      .select("*")
      .table("tbl_maintenance_request")
      .where("id", request.params.id)
      .then(async (result) => {
        if (result.length) {
          let record = result[0];
          let user_name = await knex
            .table("tbl_user")
            .select("user_name")
            .where("id", record.user_id);
          let institute = await knex
            .table("tbl_institute")
            .select("alias")
            .where("id", record.institute_id);
          record.user_name = user_name[0].user_name;
          record.institute = institute[0].alias;
          if(record.technician_id !=''){
            let technician_name = await knex
            .table("tbl_user")
            .select("user_name")
            .where("id", record.technician_id);
            record.technician_name = technician_name[0].user_name
          }
          
          reply.status(200).send(record);
        } else {
          reply.status(200).send({ result: "No Record Available" });
        }
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });

  fastify.delete("/deleteRequest/:id", async (request, reply) => {
    await knex
      .del()
      .where({ id: request.params.id })
      .table("tbl_maintenance_request")
      .then((result) => {
        console.log(result);
        reply.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });

  fastify.patch("/updateRequest/:id", async (request, reply) => {
    await knex("tbl_maintenance_request")
      .update(request.body)
      .where({ id: request.params.id })
      .then((result) => {
        console.log(result);
        reply.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });
  //Adding Comment
  fastify.post(`/addComment`, async (request, reply) => {
    await knex("tbl_comment")
      .insert(request.body)
      .then(async (result) => {
        await reply.status(200).send(result);
      })
      .catch(async (error) => {
        await reply.status(400).send(`Error Adding Comment : ${error}`);
      });
  });
  fastify.get(`/getComments/:request_id`, async (request, reply) => {
    await knex("tbl_comment")
      .select()
      .where({ tbl_maintenance_request_id: request.params.request_id })
      .then(async (result) => {
        console.log(result);
        reply.status(200).send(result);
      })
      .catch(async (error) => {
        await reply.status(400).send(`Error getting Comment : ${error}`);
      });
  });
}

module.exports = routes;
