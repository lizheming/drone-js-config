const { ProjectsBundle } = require('gitlab');

module.exports = function ({ server, token }) {
  const gitlab = new ProjectsBundle({
    url: server || 'http://gitlab.com',
    token
  });

  return async (ctx, next) => {
    const {
      Repo: { Slug: projectId, Config: filePath },
      Build: { After: ref }
    } = ctx.request.body;

    ctx.content = await gitlab.RepositoryFiles.showRaw(projectId, filePath, ref);

    next();
  }
}