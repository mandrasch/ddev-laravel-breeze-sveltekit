
SvelteKit + Laravel v11 Breeze (API) combined within a DDEV project.

- fork of https://github.com/lindgr3n/breeze-sveltekit
- 

## Local setup



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

