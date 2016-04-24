var fs = require('fs');
var resourceProvider = require('./resourceProvider');

function route(handle, pathname, request, response) {
    console.log('Routing processing for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        resourceProvider.getLocalResource(pathname, response);
    }
}

exports.route = route;
