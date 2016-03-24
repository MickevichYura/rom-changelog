var fs = require('fs');
var request = require('request');

/*
 * Some helpful stuff
 */
var githubRawDataUrl = 'https://raw.githubusercontent.com';
var githubUrl = 'https://github.com';

function readConfig(configPath, encoding) {
    var config = JSON.parse(fs.readFileSync(configPath, encoding));

    return config;
}

function readDevices(configPath, encoding) {
    var devices = JSON.parse(fs.readFileSync(configPath, encoding));

    return devices;
}

/**
 * Main context object
 * @param config
 * @param devices
 * @constructor
 */
var Context = function (config, devices) {
    this.config = config;
    this.devices = devices;
};

Context.prototype.findDeviceByCodeName = function findDeviceByCodeName(codeName) {

    var result = this.devices.filter(function (device) {
        return device.codeName == codeName;
    });

    return result ? result[0] : null; // or undefined

};

Context.prototype.getKernelRepository = function getKernelRepository(codeName, callback) {
    var device = this.findDeviceByCodeName(codeName);
    var config = this.config;
    var branch = config.branch;
    var url = githubRawDataUrl + '/' + config.account + '/' + device.deviceRepo + '/' + branch + '/' + device.dependenciesFile;

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

        var repository = body[0].repository;
        //var kernelRepoUrl = githubUrl + '/' + config.account + '/' + repository;
        var kernelRepoUrl = repository;
        callback(kernelRepoUrl);
    });
};

Context.prototype.getDeviceRepository = function getDeviceRepository(codeName) {
    var device = this.findDeviceByCodeName(codeName);
    //var url = githubUrl + '/' + this.config.account + '/' + device.deviceRepo;
    var url = device.deviceRepo;
    return url;
};

Context.prototype.getBaseRepositories = function (codeName, callback) {
    var currentContext = this;

    this.getKernelRepository(codeName, function (kernelRepository) {
        var deviceRepository = currentContext.getDeviceRepository(codeName);
        var baseRepositories = [kernelRepository, deviceRepository];

        callback(baseRepositories);
    });
};

Context.prototype.getAllRepositories = function (codeName) {
    //TODO
};


//Declare namespace for export
var repoHelper = repoHelper || {};

/**
 * Local context initializer
 * It must be called before the object using
 * @param configPath
 * @param encoding
 */
repoHelper.initLocalContext = function (configPath, encoding) {
    var config = readConfig(configPath, encoding);
    var devices = readDevices(config.devicesConfigPath);
    var context = new Context(config, devices);

    return context;
};

/**
 * Remote context initializer
 * It must be called before the object using
 * @param configUrl
 */
repoHelper.initRemoteContext = function (configUrl) {
    //TODO get context from github repos
};

exports.repoHelper = repoHelper;
