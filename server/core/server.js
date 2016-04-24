var http = require('http');
var url = require('url');

/*
 * Default server configuration
 */
var defaultHost = '127.0.0.1';
var defaultPort = 3000;

var ServerConfig = function (host, port) {
    this.host = host;
    this.port = port;
};

exports.getServerConfig = function () {
    var host = defaultHost;
    var port = defaultPort;
    var args = process.argv;

    switch (args.length) {
        case 3:
        {
            port = isNaN(args[3]) ? defaultPort : args[3];
            break;
        }
        case 4:
        {
            host = args[3];
            port = isNaN(args[4]) ? defaultPort : args[4];
            break;
        }
    }

    return new ServerConfig(host, port);
};

exports.start = function (host, port, route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        route(handle, pathname, request, response);
    }

    http.createServer(onRequest).listen(port, host);
    console.log('Server has started and listening on : ' + host + ':' + port);

};
