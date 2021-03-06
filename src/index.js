const { setArgs, setConfig, setFiles, parseFiles, outputResults } = require("./lib/utils");
const { runTests } = require("./lib/tests");

const defaultConfig = require("./config.json");

main(defaultConfig, process.argv);

async function main(config, argv) {
  // Set args
  argv = setArgs(argv);
  if (config.verbose) {
    console.log("ARGV:");
    console.log(argv);
  }

  // Set config
  config = setConfig(config, argv);
  if (config.verbose) {
    console.log("CONFIG:");
    console.log(config);
  }

  // Set files
  const files = setFiles(config);
  if (config.verbose) {
    console.log("FILES:");
    console.log(files);
  }

  // Set tests
  const tests = parseFiles(config, files);
  if (config.verbose) {
    console.log("TESTS:");
    tests.tests.forEach((test) => {
      console.log(test);
    });
  }

  // // Run tests
  const results = await runTests(config, tests);
  if (config.verbose) {
    console.log("RESULTS:");
    console.log(results);
  }

  // // Output
  outputResults(config, results);
}