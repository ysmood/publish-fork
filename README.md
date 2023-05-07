# Overview

If you fork a repo and want to publish the fork version of the package, you have to modify the origin `package.json`,
This tool helps you to modify the `package.json` and restore it after the publish so that you don't lost sync with the origin repo.

## Usage

Run it under the directory of the fork repo:

```bash
npx publish-fork
```

Specify a version to publish:

```bash
npx publish-fork -v 1.2.3
```
