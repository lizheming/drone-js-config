const vm = require('vm');
const yaml = require('json2yaml');

module.exports = async function (ctx) {
  if (!ctx.content) {
    return;
  }

  const data = vm.runInContext(ctx.content, {});
  const docs = yaml.stringify(data);

  ctx.setHeader('content-type', 'application/json');
  ctx.body = JSON.stringify({
    Data: Array.isArray(docs) ? docs.join('\n') : docs
  });

  next();
}