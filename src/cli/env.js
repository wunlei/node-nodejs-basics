//  to run in bash:
//  RSS_name1=value1 RSS_name2=value2 node src/cli/env.js

// run in powershell:
// $env:RSS_name1='value1'; $env:RSS_name2='value2'; node src/cli/env.js

// run in cmd:
// set RSS_name1=value1& set RSS_name2=value2& node src/cli/env.js

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
