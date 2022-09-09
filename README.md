# LocaleTransformator

Locale Class Into A Yaml File Or Reverse

## Example

```js
const { createDBI } = require("@mostfeatured/dbi");
const { localeToYamlFile, yamlFileToLocaleFile } = require("@mostfeatured/locale-transformer");

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

    Locale(yamlFileToLocaleFile("./en.yaml"));

  });

  await dbi.load();

  localeToYamlFile(dbi.data.locales.get("tr"), "./tr.yaml");

  yamlFileToLocaleFile("./tr.yaml", "./tr.js");

})();
```