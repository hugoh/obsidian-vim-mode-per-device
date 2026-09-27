import { argv, exit } from "node:process";

const version = argv[2] ?? "";
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("usage: bun run bump <major.minor.patch>");
  exit(1);
}

async function updateJson(
  path: string,
  update: (data: Record<string, unknown>) => void,
) {
  const data = (await Bun.file(path).json()) as Record<string, unknown>;
  update(data);
  await Bun.write(path, `${JSON.stringify(data, null, 2)}\n`);
}

let minAppVersion = "";
await updateJson("manifest.json", (manifest) => {
  manifest.version = version;
  minAppVersion = String(manifest.minAppVersion);
});
await updateJson("package.json", (pkg) => {
  pkg.version = version;
});
await updateJson("versions.json", (versions) => {
  versions[version] = minAppVersion;
});

console.log(`bumped to ${version} (minAppVersion ${minAppVersion})`);
