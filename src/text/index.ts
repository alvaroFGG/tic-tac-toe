import ES from "./es";

export enum LANG {
  es,
}

export type TextKey = keyof typeof ES;
export type TextMap = typeof ES & { [key: string]: string };

// TODO Guess default lang from URI / browser
const DEFAULT_LANG = ES;

const text = (name?: LANG) => {
  let language = DEFAULT_LANG as TextMap;
  if (name === LANG.es) language = ES as TextMap;
  return language;
};

export default text;
export const T = text();
