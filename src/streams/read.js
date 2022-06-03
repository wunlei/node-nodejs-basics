import fs from "fs";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const read = async () => {
  const filePath = path.resolve(dirname, "files/fileToRead.txt");
  const isFileExist = await checkIsFileExist(filePath);
  try {
    if (!isFileExist) {
      throw new Error("FS operation failed: file doesn't exist");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  const readStream = fs.createReadStream(filePath);
  readStream.setEncoding("utf8");
  readStream.pipe(process.stdout).on("error", (err) => {
    console.error(err);
  });
};

read();
