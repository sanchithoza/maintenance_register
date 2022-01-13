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
        let columns = ["patient_name","created_at","entry_by"];
        if(request.body.department!="none"){
            filter.department = request.body.department
        }
        if(request.body.report_type =="lab"){
            columns.push("lab as amount") 
        }else if(request.body.report_type =="registration"){
            columns.push("registration as amount") 
        }else if(request.body.report_type =="other"){
            columns.push("lab as amount") 
        }else{
            columns.push("total as amount") 
        }
        console.log(filter);
        await knex("tbl_opd_register").select(columns).where(filter).then((result)=>{
            console.log(result);
            reply.status(200).send(result)
        }).catch((error)=>{
            reply.status(400).send(error)
        })
    })  
}
module.exports = routes