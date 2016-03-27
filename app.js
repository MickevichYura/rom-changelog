var server = require("./core/server");
var router = require("./core/router");
var requestHandlers = require("./core/requestHandlers");

var serverConfig = server.getServerConfig();
var host = serverConfig.host;
var port = serverConfig.port;
var handlers = requestHandlers.getHandlers();

server.start(host, port, router.route, handlers);
