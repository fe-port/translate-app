import { Button, Checkbox, Select, Upload } from 'antd'
import React, { useCallback, useRef } from 'react'
import { useGlobalData } from '../provider/data'
import { parseZip } from '../utils/zip'

interface Props {
  langs: string[]
  onExport: () => void
}

const FixedFooter: React.FC<Props> = ({ langs, onExport }) => {
  const rootRef = useRef(null)
  const {
    hideTranslatedPanel,
    hideTranslatedLocales,
    visibleLang,
    setConfig,
    locales
  } = useGlobalData()

  const onSelectZipFile = useCallback(
    async ({ file }) => {
      const locales = await parseZip(file)
      setConfig('locales', locales)
    },
    [setConfig]
  )

  return (
    <div className="fixed bottom-0 left-0 right-0" ref={rootRef}>
      <div className="p-4 flex items-center app-container up-shadow">
        <div className="flex items-center mr-6">
          <label>显示翻译语言：</label>
          <Select
            value={visibleLang}
            onChange={v => setConfig('visibleLang', v)}
            style={{ width: '120px' }}
            getPopupContainer={() => rootRef.current!}
          >
            <Select.Option value="">全部</Select.Option>
            {langs.map(lang => (
              <Select.Option key={lang} value={lang}>
                {lang}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Checkbox
          checked={hideTranslatedPanel}
          onChange={e => setConfig('hideTranslatedPanel', e.target.checked)}
        >
          隐藏已翻译面板
        </Checkbox>
        <Checkbox
          checked={hideTranslatedLocales}
          onChange={e => setConfig('hideTranslatedLocales', e.target.checked)}
        >
          隐藏已翻译语言
        </Checkbox>
        {locales.length ? (
          <Button className="ml-auto" type="primary" onClick={onExport}>
            导出
          </Button>
        ) : (
          <Upload
            className="ml-auto"
            accept=".zip"
            beforeUpload={() => false}
            showUploadList={false}
            onChange={onSelectZipFile}
          >
            <Button type="primary">选择zip文件上传</Button>
          </Upload>
        )}
      </div>
    </div>
  )
}

export default FixedFooter
