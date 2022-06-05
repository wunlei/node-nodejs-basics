import { Worker } from "worker_threads";
import path from "path";
import url from "url";
import os from "os";
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const performCalculations = async () => {
  const filePath = path.resolve(dirname, "worker.js");
  const cpuCount = os.cpus().length;

  const promiseArray = [];

  for (let i = 0; i < cpuCount; i += 1) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(filePath, {
        workerData: 10 + i,
      });
      worker.on("message", (message) => {
        resolve({ status: "resolved", data: message });
      });
      worker.on("error", (error) => {
        reject({ status: "rejected", data: null });
      });
    });

    promiseArray.push(promise);
  }
  const result = await Promise.all(promiseArray);

  return result;
};

console.log(await performCalculations());
