import fs from "fs";
import path from "path";
import url from "url";
import zlib from "zlib";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const compress = async () => {
  const filePath = path.resolve(dirname, "files/fileToCompress.txt");
  const gzPath = path.resolve(dirname, "files/archive.gz");

  const isFileExist = await checkIsFileExist(filePath);
  const isGzExist = await checkIsFileExist(gzPath);

  try {
    if (!isFileExist) {
      throw new Error("FS operation failed: file doesn't exist");
    } else if (isGzExist) {
      throw new Error("FS operation failed: file already exists");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  const readable = fs.createReadStream(filePath);
  const writable = fs.createWriteStream(gzPath);
  const gZip = zlib.createGzip();
  readable
    .pipe(gZip)
    .pipe(writable)
    .on("error", (err) => {
      console.error(err);
    });
};

compress();
