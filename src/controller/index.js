const vm = require('vm');
const yaml = require('yaml');
module.exports = class extends think.Controller {
  async indexAction() {
    const {
      GITHUB_SERVER,
      GITHUB_TOKEN,
      GITLAB_SERVER,
      GITLAB_TOKEN,
      BITBUCKET_SERVER,
      BITBUCKET_TOKEN
    } = process.env;

    let service;
    if (GITLAB_TOKEN) {
      service = this.service('gitlab', {
        server: GITLAB_SERVER,
        token: GITLAB_TOKEN
      });
    } else if (BITBUCKET_TOKEN) {
      service = this.service('bitbucket', {
        server: BITBUCKET_SERVER,
        token: BITBUCKET_TOKEN
      });
    } else {
      service = this.service('github', {
        server: GITHUB_SERVER,
        token: GITHUB_TOKEN
      });
    }

    const resp = await service.run(this.post());
    if (think.isEmpty(resp)) {
      return this.ctx.throw(204);
    }

    const context = vm.createContext({ module, require });
    let data = vm.runInContext(resp, context);
    if (!Array.isArray(data)) {
      data = [data];
    }
    const docs = data.map(doc => yaml.stringify(doc)).join('\n---\n');

    this.type = 'json';
    this.body = JSON.stringify({
      Data: docs
    });
  }
};
