const Requester = require('gogs-client/request');
const Gogs = require('./gogs');

module.exports = class extends Gogs {
  constructor(opts) {
    super(opts);
    this.client = Requester(opts.server || 'https://try.gitea.io/api/v1');
  }
};
