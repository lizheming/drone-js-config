# drone-js-config

![Docker Pulls](https://img.shields.io/docker/pulls/lizheming/drone-js.svg?logo=Docker&logoColor=white&style=flat)
[![](https://images.microbadger.com/badges/image/lizheming/drone-js.svg)](https://microbadger.com/images/lizheming/drone-js)

Drone extensions to support javascript configuration files, just like the following content. We support both github, gitlab, bitbucket, gogs and gitea.

```js
//.drone.js
module.exports = [
  {
    kind: 'pipeline',
    name: 'default',

    steps: [
      {
        name: 'echo',
        image: 'alpine',
        commands: [
          'echo "Hello World!"'
        ]
      }
    ]
  }
];
```

## HOW TO USE

1. Generate a shared secret key. This key is used to secure communication between the server and agents. The secret should be 32 bytes.
    ```bash
    $ openssl rand -hex 16
    558f3eacbfd5928157cbfe34823ab921
    ```

2. Generate a GitHub/Gitlab/Bitbucket/Gogs/Gitea access token. This token is used to fetch the jsonnet configuration file from the repository. This token must therefore have sufficient permission to do so. Here is an example where to generate access token: 
    - Github: <https://github.com/settings/tokens>
    - Gitlab: <https://gitlab.com/profile/personal_access_tokens>
    - Bitbucket: <https://bitbucket.org/account/user/:username/app-passwords>
    - Gogs: <https://try.gogs.io/user/settings/applications>
    - Gitea: <https://try.gitea.io/user/settings/applications>

3. Install the plugin by pulling and running the container.
    ```bash
    docker run \
      -p 3000:3000 \
      -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
      -e GITHUB_TOKEN=GITHUB8168c98304b \
      lizheming/drone-js
    ```
4. Once the extension is installed and running, you need to modify your Drone server configuration and provide the extension endpoint and shared secret.
    ```
    -e DRONE_YAML_ENDPOINT=http://...
    -e DRONE_YAML_SECRET=558f3eacbfd5928157cbfe34823ab921
    ```
5. Rename `Configuration` end with `.js` such as `.drone.js`.

    ![](https://p.ssl.qhimg.com/t0139bb7e03f6f31cf3.png)

6. At last, you just add `.drone.js` file to your repo. It should exports an array drone config object.
    ```js
    //.drone.js
    module.exports = [
      {
        kind: 'pipeline',
        name: 'default',

        steps: [
          {
            name: 'echo',
            image: 'alpine',
            commands: [
              'echo "Hello World!"'
            ]
          }
        ]
      }
    ];
    ```

## Settings

We take support for all VCS which drone supports, not only GitHub but also GitLab, Bitbucket, Gogs and Gitea. Let we have a look how config in different VCS.

### Github

You should pass `GITHUB_TOKEN` to container, if you're using GitHub Enterprise, you should pass `GITHUB_SERVER` to custom server url.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITHUB_SERVER=https://api.github.com
  -e GITHUB_TOKEN=GITHUB8168c98304b \
  lizheming/drone-js
```

### Gitlab

You should pass `GITLAB_TOKEN` to container, if you're self hosting GitLab, you should also pass `GITLAB_SERVER` to custom server url.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITLAB_SERVER=https://gitlab.com/api/v4
  -e GITLAB_TOKEN=GITLAB8168c98304b \
  lizheming/drone-js
```
### Bitbucket

You should pass `BITBUCKET_USERNAME` and `BITBUCKET_APP_PASSWORD` to container, if you're using Bitbucket Server, you should also pass `BITBUCKET_SERVER` to set server url.


```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e BITBUCKET_SERVER=https://api.bitbucket.org/2.0
  -e BITBUCKET_USERNAME=lizheming \
  -e BITBUCKET_APP_PASSWORD=BITBUCKET8168c98304b \
  lizheming/drone-js
```

BTW, if your bitbucket server support personal access token, you can pass it without bitbucket username.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e BITBUCKET_SERVER=https://api.bitbucket.org/2.0
  -e BITBUCKET_TOKEN=BITBUCKET8168c98304b \
  lizheming/drone-js
```

You can also just pass `BITBUCKET_USERNAME` and `BITBUCKET_PASSWORD`, but it'll fail if your account open two step authencation.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e BITBUCKET_SERVER=https://api.bitbucket.org/2.0
  -e BITBUCKET_USERNAME=lizheming \
  -e BITBUCKET_PASSWORD=xxxx \
  lizheming/drone-js
```

### Gogs/Gitea

You should pass `GOGS_TOKEN` or `GITEA_TOKEN` to container, if you're self hosting Gogs/Gitea, you should also pass `GOGS_SERVER` or `GITEA_SERVER` to custom server url.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GOGS_SERVER=https://try.gogs.io/api/v1 \
  -e GOGS_TOKEN=GOGS8168c98304b \
  lizheming/drone-js
```

## Configuration

### PLUGIN_SECRET

The server and extension authenticate http requests using a shared secret. You must provide the shared secret to both the extenion and the server.

```bash
docker run \
  -p 3000:3000 \
  -e PLUGIN_SECRET=558f3eacbfd5928157cbfe34823ab921 \
  -e GITHUB_TOKEN=GITHUB8168c98304b \
  lizheming/drone-js
```

And it should be same with `DRONE_YAML_SECRET`.

## Environment

- `PLUGIN_ADDRESS`
- `PLUGIN_SECRET`
- `GITHUB_SERVER`
- `GITHUB_TOKEN`
- `GITLAB_SERVER`
- `GITLAB_TOKEN`
- `BITBUCKET_SERVER`
- `BITBUCKET_USERNAME`
- `BITBUCKET_PASSWORD`
- `BITBUCKET_APP_PASSWORD`
- `GOGS_SERVER`
- `GOGS_TOKEN`
- `GITEA_SERVER`
- `GITEA_TOKEN`