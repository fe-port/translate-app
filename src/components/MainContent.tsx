import React from 'react'
import { Collapse } from 'antd'
import EditableTranslate from './EditableTranslate'
import { useGlobalData } from '../provider/data'
import { LocaleTranslateItem } from '../types'
import { EN_LANG } from '../configs/constants'
import { downloadZip } from 'src/utils/zip'

const { Panel } = Collapse
interface LocaleTranslates {
  [key: string]: LocaleTranslateItem
}
interface LangPanelProps {
  description: string
  hash: string
  langs: string[]
  locales: { [key: string]: string }
}

export interface MainContentAction {
  exportZip: () => void
}

const changedValues: Map<
  {
    lang: string
    hash: string
  },
  string
> = new Map()

function shouldPanelDefaultCollapsed(
  panel: LangPanelProps,
  visibleLang?: string
) {
  return panel.langs.every(
    lang => (visibleLang && lang !== visibleLang) || panel.locales[lang]
  )
}

const MainContent: React.FC<{ actionRef: React.MutableRefObject<MainContentAction>}> = ({ actionRef }) => {
  const {
    hideTranslatedPanel,
    hideTranslatedLocales,
    visibleLang,
    locales,
    langs,
    noEnLangs
  } = useGlobalData()

  // 没有配置
  if (!locales.length) {
    return (
      <p className="text-blue-600 empty-content">
        暂无国际化配置，请使用导入按钮导入zip文件
      </p>
    )
  }
  // 读取英文翻译
  const enLocale = locales.find(locale => locale.filename === EN_LANG)
  // 解析英文中的所有hash数据
  let enJson: LocaleTranslates = {}
  try {
    enJson = JSON.parse(enLocale.content) as LocaleTranslates
  } catch (error) {
    return (
      <p className="text-red-600 empty-content">
        解析英文源文件失败，请检查上传的zip文件是否正确!
      </p>
    )
  }

  try {
    // locales数组转json map
    const localeJsons = locales.reduce<{
      [key: string]: LocaleTranslates
    }>((obj, locale) => {
      obj[locale.filename] = JSON.parse(locale.content) as LocaleTranslates
      return obj
    }, {})

    // 面板数据
    const panels = Object.keys(enJson).reduce<LangPanelProps[]>((arr, hash) => {
      const panel = {
        description: enJson[hash].description,
        hash,
        langs: noEnLangs,
        locales: langs.reduce<{ [key: string]: string }>((obj, lang) => {
          obj[lang] = localeJsons[lang][hash]?.defaultMessage
          return obj
        }, {})
      }
      if (
        !(
          hideTranslatedPanel && shouldPanelDefaultCollapsed(panel, visibleLang)
        )
      ) {
        arr.push(panel)
      }
      return arr
    }, [])

    // 如果所有语言都有翻译，则默认收起
    const defaultActiveKeys = panels.reduce<string[]>((arr, panel) => {
      if (!shouldPanelDefaultCollapsed(panel)) {
        arr.push(panel.hash)
      }
      return arr
    }, [])

    // 输入框内容变化
    const handleInputChange = (v: string, lang: string, hash: string) => {
      changedValues.set(
        {
          lang,
          hash
        },
        v
      )
    }

    // 赋值导出函数
    if (actionRef) {
      actionRef.current = {
        exportZip: () => {
          // 更新localeJsons
          changedValues.forEach((value, key) => {
            // 可能不存在该key
            if (!localeJsons[key.lang][key.hash]) {
              localeJsons[key.lang][key.hash] = {
                defaultMessage: '',
                description: enJson[key.hash].description
              }
            }
            localeJsons[key.lang][key.hash].defaultMessage = value
          })
          downloadZip(noEnLangs, localeJsons)
        }
      }
    }

    return (
      <Collapse defaultActiveKey={defaultActiveKeys}>
        {panels.map(panel => (
          <Panel
            header={
              panel.description || (
                <span className="text-red-600 empty-content">未提供描述</span>
              )
            }
            key={panel.hash}
          >
            <div>
              <p>en_US: {panel.locales[EN_LANG]}</p>
              {panel.langs.map(lang => {
                if (
                  !(hideTranslatedLocales && panel.locales[lang]) &&
                  !(visibleLang && lang !== visibleLang)
                ) {
                  return (
                    <p key={lang}>
                      {lang}:{' '}
                      <EditableTranslate
                        value={panel.locales[lang]}
                        onChange={v => handleInputChange(v, lang, panel.hash)}
                      />
                    </p>
                  )
                }
                return null
              })}
            </div>
          </Panel>
        ))}
      </Collapse>
    )
  } catch (e) {
    console.error(e)
    return (
      <p className="text-red-600 empty-content">
        解析文件失败，请检查上传的zip文件是否正确!
      </p>
    )
  }
}

export default MainContent
