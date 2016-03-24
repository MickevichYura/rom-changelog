var express = require('express');
var router = express.Router();
var repo = require('../other/repo');
var github = require('../other/github');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('config/config.json', 'utf8');
var githubHelper = github.githubHelper;

function isRouteExists(route) {
    var result = context.devices.filter(function (device) {
        return device.codeName == route;
    });

    return (result.length != 0 || route == '') ? true : false;
}

/* GET home page. */
router.get('/*', function (req, res, next) {
    var route = req.url.substr(1);

    context.getBaseRepositories(route, function (baseRepositories) {
        console.log(baseRepositories)
        githubHelper.getCommits(baseRepositories[1], "CyanogenMod", function (commits) {
            console.log(commits)
        });
    });

    if (isRouteExists(route)) {
        if (route == '') {
            res.render('index', {title: route, drawerTitle: 'CM changelog'});
        } else {
            res.render('device', {title: route, drawerTitle: route});
        }
    } else {
        var err = new Error('Not Found');
        err.status = 404;

        res.render('error', {
            message: err.message,
            error: err
        });
    }
});

module.exports = router;
