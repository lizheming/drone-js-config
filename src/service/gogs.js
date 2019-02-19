const util = require('util');
const Requester = require('gogs-client/lib/request');

module.exports = class extends think.Service {
  constructor({ server, token }) {
    super();
    this.client = Requester(server || 'https://try.gogs.io/api/v1');
    this.user = { token };
  }

  async run({
    repo: {
      namespace: username,
      name: reponame,
      config_path: path
    },
    build: {
      after: ref
    }
  }) {
    const url = util.format('/repos/%s/%s/raw/%s/%s', username, reponame, ref, path);
    const resp = await this.client(url, this.user);
    return resp.data;
  }
};
