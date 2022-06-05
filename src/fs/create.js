import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const create = async () => {
  const content = "I am fresh and young";
  const filePath = path.resolve(dirname, "files/fresh.txt");

  try {
    const isFileExist = await checkIsFileExist(filePath);
    if (isFileExist) {
      throw new Error("FS operation failed");
    }
    await fs.writeFile(filePath, content, { flag: "wx" });
  } catch (err) {
    console.error(err.message);
    return;
  }
};

create();
