# LocaleTransformator

Locale Class Into A Yaml File Or Reverse

## Example

```js
const { createDBI } = require("@mostfeatured/dbi");
const { localeToYamlFile, yamlFileToLocaleFile, yamlAsLocale } = require("@mostfeatured/locale-yamler");

const dbi = createDBI("dbi_namespace", {
  discord: {
    token: "Your Token Here",
    options: {
      intents: ["Guilds"]
    }
  }
});


dbi.register(({ Locale }) => {
  Locale({
    name: "tr",
    data: {
      erdem: {
        isim: "Erdem",
      },
      türk: "Türk"
    }
  });
});

(async () => {

  dbi.register(({ Locale }) => {

    Locale(yamlAsLocale("./en.yaml"));

  });

  await dbi.load();

  await localeToYamlFile(dbi.data.locales.get("tr"), "./tr.yaml");

  await yamlFileToLocaleFile("./tr.yaml", "./tr.js");

})();
```