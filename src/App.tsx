import React, { useRef } from 'react'
import FixedFooter from './components/FixedFooter'
import MainContent, { MainContentAction } from './components/MainContent'
import RestoreButton from './components/RestoreButton'
import { useGlobalData } from './provider/data'

const TranslatePage: React.FC = () => {
  const mainContentRef = useRef<MainContentAction>()
  const { noEnLangs } = useGlobalData()
  // 导出
  const doExport = () => {
    mainContentRef.current.exportZip()
  }

  return (
    <div
      className="relative"
      style={{ minHeight: 'calc(100vh - 64px)', paddingBottom: '84px' }}
    >
      <RestoreButton />
      <MainContent actionRef={mainContentRef} />
      <FixedFooter langs={noEnLangs} onExport={doExport} />
    </div>
  )
}

export default TranslatePage
