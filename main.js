
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
fastify.register(require('fastify-mailer'), {
    defaults: { from: 'Sanchit Oza<sanchithoza@gmail.com>' },
    transport: {
      service:'gmail',
      auth: {
        user: 'sanchithoza@gmail.com',
        pass: 'wrzmdqwsxhrejmhe'
      }
    }
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