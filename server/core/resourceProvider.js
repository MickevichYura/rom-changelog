var fs = require('fs');

exports.getLocalResource = function (resourcePath, response) {
    var publicFolderPath = "client/public/";
    var fullPath = publicFolderPath + resourcePath;

    fs.readFile(fullPath, function (err, file) {
        if (!err) {
            response.writeHeader(200, {
                "Content-Type": "text/" + resourcePath.substring(resourcePath.lastIndexOf('.') + 1)
            });
            response.write(file);
            response.end();
        } else {
            console.log("No request handler found for " + resourcePath);
            var content = fs.readFileSync("client/error.html");
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
        }
    });
};
