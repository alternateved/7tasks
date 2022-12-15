# 7tasks
Implementation of [7GUIs](https://eugenkiss.github.io/7guis/tasks) tasks in PureScript.

Live preview is available [here](https://alternateved.github.io/7tasks/).

## Setup

### With npm

Install all dependencies of the project:
```bash
npm install
```

Add `node_modules/.bin` to path:
```bash
export PATH="./node_modules/.bin:$PATH"
```

Alternatively, use `direnv`:
```bash
echo "layout node" > .envrc
direnv allow
```

### With Nix

Install Nix following the instructions on the [Nix website](https://nixos.org/download.html).

To enter a development environment, simply open a terminal on the project's root and use below command to get a bash shell:
```bash
nix-shell
```

Otherwise, you can use `direnv` as so:
```bash
echo "use nix" > .envrc
direnv allow
```
and you'll have a working development environment now and whenever you enter this directory again.

## Running

Bundle a project into an executable:
```bash
spago bundle-app
```

Open `index.html` where bundled `index.js` is imported:
```bash
xdg-open index.html
```
Or (on macOS):
```bash
open index.html
```
