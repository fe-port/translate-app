import React, { createContext, useContext, useState } from 'react'
import { EN_LANG } from 'src/configs/constants'
import { LocaleFileContent } from '../types'

interface GlobalData {
  // 隐藏已翻译面板
  hideTranslatedPanel: boolean
  // 隐藏已翻译的配置
  hideTranslatedLocales: boolean
  // 显示的翻译语言
  visibleLang: string
  // 语言列表
  locales: LocaleFileContent[]
}

interface GlobalDataWithAction extends GlobalData {
  langs: string[]
  noEnLangs: string[]
  setConfig: (
    key: keyof GlobalData,
    value: boolean | string | LocaleFileContent[]
  ) => void
}

const defaultGlobalData = {
  hideTranslatedPanel: false,
  hideTranslatedLocales: false,
  visibleLang: '',
  locales: []
}

const GlobalDataContext = createContext<GlobalDataWithAction>({
  ...defaultGlobalData,
  langs: [],
  noEnLangs: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setConfig: () => {}
})

const GlobalDataProvider: React.FC = props => {
  const [globalData, setGlobalData] = useState(defaultGlobalData)
  const langs = globalData.locales.map(item => item.filename)
  return (
    <GlobalDataContext.Provider
      value={{
        ...globalData,
        langs,
        noEnLangs: langs.filter(lang => lang !== EN_LANG),
        setConfig: (key, value) => {
          setGlobalData({
            ...globalData,
            [key]: value
          })
        }
      }}
    >
      {props.children}
    </GlobalDataContext.Provider>
  )
}

export default GlobalDataProvider

export function useGlobalData() {
  return useContext(GlobalDataContext)
}
