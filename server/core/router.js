var fs = require('fs');
var resourceProvider = require('./resourceProvider');

exports.route = function(handlers, pathname, request, response) {
    console.log('Routing processing for ' + pathname);
    if (typeof handlers[pathname] === 'function') {
        handlers[pathname](request, response);
    } else {
        resourceProvider.getLocalResource(pathname, response);
    }
};
