const github = require('./github');
const gitlab = require('./gitlab');
const bitbucket = require('./bitbucket');

module.exports = function (opt) {
  let service;
  if (opt.GITLAB_TOKEN) {
    service = gitlab({
      server: opt.GITLAB_SERVER,
      token: opt.GITLAB_TOKEN
    });
  } else if (opt.BITBUCKET_TOKEN) {
    service = bitbucket({
      server: opt.BITBUCKET_SERVER,
      token: opt.BITBUCKET_TOKEN
    });
  } else {
    service = github({
      server: opt.GITHUB_SERVER,
      token: opt.GITHUB_TOKEN
    });
  }

  return async (ctx, next) => {
    if (!/\.js$/.test(path)) {
      return ctx.throw(404);
    }

    return service(ctx, next);
  }
}