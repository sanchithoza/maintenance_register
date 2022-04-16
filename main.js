
const fastify = require("fastify")();
const path = require('path')

// first plugin
fastify.register(require('fastify-cors'), {
    origin: true
})
fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-formbody'))

fastify.get('/maintenance/', function(req, reply) {
        //reply.sendFile(__dirname+'/client/index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
        reply.send("hello maintenance root")
    })
    fastify.get('/', function(req, reply) {
      //reply.sendFile(__dirname+'/client/index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
      reply.send("hello all")
  })
    //database connection
    //routes
fastify.register(require('./routes/maintenance_request'), { prefix: '/maintenance/request' });
fastify.register(require('./routes/master'), { prefix: '/maintenance/master' });
fastify.register(require('./routes/user'), { prefix: '/maintenance/user' });  
//fastify.register(require('./routes/opd'), { prefix: '/maintenance/opd' });  

// Declare a route
//Funtion To run the server
module.exports = fastify