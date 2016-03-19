var express = require('express');
var router = express.Router();
var repo = require('../other/repo');

const repoHelper = repo.repoHelper;
const context = repoHelper.initLocalContext('D:/Work_tree/rom-changelog/config/config.json', 'utf8');

/* GET home page. */
router.get('/', function (req, res, next) {
    context.getBaseRepositories("hammerheadcaf", function (baseRepositories) {
        console.log(baseRepositories)
    });
    res.render('index', {title: 'Express'});
});

module.exports = router;
