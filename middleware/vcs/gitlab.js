const { ProjectsBundle } = require('gitlab');

module.exports = function ({ server, token }) {
  const gitlab = new ProjectsBundle({
    url: server || 'http://gitlab.com',
    token
  });

  return async (ctx, next) => {
    const {
      Repo: { Namespace, Name, Config: filePath },
      Build: { After: ref }
    } = ctx.query;
    const projectId = Namespace + '/' + Name;

    ctx.content = await gitlab.RepositoryFiles.showRaw(projectId, filePath, ref);

    next();
  }
}