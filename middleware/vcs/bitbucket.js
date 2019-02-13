const Bitbucket = require('bitbucket');

module.exports = function ({ server, token }) {
  const bitbucket = new Bitbucket({
    baseUrl: server
  }).authenticate({ type: 'token', token });

  return async (ctx, next) => {
    ctx.content = await bitbucket.repositories.getSrc({});
    next();
  }
}