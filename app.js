var server = require("./server/core/server");
var router = require("./server/core/router");
var requestHandlers = require("./server/core/requestHandlers");

var serverConfig = server.getServerConfig();
var host = serverConfig.host;
var port = serverConfig.port;
var handlers = requestHandlers.getHandlers();

server.start(host, port, router.route, handlers);
