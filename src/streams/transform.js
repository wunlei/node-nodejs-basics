import { Transform } from "stream";

export const transform = async () => {
  const transformStream = new Transform();
  transformStream._transform = (chunk, encoding, callback) => {
    transformStream.push(
      chunk.toString().split("").reverse().join("").concat("\n")
    );
    callback();
  };

  process.stdin
    .pipe(transformStream)
    .pipe(process.stdout)
    .on("error", (err) => {
      console.error(err);
    });
};

transform();
