import fs from "fs";
import path from "path";
import url from "url";
import zlib from "zlib";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const decompress = async () => {
  const filePath = path.resolve(dirname, "files/fileToCompress.txt");
  const gzPath = path.resolve(dirname, "files/archive.gz");
  const isFileExist = await checkIsFileExist(filePath);
  const isGzExist = await checkIsFileExist(gzPath);

  try {
    if (isFileExist) {
      throw new Error("FS operation failed: file already exists");
    } else if (!isGzExist) {
      throw new Error("FS operation failed: file doesn't exist");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  const readable = fs.createReadStream(gzPath);
  const writable = fs.createWriteStream(filePath);
  const gZip = zlib.createGunzip();
  readable
    .pipe(gZip)
    .pipe(writable)
    .on("error", (err) => {
      console.error(err);
    });
};

decompress();
