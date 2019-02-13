const { debuglog } = require('util');
const createServer = require('./server');
const signature = require('./middleware/signature');
const VCS = require('./middleware/vcs/github');
const generator = require('./middleware/generator');

const debug = debuglog('drone-js-config');

let {
  PLUGIN_ADDRESS,
  PLUGIN_SECRET,
  GITHUB_TOKEN,
  GITHUB_SERVER
} = process.env;


if (!PLUGIN_ADDRESS) {
  PLUGIN_ADDRESS = 3000;
}
if (!PLUGIN_SECRET) {
  debug('missing secret key');
}
if (!GITHUB_TOKEN) {
  debug('missing github token');
}

const server = createServer([
  signature(PLUGIN_SECRET),
  VCS({ server: GITHUB_SERVER, token: GITHUB_TOKEN }),
  generator
]);
server.listen(PLUGIN_ADDRESS);