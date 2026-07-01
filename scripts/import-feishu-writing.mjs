#!/usr/bin/env node
/** @deprecated 请用 npm run import:feishu -- --slug <slug> */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const slug = process.argv[2];
const args = slug ? ["--slug", slug] : ["--all"];
const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "import-feishu.mjs");
const r = spawnSync(process.execPath, [script, ...args], { stdio: "inherit" });
process.exit(r.status ?? 1);
