var fs = require('fs');
var request = require('request');

/*
 * Some helpful stuff
 */

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
    const device = this.findDeviceByCodeName(codeName);
    const url = device.dependenciesUrl;
    const config = this.config;

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

        const repository = body[0].repository;
        const kernelRepoUrl = config.accountUrl + '/' + repository;

        callback(kernelRepoUrl);
    });
};

Context.prototype.getDeviceRepository = function getDeviceRepository(codeName) {
    const device = this.findDeviceByCodeName(codeName);
    const deviceRepo = device.deviceRepoUrl;

    return deviceRepo;
};

Context.prototype.getBaseRepositories = function (codeName, callback) {
    const currentContext = this;

    this.getKernelRepository(codeName, function (kernelRepository) {
        const deviceRepository = currentContext.getDeviceRepository(codeName);
        const baseRepositories = [kernelRepository, deviceRepository];

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
    const config = readConfig(configPath, encoding);
    const devices = readDevices(config.devicesConfigPath);
    const context = new Context(config, devices);

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
