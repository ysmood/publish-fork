#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { pkgUpSync } from "pkg-up";
import { execSync } from "child_process";
import arg from "arg";

const { "--version": ver } = arg({
  "--version": String,
  "-v": "--version",
});

const packagePath = pkgUpSync();

const pkg = readFileSync(packagePath);

const packageJson = JSON.parse(pkg);

const user = execSync(`npm whoami`).toString().trim();

const [repo] = execSync(`git remote get-url origin`)
  .toString()
  .trim()
  .match(/[^:/]+\/[^/]+\.git$/);

packageJson.name = `@${user}/${packageJson.name}`;
if (ver) packageJson.version = ver;
packageJson.repository = {
  type: "git",
  url: `https://github.com/${repo}`,
};

writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

execSync("npm publish --access public", { stdio: "inherit" });

writeFileSync(packagePath, pkg);
