const util = require("util");
const exec = util.promisify(
  require("child_process").exec
);


const extractPackages = (text) => {
  return text.trim().split("\n\n");
};


const extractPackage = (text) => {
  return text.split("\n").reduce((prev, curr) => {
    const [key, ..._value] = curr.split(": ");
    const value = _value.join(": ");

    return {
      ...prev,
      [key]: value,
    };
  }, {});
}


const getPackagesText = async (path) => {
  const result = await exec(`dpkg-scanpackages -m ${path}`);

  return result.stdout;
}


const getPackages = async (path) => {
  const packagesResult = await getPackagesText(path);
  const packagesTexts = extractPackages(packagesResult);
  const packages = packagesTexts.map(extractPackage);

  return packages;
};


exports.exec = exec;
exports.getPackagesText = getPackagesText;
exports.getPackages = getPackages;
