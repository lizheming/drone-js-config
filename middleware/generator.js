const vm = require('vm');
const yaml = require('json2yaml');

module.exports = async function generator(ctx) {
  if (!ctx.content) {
    return ctx.throw(204);
  }

  const context = vm.createContext({ module, require });
  let data = vm.runInContext(ctx.content, context);
  if (!Array.isArray(data)) {
    data = [data];
  }
  const docs = data.map(doc => yaml.stringify(doc)).join('\n');
  ctx.set('content-type', 'application/json');
  ctx.body = JSON.stringify({
    Data: docs
  });
}