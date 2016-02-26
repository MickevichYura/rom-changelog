var GlobalConfig = function(accountUrl, devicesConfigUrl){
    this.accountUrl = accountUrl;
    this.devicesConfigUrl = devicesConfigUrl;
};

var DeviceConfig = function(codeName, dependenciesUrl){
    this.codeName = codeName;
    this.dependenciesUrl = dependenciesUrl;
};

var DeviceInfo = function(repositories) {
    this.repositories = repositories;
    
    this.getAllCommits = function() {
        //TODO
    }
    
    this.getCommits = function(date) {
        //TODO
    }

};

var CommitInfo = function() {
    this.title = title;
    this.project = project;
    //TODO
};