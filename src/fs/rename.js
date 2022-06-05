import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const rename = async () => {
  const oldFilePath = path.resolve(dirname, "files/wrongFilename.txt");
  const newFilePath = path.resolve(dirname, "files/properFilename.md");

  const isOldFileExist = await checkIsFileExist(oldFilePath);
  const isNewFileExist = await checkIsFileExist(newFilePath);
  try {
    if (!isOldFileExist || isNewFileExist) {
      throw new Error("FS operation failed");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  try {
    await fs.rename(oldFilePath, newFilePath);
  } catch (err) {
    console.log(err);
  }
};

rename();
