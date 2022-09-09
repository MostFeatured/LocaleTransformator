import  { TDBILocaleConstructor, DBILocale, LangConstructorObject } from "@mostfeatured/dbi/dist/types/Locale";

/**
 * @param locale 
 * @param path path to write the yaml file from locale or locale constructor
 */
export async function localeToYamlFile(locale: DBILocale | TDBILocaleConstructor<LangConstructorObject>, path: string): Promise<void>;

/**
 * @param yamlPath The Yaml File Path
 * @param localePath path to write "TDBILocaleConstructor as json" from yaml file
 */
export async function yamlFileToLocaleFile(yamlPath: string, localePath?: string): Promise<TDBILocaleConstructor<LangConstructorObject>>;
/**
 * @param yamlPath The Yaml File Path
 */
export function yamlAsLocale(yamlPath: string, localePath?: string): TDBILocaleConstructor<LangConstructorObject>;

export async function packInteractionLocalesAsYamls(interactionLocales: import("discord.js").Collection<string, import("@mostfeatured/dbi/dist/types/InteractionLocale").DBIInteractionLocale>, folder: string): Promise<void>;

export async function importFromInteractionYamlPack(folder: string, dbi?: import("@mostfeatured/dbi/dist/DBI").DBI): Map<string, import("@mostfeatured/dbi/dist/types/InteractionLocale").DBIInteractionLocale>