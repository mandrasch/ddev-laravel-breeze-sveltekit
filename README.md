# ddev-laravel-breeze-sveltekit

Monorepo for Laravel Breeze with API-only stack (PHP) + SvelteKit (NodeJS), both within [DDEV](https://ddev.com).

Fork of [lindgr3n/breeze-sveltekit](https://github.com/lindgr3n/breeze-sveltekit).

- Frontend: https://frontend-breeze-sveltekit.ddev.site/ (`frontend/`-folder)
- Backend: https://ddev-laravel-breeze-sveltekit.ddev.site/

Trick is the nginx conf in `.ddev/nginx_full/frontend.conf` and additional hostname in `.ddev/config.yaml`, based on https://www.lullabot.com/articles/nodejs-development-ddev. 

⚠️ Use with caution / no warranty. This is an experiment / prototype, check security before using this on production ⚠️

## Local setup

First time setup steps:

```bash
ddev start
ddev composer install
ddev exec "cp .env.example .env"
ddev artisan key:generate

cd frontend
ddev npm install

ddev ssh
cd frontend/
cp .env.example .env
exit
```

After first install:

```bash
cd frontend
ddev npm run dev
```

Open https://frontend-breeze-sveltekit.ddev.site.ddev.site/, happy development!

## Troubleshooting

-   Check `FRONTEND_URL` in `.env` (see usage in config/sanctum.php) + origin for Vite in frontend/ needs to be correct for API auth, otherwise there will be "CATCHED USER ERROR Unauthorized" errors
-   Always use `ddev npm ...` - never run `npm ...` only on host computer - make sure you're in `frontend/`

## Deployment

This setup should be easily self-hostable via Coolify (or other tools like CapRover, ploi.io, Laravel Forge, etc.). See this guide for example: [Deploy Node.js applications on a VPS using Coolify](https://sreyaj.dev/deploy-nodejs-applications-on-a-vps-using-coolify).

-   [ ] Add tutorial for example .env values --> is ORIGIN & CSRF okay on production/live?

## How was this created?

1. Install Laravel and Breeze via [DDEV quickstart documentation](https://ddev.readthedocs.io/en/stable/users/quickstart/#laravel)

```bash
ddev config --project-type=laravel --docroot=public
ddev start

# Install Laravel
ddev composer create --prefer-dist laravel/laravel:^11

# Install Laravel Breeze
ddev composer require laravel/breeze --dev

# Run breeze installer
# - Select API only stack (!)
# - Selected pest for testing framework
# - Select 'yes' for "run pending migrations?" (!)
ddev artisan breeze:install
```

2. Install SvelteKit

```bash
# Install SvelteKit
# - Selected: skeleton, yes, with JSDoc comments; eslint, prettier, playwright, vitest
ddev npm create svelte@latest frontend

cd frontend
ddev npm install
```

3. Add nginx reverse proxy for SvelteKit

Created `.ddev/nginx_full/frontend.conf` with:

```
server {

  # server_name frontend.ddev-laravel-breeze-sveltekit.ddev.site;
  # fails with nginx: [emerg] could not build server_names_hash, you should increase server_names_hash_bucket_size: 64
  # shortened it for now:
  server_name frontend-breeze-sveltekit.ddev.site;

  location / {
    proxy_pass http://localhost:5173;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  listen 80;
  listen 443 ssl;

  ssl_certificate /etc/ssl/certs/master.crt;
  ssl_certificate_key /etc/ssl/certs/master.key;

  include /etc/nginx/monitoring.conf;

  error_log /dev/stdout info;
  access_log /var/log/nginx/access.log;

  include /etc/nginx/common.d/*.conf;
  include /mnt/ddev_config/nginx/*.conf;
}
```

Thanks to Andy Blum for https://www.lullabot.com/articles/nodejs-development-ddev.

Also added

```yaml
additional_hostnames:
    - frontend-breeze-sveltekit
```

to `.ddev/config.yaml`.

Both changes `ddev restart` afterwards.

4. Forked [lindgr3n/breeze-sveltekit](https://github.com/lindgr3n/breeze-sveltekit)

Copy routes, lib/, app.d.ts and styles from [lindgr3n/breeze-sveltekit](https://github.com/lindgr3n/breeze-sveltekit) and install deps:

```bash
cd frontend/
ddev npm i axios
ddev npm i -D typescript
```

5. Added tailwind

```bash
cd frontend
ddev npm install -D tailwindcss postcss autoprefixer

ddev ssh
cd frontend
npx tailwindcss init -p
exit

ddev npm install -D sass
```

See https://tailwindcss.com/docs/guides/sveltekit for all steps.

6. Add cookie

```bash
cd frontend
ddev npm install cookie
```
