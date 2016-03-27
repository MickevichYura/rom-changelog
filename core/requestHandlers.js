var fs = require("fs");
var repo = require('../other/repo');
var github = require('../other/github');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('config/config.json', 'utf8');
var githubHelper = github.githubHelper;

function homePageHander(request, response) {
    console.log("Request handler 'home' was called.");

    var content = fs.readFileSync("./views/home.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function devicePageHandler(request, response) {
    console.log("Request handler 'device' was called.");

    var codeName = request.url.substr(1);

    context.getBaseRepositories(codeName, function (baseRepositories) {
        console.log(baseRepositories);
        githubHelper.getCommits(baseRepositories[0], function (commits) {
            console.log(commits)
        });
    });

    var content = fs.readFileSync("./views/device.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

exports.getHandlers = function () {
    var handlers = {};

    handlers['/'] = homePageHander;

    context.devices.forEach(function (device) {
        var path = '/' + device.codeName;
        handlers[path] = devicePageHandler;
    });

    return handlers;
};