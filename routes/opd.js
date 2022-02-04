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
    fastify.post('/getEntries',async(request,reply)=>{
        let filter= {};
        let query = `SELECT patient_name,DATE_FORMAT(created_at, '%Y-%m-%d') as created,entry_by,`
        if(request.body.report_type =="lab"){
            query += `lab as amount`
        }else if(request.body.report_type =="registration"){
            query += `sum(registration + consultation) as amount` 
        }else if(request.body.report_type =="other"){
            query += `sum(dispensary + bio_chemic + mother_tincher + minor_dressing + major_dressing + first_stiches + other_stiches + injection + ecg) as amount` 
        }else{
            query += `total as amount`
        }
        query += ` from tbl_opd_register`
        if(request.body.department!="none"){
            query += ` where created_at between '${from_date}' and '${to_date}'`
            query += ` and department = '${request.body.department}'`;
        }
        await knex.raw(query).then((result)=>{
            reply.status(200).send(result[0])
        }).catch((error)=>{
            reply.status(400).send(error)
        })
    })  
}
module.exports = routes