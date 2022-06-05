import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const read = async () => {
  const filePath = path.resolve(dirname, "files/fileToRead.txt");

  const isFileExist = await checkIsFileExist(filePath);

  try {
    if (!isFileExist) {
      throw new Error("FS operation failed");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  try {
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    console.log(content);
  } catch (err) {
    console.log(err);
  }
};

read();
