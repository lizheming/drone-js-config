const Octokit = require('@octokit/rest');

module.exports = class extends think.Service {
  constructor({ server, token }) {
    super();
    this.client = Octokit({ baseUrl: server, auth: token });
  }

  async run({
    repo: {
      namespace: owner, name: repo, config_path: path
    },
    build: { after: ref }
  }) {
    const resp = await this.client.repos.getContents({ owner, repo, path, ref });
    return Buffer.from(resp.data.content, 'base64').toString('ascii');
  }
};
