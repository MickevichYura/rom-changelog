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

github.getCommits = function (repositoryInfo, date, callback) {

    github.repos.getCommits({
        user: repositoryInfo.account,
        repo: repositoryInfo.repoName,
        sha: repositoryInfo.branch,
        since: date
    }, function (err, res) {
        //TODO sent not all commit info from api, but use custom CommitInfo with only necessary fields
        callback(res);
    });
};

var CommitInfo = function (author) {
    this.author = author;
    //TODO etc
};

exports.githubHelper = github;