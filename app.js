const fastify = require("./main");
const port = process.env.PORT || 9000;
console.log(port);
fastify.listen(port, (err) => {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
});