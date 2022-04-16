
const knex = require("../knex");
const sendmail = require("../middleware/sendmail");
async function routes(fastify, options) {
  fastify.post(`/makeRequest`, async (request, reply) => {
      let user_name = await get_user_name(request.body.user_id)
      let institute_name = await get_institute_name(request.body.institute_id)
      await knex("tbl_maintenance_request").insert(request.body).then((result)=>{
        let mail_text = `A New Maintenance Request Has been Received \nfrom : ${user_name} \nfor : ${institute_name}.\n \nLogin to your admin account https://request-ssa.xyz for more details`;
        //replace my mail id with admin mail id
//        sendmail('sanchithoza@gmail.com',`Maintenance Request From ${user_name}`,mail_text);
        reply.status(200).send(result);
      }).catch((error)=>{
        reply.status(400).send(error);
      });
      
  });
  /*get all  Record Routes*/
  fastify.post("/getRequests", async (request, reply) => {
    //return newpost
    let role = await get_user_role(request.body.user_id);
    
    if(role != "admin"){
      knex
      .select()
      .table("tbl_maintenance_request")
      .where('user_id',request.body.user_id)
      .orWhere('technician_id',request.body.user_id)
      .then(async (result) => {
        let prepaired_result = await prepair_response(result)
        console.log(prepaired_result);
        reply.status(200).send(prepaired_result)
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
    }else{
      knex
      .select()
      .table("tbl_maintenance_request")
      .then(async (result) => {
        let prepaired_result = await prepair_response(result)
        console.log(prepaired_result);
        reply.status(200).send(prepaired_result)
      })
      .catch((error) => {
        console.log(error);
        reply.status(400).send(error);
      });
    }
    
  });
  //report route
  fastify.post("/getReport", async (request, reply) => {
    //return newpost
    const records = [];
    console.log(request.body);
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
              result[i].technician_name = await get_user_name(result[i].technician_id);
            } else {
              result[i].technician_name = "Not Assigned";
            }
            if (result[i].user_id != "" && result[i].user_id != null) {
              result[i].user_name = await get_user_name(result[i].user_id);
            }
            result[i].created_at = (await getFormetedDate(result[i].created_at)).toString();
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
          record.user_name = await get_user_name(record.user_id);
          record.institute = await get_institute_name(record.institute_id);
          if (record.technician_id != "" && record.technician_id != null) {
            record.technician_name =  await get_user_name(record.technician_id);
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
          result[i].user_name = await get_user_name(result[i].user_id);
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
let get_user_role = async(id)=>{
  return await knex.table("tbl_user").select("role").where("id",id).first().then((row)=>row.role)
  }
let get_institute_name = async(id)=>{
  return await knex.table("tbl_institute").select("name").where("id",id).first().then((row)=>row.name);
}
let prepair_response = async(result)=>{
  console.log(result);
 if (result.length) {
    for (i = 0; i < result.length; i++) {
       if (
        result[i].technician_id != "" &&
        result[i].technician_id != null
      ) {
        result[i].technician_name = await get_user_name(result[i].technician_id);
      } else {
        result[i].technician_name = "Not Assigned";
      }
      if (result[i].user_id != "" && result[i].user_id != null) {
        result[i].user_name = await get_user_name(result[i].user_id);
      }
    }
    return result;
  } else {
    return { result: "No Record Available" };
  }
}
let  getFormetedDate = async(date) => {
  let rawDate = new Date(date);
  let dateString =
    rawDate.getDate() +
    "/" +
    (rawDate.getMonth() + 1) +
    "/" +
    rawDate.getFullYear() +
    " at " +
    rawDate.getHours() +
    ":" +
    rawDate.getMinutes();
  return dateString;
}
module.exports = routes;
