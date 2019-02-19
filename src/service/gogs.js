const util = require('util');
const Requester = require('gogs-client/request');

module.exports = class extends think.Service {
  constructor({ server, username, password }) {
    super();
    this.client = Requester(server || 'https://try.gogs.io/api/v1');
    this.user = { username, password };
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
    return this.client(url, this.user);
  }
};
