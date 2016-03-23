var express = require('express');
var router = express.Router();
var repo = require('../other/repo');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('config/config.json', 'utf8');

function isRouteExists(route) {
    var result = context.devices.filter(function (device) {
        return device.codeName == route;
    });

    return (result.length != 0 || route == '') ? true : false;
}

/* GET home page. */
router.get('/*', function (req, res, next) {
    context.getBaseRepositories("hammerheadcaf", function (baseRepositories) {
        console.log(baseRepositories)
    });

    var route = req.url.substr(1);

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
