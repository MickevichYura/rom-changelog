var fs = require('fs');
var request = require('request');

var GlobalConfig = function (accountUrl, devicesConfigUrl) {
    this.accountUrl = accountUrl;
    this.devicesConfigUrl = devicesConfigUrl;
};

var DeviceConfig = function (codeName, dependenciesUrl) {
    this.codeName = codeName;
    this.dependenciesUrl = dependenciesUrl;
};

var DeviceInfo = function (repositories) {
    this.repositories = repositories;

    this.getAllCommits = function () {
        //TODO
    }

    this.getCommits = function (date) {
        //TODO
    }

};

var CommitInfo = function () {
    this.title = title;
    this.project = project;
    //TODO
};


var entitiesHelper = entitiesHelper || {};

entitiesHelper.readConfig = function () {
    var config = JSON.parse(fs.readFileSync('D:/Work_tree/rom-changelog/config/globalConfig.json', 'utf8'));

    return config;
}

entitiesHelper.readDevices = function () {
    var devices = JSON.parse(fs.readFileSync('D:/Work_tree/rom-changelog/config/devices.json', 'utf8'));

    return devices;
}

entitiesHelper.getKernelRepository = function (index) {
    const config = entitiesHelper.readConfig();
    const devices = entitiesHelper.readDevices();
    const url = devices[index].dependenciesUrl;
    var repository;


    request({
        url: url,
        json: true
    }, function (error, response, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        repository = body[0].repository;
    });

    const kernelRepoUrl = config.accountUrl + '/' + repository;

    console.log(kernelRepoUrl);}


exports.entitiesHelper = entitiesHelper;
