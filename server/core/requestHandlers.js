var fs = require("fs");
var repo = require('../other/repo');
var github = require('../other/github');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('config/config.json', 'utf8');
var githubHelper = github.githubHelper;

function homePageHander(request, response) {
    console.log("Request handler 'home' was called.");

    var content = fs.readFileSync("client/home.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function devicePageHandler(request, response) {
    console.log("Request handler 'device' was called.");

    var content = fs.readFileSync("client/device.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function getCommitsHandler(request, response) {
    console.log("Request handler 'getCommits' was called.");

    //TODO get codeName from query param
    var codeName = "hammerheadcaf";

    //TODO get date from query param
    var date;

    context.getBaseRepositories(codeName, function (baseRepositories) {
        //TODO function to get commits for some date
        githubHelper.getCommits(baseRepositories[0], function (commits) {
            response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            response.write(JSON.stringify(commits));
            response.end();
        });
    });
}

exports.getHandlers = function () {
    var handlers = {};

    handlers['/'] = homePageHander;

    context.devices.forEach(function (device) {
        var path = '/' + device.codeName;
        handlers[path] = devicePageHandler;
    });

    handlers['/commits'] = getCommitsHandler;

    return handlers;
};
