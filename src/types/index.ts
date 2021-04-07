export interface LocaleTranslateItem {
  defaultMessage: string
  description: string
}

export interface LocaleTranslates {
  [key: string]: LocaleTranslateItem
}

export interface LocaleFileContent {
  filename: string
  content: string
}

export type ChangedLangs = Map<
  {
    lang: string
    hash: string
  },
  string
>
