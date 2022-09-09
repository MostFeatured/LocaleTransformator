const { stringify, parse } = require("yaml")
const fs = require("fs");
/**
 * @param {{[key: string]: Function}} object 
 * @param {{}} assignObject 
 */
function recursiveCallAndAssign(object, assignObject = {}) {
  for (let i in object) {
    let current = object[i];
    if (typeof current == "function") {
      assignObject[i] = current();
    } else if (typeof current == "string") {
      assignObject[i] = current;
    } else if (typeof current == "object") {
      if (!assignObject[i]) assignObject[i] = {};
      recursiveCallAndAssign(current, assignObject[i])
    }
  }
  return assignObject;
}

/**
 * @param {import("@mostfeatured/dbi/dist/types/Locale").DBILocale} locale 
 * @param {string} path
 * @returns {void}
 */
module.exports.localeToYamlFile = async function localeToYamlFile(locale, path) {
  const json = { name: locale.name, data: recursiveCallAndAssign(locale.data) };
  await fs.promises.writeFile(path, stringify(json))
}

/**
 * @param {string} yamlPath 
 * @param {string?} localePath path to write "TDBILocaleConstructor as json" from yaml file
 * @returns {import("@mostfeatured/dbi/dist/types/Locale").TDBILocaleConstructor}
 */
module.exports.yamlFileToLocaleFile = async function yamlFileToLocaleFile(yamlPath, localePath) {
  const yamlAsJson = parse(await fs.promises.readFile(yamlPath, "utf-8"))
  if (localePath) await fs.promises.writeFile(localePath,
    localePath.endsWith(".json") ?
      JSON.stringify(yamlAsJson, null, 2) :
      `/** @type {import("@mostfeatured/dbi/dist/types/Locale").TDBILocaleConstructor} */\nmodule.exports = ${JSON.stringify(yamlAsJson, null, 2).replace(/"([a-zA-ZğüşiöçĞÜŞİÖÇıİ_][a-zA-Z0-9ğüşiöçĞÜŞİÖÇıİ_]*)"((: {)|(: "([^"]|\\")*[^\\]"))/g, "$1$2")}`
  );
  return yamlAsJson;
}

module.exports.yamlAsLocale = function yamlAsLocale(yamlPath) {
  return parse(fs.readFileSync(yamlPath, "utf-8"))
}