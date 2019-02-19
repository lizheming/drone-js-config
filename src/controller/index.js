const vm = require('vm');
const yaml = require('yaml');
module.exports = class extends think.Controller {
  async indexAction() {
    const { name, ...opts } = this.config('vcs');
    const service = this.service(name, opts);

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

    return this.json({ Data: docs });
  }
};
