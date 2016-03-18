var express = require('express');
var router = express.Router();
var myjs = require('../other/entities');

const entitiesHelper = myjs.entitiesHelper;

/* GET home page. */
router.get('/', function (req, res, next) {
    var config = entitiesHelper.getKernelRepository(0);
    res.render('index', {title: 'Express'});

});

module.exports = router;
