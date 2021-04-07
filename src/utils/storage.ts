import { ChangedLangs } from 'src/types'
import debounce from 'lodash.debounce'

export const LANGS_STORE_KEY = 'langs.store'
export const FILE_STORE_KEY = 'file.store'

interface JSONfiedChangedLang {
  lang: string
  hash: string
  value: string
}

function convertMapToJson(map: ChangedLangs): JSONfiedChangedLang[] {
  const ret: JSONfiedChangedLang[] = []
  map.forEach((value, key) => {
    ret.push({
      ...key,
      value
    })
  })
  return ret
}

function convertJsonToMap(langs: JSONfiedChangedLang[]): ChangedLangs {
  const map: ChangedLangs = new Map()
  langs.forEach(lang => {
    map.set(
      {
        lang: lang.lang,
        hash: lang.hash
      },
      lang.value
    )
  })
  return map
}

export function getStoredLangs(): ChangedLangs {
  try {
    const stored: JSONfiedChangedLang[] = JSON.parse(
      localStorage.getItem(LANGS_STORE_KEY)
    )
    return convertJsonToMap(stored)
  } catch (error) {
    return new Map()
  }
}

export const saveLangs = debounce((map: ChangedLangs) => {
  localStorage.setItem(LANGS_STORE_KEY, JSON.stringify(convertMapToJson(map)))
}, 3000)

export function clearStorage () {
  localStorage.removeItem(LANGS_STORE_KEY)
  localStorage.removeItem(FILE_STORE_KEY)
}