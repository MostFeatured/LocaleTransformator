# LocaleTransformator

Locale Class Into A Yaml File Or Reverse

## Example

```js
const { createDBI } = require("@mostfeatured/dbi");
const { localeToYamlFile, yamlFileToLocaleFile, yamlAsLocale, importFromInteractionYamlPack, packInteractionLocalesAsYamls } = require("@mostfeatured/locale-transformer");

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
  switch ("fromHere") {

    case "fromPack": {
      importFromInteractionYamlPack("./yamls", dbi);
    };

    case "fromHere": {
      dbi.register(({ Locale, InteractionLocale }) => {

        Locale(yamlAsLocale("./en.yaml"));


        InteractionLocale({
          name: "cinsiyet seç",
          data: {
            tr: {
              name: "cinsiyet seç",
              description: "...",
              options: {
                cinsiyet: {
                  name: "cinsiyet",
                  description: "...",
                  choices: {
                    "Erkek": "Erkek",
                    "Kadın": "Kadın"
                  }
                }
              }
            },
            en: {
              name: "gender pick",
              description: "...",
              options: {
                cinsiyet: {
                  name: "gender",
                  description: "...",
                  choices: {
                    "Erkek": "Male",
                    "Kadın": "Female"
                  }
                }
              }
            }
          }
        });
      });
    }

  }

  await dbi.load();

  // packing interaction locales into a file
  await packInteractionLocalesAsYamls(dbi.data.interactionLocales, "./yamls");

  console.log(dbi.data.interactionLocales)

  await localeToYamlFile(dbi.data.locales.get("tr"), "./tr.yaml");

  await yamlFileToLocaleFile("./tr.yaml", "./tr.js");

})();
```