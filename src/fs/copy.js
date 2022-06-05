import fs from "fs/promises";
import path from "path";
import url from "url";
import { checkIsDirExist } from "../utils/checkIsPathExist.js";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const copy = async () => {
  const origDirName = "files";
  const copyDirName = "files_copy";
  const origDirPath = path.resolve(dirname, origDirName);
  const copyDirPath = path.resolve(dirname, copyDirName);

  try {
    const isOrigDirExist = await checkIsDirExist(origDirPath);
    const isCopyDirExist = await checkIsDirExist(copyDirPath);
    if (isCopyDirExist || !isOrigDirExist) {
      throw new Error("FS operation failed");
    }
  } catch (err) {
    console.error(err.message);
    return;
  }

  const copyFilesInDir = async (origDirPath, copyDirPath) => {
    try {
      await fs.mkdir(copyDirPath);
      const origDirFiles = await fs.readdir(origDirPath, {
        withFileTypes: true,
      });

      for (const file of origDirFiles) {
        const origFilePath = path.resolve(origDirPath, file.name);
        const copyFilePath = path.resolve(copyDirPath, file.name);
        if (file.isFile()) {
          await fs.copyFile(origFilePath, copyFilePath);
        } else {
          const origPath = path.resolve(origDirPath, file.name);
          const copyPath = path.resolve(copyDirPath, file.name);
          await copyFilesInDir(origPath, copyPath);
        }
      }
    } catch (err) {
      console.error(err.message);
      return;
    }
  };

  await copyFilesInDir(origDirPath, copyDirPath);
};

copy();
