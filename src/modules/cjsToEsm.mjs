import fs from "fs/promises";
import { createServer as createServerHttp } from "http";
import { release, version } from "os";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
import * as c from "./files/c.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

const getJSON = async (filePath) => {
  const isFileExist = await checkIsFileExist(filePath);
  try {
    if (!isFileExist) {
      throw new Error(`FS operation failed: ${filePath} doesn't exist`);
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  try {
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (err) {
    console.log(err);
  }
};

const aPath = path.resolve(__dirname, "files/a.json");
const bPath = path.resolve(__dirname, "files/b.json");

let unknownObject;

if (random > 0.5) {
  unknownObject = await getJSON(aPath);
} else {
  unknownObject = await getJSON(bPath);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

export { unknownObject, createMyServer };
