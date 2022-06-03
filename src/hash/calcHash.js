import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsFileExist } from "../utils/checkIsPathExist.js";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const calculateHash = async () => {
  const filePath = path.resolve(dirname, "files/fileToCalculateHashFor.txt");

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
    const hashSum = crypto.createHash("sha256");
    const content = await fs.readFile(filePath);
    hashSum.update(content);
    const hex = hashSum.digest("hex");
    return hex;
  } catch (err) {
    console.log(err);
  }
};

console.log(await calculateHash());
