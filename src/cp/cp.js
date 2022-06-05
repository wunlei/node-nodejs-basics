import { fork } from "child_process";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

export const spawnChildProcess = async (args) => {
  const filePath = path.resolve(dirname, "files/script.js");
  fork(filePath, [...args], {
    stdio: [process.stdin, process.stdout, process.stderr, "ipc"],
  });
};

spawnChildProcess(args);
