const github = require('./github');
const gitlab = require('./gitlab');
const bitbucket = require('./bitbucket');

const services = { github, gitlab, bitbucket };
module.exports = function (opt) {
  let vcs = 'github';
  let token = opt.GITHUB_TOKEN;
  if (opt.GITLAB_TOKEN) {
    vcs = 'gitlab';
    token = opt.GITLAB_TOKEN;
  } else if (opt.BITBUCKET_TOKEN) {
    vcs = 'bitbucket';
    token = opt.BITBUCKET_TOKEN;
  }

  vcs = services[vcs]({
    server: opt[vcs.toUpperCase() + '_SERVER'],
    token
  });

  return async (ctx, next) => {
    if (!/\.js$/.test(path)) {
      return ctx.throw(404);
    }

    return vcs(ctx, next);
  }
}