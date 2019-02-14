const httpSignature = require('http-signature');

module.exports = function (secret) {
  return function signature(ctx, next) {
    const { signature, authorization } = ctx.request.header;
    if (signature && !authorization) {
      ctx.request.header.authorization = `Signature ${signature}`;
    }

    const parsed = httpSignature.parseRequest(ctx.req);
    if (!httpSignature.verifyHMAC(parsed, secret)) {
      return ctx.throw(401);
    }

    next();
  };
}