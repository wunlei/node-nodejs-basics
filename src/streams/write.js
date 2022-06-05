import fs from "fs";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const write = async () => {
  const filePath = path.resolve(dirname, "files/fileToWrite.txt");
  const isFileExist = await checkIsFileExist(filePath);
  try {
    if (!isFileExist) {
      throw new Error("FS operation failed: file doesn't exist");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  const writeStream = fs.createWriteStream(filePath);
  process.stdin.pipe(writeStream).on("error", (err) => {
    console.error(err);
  });
};

write();
