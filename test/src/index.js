const vars = {
    mongo: "mongodb+srv://rediska:Northwind2021@cluster.0gnxi.mongodb.net/infochecker?retryWrites=true&w=majority"
}
const build = require("./app.js");

const server = build(vars);
server.listen(8080, (error, address) => {
   server.log.info(`server listening on ${address}`)
})


module.exports = server;

