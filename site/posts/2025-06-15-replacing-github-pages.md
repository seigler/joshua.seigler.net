---
title: My Very Own GitHub Pages
slug: my-very-own-github-pages
description: How to self-host Forgejo and automatically serve your web build branches with SSL.
---

I recently started self-hosting [Forgejo](https://forgejo.org/), but I wanted something to replace GitHub pages, which has been very convenient for publishing little website projects. My server runs Debian, so I decided to use [webhook](https://github.com/adnanh/webhook) and [Caddy](https://caddyserver.com/). I'm very happy how it turned out.

## The objective
When I push a `gh-pages` branch to any public repository on my Forgejo instance, the name of the repo is used as a domain name (e.g. [marklink.pages.seigler.net](https://marklink.pages.seigler.net/)) and the branch contents are automatically served with SSL. If I push updates to the branch, they are automatically published. If the branch or repo is deleted, the site is taken down.

## How to do it

### Debian server preparation
In case you don't have a basic server setup routine yet, this is a good start:
- Change the default root password.
- Create a new user and add it to the sudo group. In my examples below the user is `joshua`.
- Use `ssh-copy-id` to install your ssl pubkey for easier login.
- Disable/lock root's password.
- Disable root login over ssh and change the SSL port number. Pick a new port lower than 1024.
- Edit your local `~/.ssh/config` so you don't have to specify the port number every time you connect.
- On the server, install and enable `ufw` and `fail2ban`. In addition to allowing your custom SSL port, be sure to enable ports 80 and 443 with `sudo ufw allow "WWW Full"`.

### Caddy
I usually use nginx, but I wanted to give Caddy a shot, and it has been a great experience. I installed Caddy using the [official instructions](https://caddyserver.com/docs/install).
Here is the Caddyfile I made---you will need to change the domain names and the email. Email could be removed, but it is there so that SSL certificate issuers can contact you if there is a problem with your certificates.

`/etc/caddy/Caddyfile`
```caddy
# Global options block
{
	email you@example.com # <<<< CHANGE THIS <<<<
	on_demand_tls {
		ask http://localhost/check
	}
}

# Webhooks
https://webhooks.subdomain.here.tld { <<<< CHANGE THIS <<<<
	reverse_proxy localhost:9000
}

# Filter for which SSL certs we will create. Prevents abuse.
http://localhost {
	handle /check {
		root * /var/www
		@deny not file /{query.domain}/
		respond @deny 404
	}
}

# This automatically handles upgrading http:// requests with a redirect
https:// {
	tls {
		on_demand
	}
	root /var/www
	rewrite /{host}{uri}
	@forbidden {
		path /.*
	}
	respond @forbidden 404
	file_server
}

# Refer to the Caddy docs for more information:
# https://caddyserver.com/docs/caddyfile

# This config based on information at
# https://caddy.community/t/on-demand-tls-with-dynamic-content-paths/18140
# checked and corrected with `caddy validate`
```

I also took ownership of `/var/www` with `chown -R joshua:joshua /var/www` since the webhooks will run as my login account.

### Webhooks

In my home directory I defined two hook scripts:

`~/webhooks/update-pages.sh`
```bash
#!/bin/bash
# parameter 1 is repo name, parameter 2 is clone url
[[ "$1" == *"/"* ]] && exit 1;
[[ "$1" == *".."* ]] && exit 1;
[[ "$1" == *"*"* ]] && exit 1;
if [ -d "/var/www/$1" ]; then
  cd "/var/www/$1";
  git fetch origin gh-pages;
  git reset --hard origin/gh-pages;
  exit;
fi;
git clone -b gh-pages --single-branch "$2" "$1" || exit 1;
```

`~/webhooks/remove-pages.sh`
```bash
#!/bin/bash
# parameter 1 is repo name
[[ "$1" == *"/"* ]] && exit 1;
[[ "$1" == *".."* ]] && exit 1;
[[ "$1" == *"*"* ]] && exit 1;
[ -d "/var/www/$1" ] || exit 1;
cd "/var/www";
rm -rf "/var/www/$1";
```

To trigger these hooks I am using `webhook` which is in the default Debian repository.

Here are the hook definitions: one for creating/updating a site, and one for deleting. You will need to generate one or two secret values that the server can use to know that the webhook is authorized to run. I used linux command `uuidgen -r` to create mine. Save these values so you can enter them in Forgejo later.

Also make sure to replace your execute-command lines with ones referencing your username and script paths.

`/etc/webhook.conf`
```json
[
  {
    "id": "update-pages",
    "execute-command": "/usr/bin/sudo",
    "pass-arguments-to-command":
    [
      { "source": "string", "name": "-u"},
      { "source": "string", "name": "joshua"},
      { "source": "string", "name": "/home/joshua/webhooks/update-pages.sh"},
      { "source": "payload", "name": "repository.name" },
      { "source": "payload", "name": "repository.clone_url" }
    ],
    "trigger-rule":
    {
      "and":
      [
        {
          "match":
          {
            "type": "payload-hmac-sha256",
            "secret": "(omitted)",
            "parameter":
            {
              "source": "header",
              "name": "X-Forgejo-Signature"
            }
          }
        },
        {
          "match":
          {
            "type": "value",
            "value": "refs/heads/gh-pages",
            "parameter":
            {
              "source": "payload",
              "name": "ref"
            }
          }
        }
      ]
    }
  },
  {
    "id": "remove-pages",
    "execute-command": "/usr/bin/sudo",
    "pass-arguments-to-command":
    [
      { "source": "string", "name": "-u"},
      { "source": "string", "name": "joshua"},
      { "source": "string", "name": "/home/joshua/webhooks/remove-pages.sh"},
      { "source": "payload", "name": "repository.name" }
    ],
    "trigger-rule":
    {
      "and":
      [
        {
          "match":
          {
            "type": "payload-hmac-sha256",
            "secret": "(omitted)",
            "parameter":
            {
              "source": "header",
              "name": "X-Forgejo-Signature"
            }
          }
        }
      ]
    }
  }
]
```

### Forgejo

Forgejo supports running webhooks conditionally triggered by certain conditions.
Under my main user settings I set up each webhook:

#### Update pages

Target URL: https:// _your domain here_ /hooks/update-pages
HTTP Method: `POST` (the default)
POST content type: `application/json` (the default)
Secret: _omitted, use your own_
Trigger on: Push events
Branch filter: `gh-pages`

#### Remove pages

Target URL: https:// _your domain here_ /hooks/remove-pages
HTTP Method: `POST` (the default)
POST content type: `application/json` (the default)
Secret: _omitted, use your own_
Trigger on: Custom Events > Repository > Delete
Branch filter: `gh-pages`

## Conclusion

It works!
Here is [the marklink repo in my Forgejo instance](https://git.apps.seigler.net/joshua/marklink.pages.seigler.net) and [its contents on my Caddy server](https://marklink.pages.seigler.net/).

That repo is just HTML and JS with only a gh-pages branch, but for repos with npm build scripts, I use [gh-pages @ npm](https://www.npmjs.com/package/gh-pages) to push the build to a gh-pages branch and up to the server.

I'm putting off rolling my own CI server, but I imagine that's the next stage here. Stay tuned.