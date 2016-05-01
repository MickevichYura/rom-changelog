var GitHubApi = require('github');

var github = new GitHubApi({
    // required
    version: '3.0.0',
    // optional
    debug: false,
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000,
    headers: {
        'user-agent': 'ROM-changelog'
    }
});

// If api is blocked for anonymous user
var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

github.authenticate({
    type: "oauth",
    key: clientId,
    secret: clientSecret
});

github.getCommits = function (repositoryInfo, date, callback) {
    github.repos.getCommits({
        user: repositoryInfo.account,
        repo: repositoryInfo.repoName,
        sha: repositoryInfo.branch,
        since: date
    }, function (err, res) {
        callback(res);
    });
};

exports.githubHelper = github;
