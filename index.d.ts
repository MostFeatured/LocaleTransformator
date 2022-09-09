import  { TDBILocaleConstructor, DBILocale } from "@mostfeatured/dbi/dist/types/Locale";

/**
 * @param locale 
 * @param path path to write the yaml file from locale or locale constructor
 */
export async function localeToYamlFile(locale: DBILocale | TDBILocaleConstructor, path: string): Promise<void>;

/**
 * @param yamlPath The Yaml File Path
 * @param localePath path to write "TDBILocaleConstructor as json" from yaml file
 */
export async function yamlFileToLocaleFile(yamlPath: string, localePath?: string): Promise<TDBILocaleConstructor>;
/**
 * @param yamlPath The Yaml File Path
 */
export function yamlAsLocale(yamlPath: string, localePath?: string): TDBILocaleConstructor;