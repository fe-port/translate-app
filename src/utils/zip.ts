import { message } from 'antd'
import JsZip from 'jszip'
import { LocaleFileContent, LocaleTranslates } from '../types'

export async function parseZip(file: File): Promise<LocaleFileContent[]> {
  try {
    const zip = await JsZip.loadAsync(file)
    const ret: LocaleFileContent[] = []
    for (const fileKey of Object.keys(zip.files)) {
      const localeFile = zip.files[fileKey]
      // 目录跳过
      if (!localeFile.dir) {
        const localeContent = await localeFile.async('string')
        ret.push({
          filename: localeFile.name.split('/').pop().replace(/\.json/, ''),
          content: localeContent
        })
      }
    }
    return ret
  } catch (error) {
    console.error(error)
    message.error('zip文件读取失败')
  }
  return []
}

export function downloadZip(noEnLangs: string[], localeJsons: {
  [key: string]: LocaleTranslates
}) {
  const zip = new JsZip()
  const langFolder = zip.folder('lang')
  noEnLangs.forEach(lang => {
    // json重新排序
    const newJson = Object.keys(localeJsons[lang])
      .sort((a, b) => (a < b ? -1 : 1))
      .reduce<LocaleTranslates>((obj, key) => {
        obj[key] = localeJsons[lang][key]
        return obj
      }, {})
    langFolder.file(`${lang}.json`, JSON.stringify(newJson, null, 2))
  })
  // 把打包内容异步转成blob二进制格式
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // 下载的文件名
    const filename = 'translate.zip'
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a')
    eleLink.download = filename
    eleLink.style.display = 'none'
    // 下载内容转变成blob地址
    eleLink.href = URL.createObjectURL(content)
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  })
}