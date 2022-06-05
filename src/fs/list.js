import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsDirExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const list = async () => {
  const dirPath = path.resolve(dirname, "files");

  try {
    const isDirExist = await checkIsDirExist(dirPath);
    if (!isDirExist) {
      throw new Error("FS operation failed");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  try {
    const files = await fs.readdir(dirPath);
    console.log(files);
  } catch (err) {
    console.error(err.message);
    return;
  }
};

list();
