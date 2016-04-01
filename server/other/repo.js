var fs = require('fs');
var request = require('request');

/*
 * Some helpful stuff
 */
var githubRawDataUrl = 'https://raw.githubusercontent.com';

function readConfig(configPath, encoding) {
    var config = JSON.parse(fs.readFileSync(configPath, encoding));

    return config;
}

function readDevices(configPath, encoding) {
    var devices = JSON.parse(fs.readFileSync(configPath, encoding));

    return devices;
}

var RepositoryInfo = function (account, repoName, branch) {
    var githubUrl = 'https://github.com';

    this.account = account;
    this.repoName = repoName;
    this.branch = branch;

    this.getUrl = function () {
        return githubUrl + '/' + this.account + '/' + this.name;
    };
};

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

Context.prototype.getDependenciesRepositories = function getKernelRepository(codeName, callback) {
    var device = this.findDeviceByCodeName(codeName);
    var config = this.config;
    var url = githubRawDataUrl + '/' + config.account + '/' + device.deviceRepository + '/' + config.branch + '/' + device.dependenciesFile;

    request({
        url: url,
        json: true
    }, function (error, response, dependencies) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        /*
         * Get info from device dependencies
         */
        var repositories = [];
        dependencies.forEach(function (dependency) {
            var repositoryName = dependency.repository;
            var branch = (dependency.branch != null) ? dependency.branch : config.branch;
            var repositoryInfo = new RepositoryInfo(config.account, repositoryName, branch);

            repositories.push(repositoryInfo);
        });

        callback(repositories);
    });
};

Context.prototype.getKernelRepository = function getKernelRepository(codeName, callback) {
    this.getDependenciesRepositories(codeName, function (repositories) {
        callback(repositories[0]);
    });
};

Context.prototype.getDeviceRepository = function getDeviceRepository(codeName) {
    var device = this.findDeviceByCodeName(codeName);
    var config = this.config;
    var repositoryInfo = new RepositoryInfo(config.account, device.deviceRepository, config.branch);

    return repositoryInfo;
};

Context.prototype.getBaseRepositories = function (codeName, callback) {
    var currentContext = this;

    this.getDependenciesRepositories(codeName, function (dependenciesRepositories) {
        var deviceRepository = currentContext.getDeviceRepository(codeName);
        var baseRepositories = dependenciesRepositories.concat([deviceRepository]);

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
