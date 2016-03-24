var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: false,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
        "user-agent": "ROM-changelog"
    }
});

github.getCommits = function (repositoryInfo, callback) {

    github.repos.getCommits({
        user: repositoryInfo.account,
        repo: repositoryInfo.repoName
        //TODO get commits from custom branch (repositoryInfo.branch)
    }, function (err, res) {
        callback(res);
    });
};

exports.githubHelper = github;