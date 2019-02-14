const { ProjectsBundle } = require('gitlab');

module.exports = function ({ server, token }) {
  const gitlab = new ProjectsBundle({
    url: server || 'http://gitlab.com',
    token
  });

  return async (ctx, next) => {
    const {
      repo: {
        config_path: filePath, slug: projectId
      },
      build: { after: ref }
    } = ctx.request.body;

    ctx.content = await gitlab.RepositoryFiles.showRaw(projectId, filePath, ref);

    next();
  }
}