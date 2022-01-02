const boom = require("boom");
const knex = require("../knex");
const sendmail = require("../middleware/sendmail");
async function routes(fastify, options) {
  fastify.post(`/makeRequest`, async (request, reply) => {
      let user_name = await get_user_name(request.body.user_id)
      let institute_name = await get_institute_name(request.body.institute_id)
      await knex("tbl_maintenance_request").insert(request.body).then((result)=>{
        let mail_text = `A New Maintenance Request Has been Received \nfrom : ${user_name} \nfor : ${institute_name}.\n \nLogin to your admin account https://request-ssa.xyz for more details`;
        //replace my mail id with admin mail id
        sendmail('sanchithoza@gmail.com',`Maintenance Request From ${user_name}`,mail_text);
        reply.status(200).send(result);
      }).catch((error)=>{
        reply.status(400).send(error);
      });
      
  });
  /*get all  Record Routes*/
  fastify.post("/getRequests", async (request, reply) => {
    //return newpost
    let records = [];
    knex
      .select()
      .table("tbl_maintenance_request")
      .where(request.body)
      .then(async (result) => {
        if (result.length) {
          for (i = 0; i < result.length; i++) {
             if (
              result[i].technician_id != "" &&
              result[i].technician_id != null
            ) {
              let technician_name = await knex
                .table("tbl_user")
                .select("name")
                .where("id", result[i].technician_id);
              result[i].technician_name = technician_name[0].name;
            } else {
              result[i].technician_name = "Not Assigned";
            }
            if (result[i].user_id != "" && result[i].user_id != null) {
              let user_name = await knex
                .table("tbl_user")
                .select("name")
                .where("id", result[i].user_id);
              result[i].user_name = user_name[0].name;
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
    const records = [];
    knex
      .select()
      .table("tbl_maintenance_request")
      .then(async (result) => {
        if (result.length) {
          for (i = 0; i < result.length; i++) {
            if (
              result[i].technician_id != "" &&
              result[i].technician_id != null
            ) {
              let technician_name = await knex
                .table("tbl_user")
                .select("name")
                .where("id", result[i].technician_id);
              result[i].technician_name = technician_name[0].name;
            } else {
              result[i].technician_name = "Not Assigned";
            }
            if (result[i].user_id != "" && result[i].user_id != null) {
              let user_name = await knex
                .table("tbl_user")
                .select("name")
                .where("id", result[i].user_id);
              result[i].user_name = user_name[0].name;
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
    await knex
      .select("*")
      .table("tbl_maintenance_request")
      .where("id", request.params.id)
      .then(async (result) => {
        if (result.length) {
          let record = result[0];
          let user_name = await knex
            .table("tbl_user")
            .select("name")
            .where("id", record.user_id);
          let institute = await knex
            .table("tbl_institute")
            .select("name")
            .where("id", record.institute_id);
          record.user_name = user_name[0].name;
          record.institute = institute[0].name;
          if (record.technician_id != "" && record.technician_id != null) {
            let technician_name = await knex
              .table("tbl_user")
              .select("name")
              .where("id", record.technician_id);
            record.technician_name = technician_name[0].name;
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
         reply.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
  });
  fastify.patch("/updateRequest/:id", async (request, reply) => {
    console.log(request.body);
    await knex("tbl_maintenance_request")
      .update(request.body)
      .where({ id: request.params.id })
      .then((result) => {
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
        for (i = 0; i < result.length; i++) {
          let user_name = await knex
            .table("tbl_user")
            .select("name")
            .where("id", result[i].user_id);
          result[i].user_name = user_name[0].name;
        }
         reply.status(200).send(result);
      })
      .catch(async (error) => {
        await reply.status(400).send(`Error getting Comment : ${error}`);
      });
  });
}
let get_user_name = async(id)=>{
return await knex.table("tbl_user").select("name").where("id",id).first().then((row)=>row.name)
}
let get_institute_name = async(id)=>{
  return await knex.table("tbl_institute").select("name").where("id",id).first().then((row)=>row.name);
}
module.exports = routes;
