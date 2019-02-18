// const httpSignature = require('http-signature');
module.exports = class extends think.Logic {
  indexAction() {
    // const { signature, authorization } = this.ctx.request.header;
    // if (signature && !authorization) {
    //   this.ctx.request.header.authorization = `Signature ${signature}`;
    // }

    // const parsed = httpSignature.parseRequest(this.ctx.request);
    // if (!httpSignature.verifyHMAC(parsed, this.config('secret'))) {
    //   return this.ctx.throw(401);
    // }
  }
};
