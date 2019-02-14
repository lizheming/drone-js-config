# drone-js-config

Drone extensions to support javascript configuration files.

## Installation

The extension is distributed as a Docker container. We install the plugin by pulling and running the container.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITHUB_TOKEN=GITHUB8168c98304b \
  lizheming/drone-js
```

### PLUGIN_SECRET
The server and extension authenticate http requests using a shared secret. You must provide the shared secret to both the extenion and the server.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITHUB_TOKEN=GITHUB8168c98304b \
  lizheming/drone-js
```

### GITHUB_TOKEN
The extensions communicates with GitHub using the API. You must provide an API token to authorize requests. If you are using GitHub Enterprise you must also provide your GitHub server address.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITHUB_SERVER=https://github.company.com/api/v3/ \
  -e GITHUB_TOKEN=GITHUB8168c98304b \
  lizheming/drone-js
```

### GITLAB_TOKEN

The extensions communicates with Gitlab using the API. You must provide an API token to authorize requests. 

```bash
docker run \
  -p 3000:3000
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITLAB_SERVER=https://gitlab.com
  -e GITLAB_TOKEN=GITLAB8168c98304b \
  lizheming/drone-js
```

### Configuration
Once the extension is installed and running, you need to modify your Drone server configuration and provide the extension endpoint and shared secret.

```
-e DRONE_YAML_ENDPOINT=http://...
-e DRONE_YAML_SECRET=558f3eacbfd5928157cbfe34823ab921
```

## Environment

- `PLUGIN_ADRESS`
- `PLUGIN_SECRET`
- `GITHUB_SERVER`
- `GITHUB_TOKEN`
- `GITLAB_SERVER`
- `GITLAB_TOKEN`
- `BITBUCKET_SERVER`
- `BITBUCKET_TOKEN`