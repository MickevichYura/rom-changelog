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

github.getCommits = function (repoName, account, callback) {

    github.repos.getCommits({
        user: account,
        repo: repoName
    }, function (err, res) {
        callback(res);
    });
};

exports.githubHelper = github;