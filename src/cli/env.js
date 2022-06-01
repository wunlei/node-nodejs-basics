export const parseEnv = () => {
  const env = process.env;
  const result = [];

  Object.keys(env).forEach((key) => {
    if (/^RSS_/m.test(key)) {
      result.push(`${key}=${env[key]}`);
    }
  });

  console.log(result.join("; "));
};

parseEnv();
