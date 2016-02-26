var GlobalConfig = function(accoutUrl, devicesConfigUrl){
    this.accoutUrl = accoutUrl;
    this.devicesConfigUrl = devicesConfigUrl;
};

var DeviceConfig = function(codeName, dependenciesPath){
    this.codeName = codeName;
    this.dependenciesPath = dependenciesPath;
};

var DeviceInfo = function(repositories) {
    this.repositories = repositories;
    
    this.getAllCommits = function() {
        //TODO
    }
    
    this.getCommits = function(date) {
        //TODO
    }

}

var CommitInfo = function() {
    this.title = title;
    this.project = project;
    //TODO
}