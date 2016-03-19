var express = require('express');
var router = express.Router();
var repo = require('../other/repo');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('D:/Work_tree/rom-changelog/config/config.json', 'utf8');

function isRouteExists(route) {
    var result = context.devices.filter(function (device) {
        return device.codeName == route;
    });

    return (result.length != 0) ? true : false;
}

/* GET home page. */
router.get('/*', function (req, res, next) {
    context.getBaseRepositories("hammerheadcaf", function (baseRepositories) {
        console.log(baseRepositories)
    });

    var route = req.url.substr(1);

    if (isRouteExists(route)) {
        res.render('index', {title: route, drawerTitle: route});
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
