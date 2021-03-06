var fs = require('fs');
var repo = require('../other/repo');
var github = require('../other/github');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('config/config.json', 'utf8');
var githubHelper = github.githubHelper;

function rootPageHander(request, response) {
    console.log('Request handler \'home\' was called.');

    var content = fs.readFileSync('client/index.html');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function getCommitsHandler(request, response) {
    console.log('Request handler \'getCommits\' was called.');

    var query = require('url').parse(request.url, true).query;
    var codeName = query.codeName;
    var date = query.date;//Format yyyy-MM-dd, example '2016-04-20'

    if (!isValidCodeName(codeName) || date === undefined) {
        console.log('Incorrect query for commits API');
        var content = fs.readFileSync('client/error.html');
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();
    } else {
        context.getBaseRepositories(codeName, function (baseRepositories) {
            var count = baseRepositories.length;
            var commitsPackages = [];
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

            baseRepositories.forEach(function (repository) {
                githubHelper.getCommits(repository, date, function (commits) {
                    commitsPackages.push({
                        repoName: repository.repoName,
                        commits: commits
                    });
                    count--;

                    if (count == 0) {
                        response.write(JSON.stringify(commitsPackages));
                        response.end();
                    }
                });
            });
        });
    }
}

function isValidCodeName(codeName) {
    var result = false;

    if(codeName !== undefined) {
        context.devices.forEach(function (device) {
           if(device.codeName === codeName) {
               result = true;
           }
        });
    }

    return result;
}

function getDevices(request, response) {
    var devices = context.devices !== undefined ? context.devices : [];

    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    response.write(JSON.stringify(devices));
    response.end();
}

exports.getHandlers = function () {
    var handlers = {};

    handlers['/'] = rootPageHander;
    handlers['/commits'] = getCommitsHandler;
    handlers['/devices'] = getDevices;

    return handlers;
};
