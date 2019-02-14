const { debuglog } = require('util');
const createServer = require('./server');
const signature = require('./middleware/signature');
const VCS = require('./middleware/vcs');
const generator = require('./middleware/generator');

const debug = debuglog('drone-js-config');

let {
  PLUGIN_ADDRESS,
  PLUGIN_SECRET,
  GITHUB_TOKEN,
  GITHUB_SERVER,
  GITLAB_TOKEN,
  GITLAB_SERVER,
  BITBUCKET_TOKEN,
  BITBUCKET_SERVER
} = process.env;


if (!PLUGIN_ADDRESS) {
  PLUGIN_ADDRESS = 3000;
}
if (!PLUGIN_SECRET) {
  debug('missing secret key');
}

const server = createServer([
  signature(PLUGIN_SECRET),
  VCS({
    GITHUB_SERVER,
    GITHUB_TOKEN,
    GITLAB_SERVER,
    GITLAB_TOKEN,
    BITBUCKET_SERVER,
    BITBUCKET_TOKEN
  }),
  generator
]);
server.listen(PLUGIN_ADDRESS);