const Octokit = require('@octokit/rest');

module.exports = function ({ server, token }) {
  const octokit = Octokit({
    baseUrl: server || 'api.github.com',
    auth: token
  });

  return async function github(ctx, next) {
    const {
      Repo: { Namespace: owner, Name: repo, Config: path },
      Build: { After: ref }
    } = ctx.query;

    ctx.content = await octokit.repos.getContents({ owner, repo, path, ref });

    next();
  }
}