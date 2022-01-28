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
// const text = "Package: com.gebeto.audioenglish\nVersion: 1.0\nArchitecture: iphoneos-arm\nMaintainer: gebeto <slavik.nychkalo@gmail.com>\nDepends: mobilesubstrate\nFilename: ./debs/audioenglish_1.0.deb\nSize: 5564\nMD5sum: cf5b6eb8347d03f26159b7d0694d0698\nSHA1: e69ba6caabc58a786f2a785008e7efbd92185ccd\nSHA256: 4f07b41066fb4db8ba9dd5faf288a1163ca801de6c2a8f7c603f6159517cbdc2\nSection: Tweaks (Hacks)\nDescription: Взлом  на подписку, все открыто\nAuthor: gebeto <slavik.nychkalo@gmail.com>\nName: Самоучитель английского языка. Полный курс: иностранный язык с нуля для начинающих\n\n";

exports.getPackages = getPackages;
