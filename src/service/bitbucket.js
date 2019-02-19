const Bitbucket = require('bitbucket');
module.exports = class extends think.Service {
  constructor({ server, token, app_password, username, password }) {
    super();
    this.client = new Bitbucket({
      baseUrl: server || 'https://api.bitbucket.org/2.0'
    });

    if (username && password) {
      this.client.authenticate({
        type: 'basic', username, password
      });
    } else if (app_password) {
      this.client.authenticate({
        type: 'apppassword', username, password: app_password
      });
    } else {
      this.client.authenticate({ type: 'token', token });
    }
  }

  async run({
    repo: {
      namespace: username,
      name: repo_slug,
      config_path: path
    },
    build: {
      after: node
    }
  }) {
    const resp = await this.client.repositories.getSrc({ username, repo_slug, node, path });
    return resp.data;
  }
};
