
const {
  PLUGIN_ADDRESS,
  PLUGIN_SECRET,
  GITHUB_SERVER,
  GITHUB_TOKEN,
  GITLAB_SERVER,
  GITLAB_TOKEN,
  BITBUCKET_SERVER,
  BITBUCKET_TOKEN,
  BITBUCKET_USERNAME,
  BITBUCKET_PASSWORD,
  BITBUCKET_APP_PASSWORD,
  GOGS_SERVER,
  GOGS_USERNAME,
  GOGS_PASSWORD,
  GITEA_SERVER,
  GITEA_USERNAME,
  GITEA_PASSWORD
} = process.env;

if (!PLUGIN_SECRET) {
  throw new Error('missing secret key');
}

let vcs;
if (GITLAB_TOKEN) {
  vcs = {
    name: 'gitlab',
    server: GITLAB_SERVER,
    token: GITLAB_TOKEN
  };
} else if (BITBUCKET_TOKEN || BITBUCKET_PASSWORD || BITBUCKET_APP_PASSWORD) {
  vcs = {
    name: 'bitbucket',
    server: BITBUCKET_SERVER,
    token: BITBUCKET_TOKEN,
    username: BITBUCKET_USERNAME,
    password: BITBUCKET_PASSWORD,
    app_password: BITBUCKET_APP_PASSWORD
  };
} else if (GOGS_PASSWORD) {
  vcs = {
    name: 'gogs',
    server: GOGS_SERVER,
    username: GOGS_USERNAME,
    password: GOGS_PASSWORD
  };
} else if (GITEA_PASSWORD) {
  vcs = {
    name: 'gitea',
    server: GITEA_SERVER,
    username: GITEA_USERNAME,
    password: GITEA_PASSWORD
  };
} else {
  vcs = {
    name: 'github',
    server: GITHUB_SERVER,
    token: GITHUB_TOKEN
  };
}

module.exports = {
  workers: 1,
  port: PLUGIN_ADDRESS || 3000,
  vcs,
  secret: PLUGIN_SECRET
};
