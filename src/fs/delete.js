import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const remove = async () => {
  const filePath = path.resolve(dirname, "files/fileToRemove.txt");
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
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
};

remove();
