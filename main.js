const fastify = require("fastify")();
const path = require('path')
const fastifyStatic = require('fastify-static')

// first plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'client'),
    prefix: '/client/', // optional: default '/'
})
fastify.register(require('fastify-cors'), {
    origin: true
})

//fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-formbody'))
//fastify.get('/', function(req, reply) {
    //    reply.sendFile('client/index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
        //reply.send("hello")
  //  })
    //database connection
    //routes
fastify.register(require('./client/ui_route'), { prefix: '/ui' })
fastify.register(require('./routes/maintenance_request'), { prefix: '/request' });
fastify.register(require('./routes/master'), { prefix: '/master' });
fastify.register(require('./routes/user'), { prefix: '/user' });


// Declare a route
//Funtion To run the server
module.exports = fastify