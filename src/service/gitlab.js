const { ProjectsBundle } = require('gitlab');

module.exports = class extends think.Service {
  constructor({ server, token }) {
    super();
    this.client = new ProjectsBundle({
      url: server || 'http://gitlab.com',
      token
    });
  }

  async run({
    repo: { config_path: filePath, slug: projectId },
    build: { after: ref }
  }) {
    return this.client.RepositoryFiles.showRaw(projectId, filePath, ref);
  }
};
