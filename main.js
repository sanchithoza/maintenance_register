
const fastify = require("fastify")();
const path = require('path')

// first plugin
fastify.register(require('fastify-cors'), {
    origin: true
})
/*fastify.register(require('fastify-mailer'), {
    defaults: { from: 'Sanchit Oza<sanchithoza@gmail.com>' },
    transport: {
      service:'gmail',
      auth: {
        user: 'sanchithoza@gmail.com',
        pass: 'wrzmdqwsxhrejmhe'
      }
    }
  })
  fastify.get('/',(request,reply)=>{
    reply.status(200).send("welcome")
  })
  fastify.get('/send-mail', (request, reply) => {
    const { mailer } = fastify
  
    mailer.sendMail({
      to: 'sanchithoza@live.com',
      subject: 'example',
      text: 'hello world !'
    }, (errors, info) => {
      if (errors) {
        fastify.log.error(errors)
  console.log(errors);
        reply.status(500).send({
            status: 'ok',
            message: 'Email successfully sent',
            info: {
              from: info.from, // John Doe <john.doe@example.tld>
              to: info.to, // ['someone@example.tld']
            }
          })
        return {
          status: 'error',
          message: 'Something went wrong'
        }
      }
      console.log({
        status: 'ok',
        message: 'Email successfully sent',
        info: {
          from: info.from, // John Doe <john.doe@example.tld>
          to: info.to, // ['someone@example.tld']
        }
      });
      reply.status(200).reply({
        status: 'ok',
        message: 'Email successfully sent',
        info: {
          from: info.from, // John Doe <john.doe@example.tld>
          to: info.to, // ['someone@example.tld']
        }
      })
      return {
        status: 'ok',
        message: 'Email successfully sent',
        info: {
          from: info.from, // John Doe <john.doe@example.tld>
          to: info.to, // ['someone@example.tld']
        }
      }
    })
  })*/
fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-formbody'))
fastify.get('/maintenance/', function(req, reply) {
        //reply.sendFile(__dirname+'/client/index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
        reply.send("hello maintenance root")
    })
    fastify.get('/', function(req, reply) {
      //reply.sendFile(__dirname+'/client/index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
      reply.send("hello root")
  })
    //database connection
    //routes
fastify.register(require('./routes/maintenance_request'), { prefix: '/maintenence/request' });
fastify.register(require('./routes/master'), { prefix: '/maintenence/master' });
fastify.register(require('./routes/user'), { prefix: '/maintenence/user' });  
fastify.register(require('./routes/opd'), { prefix: '/maintenence/opd' });  


// Declare a route
//Funtion To run the server
module.exports = fastify