import { Dropdown, Menu } from 'antd'
import React from 'react'
import { useGlobalData } from 'src/provider/data'
import { clearStorage, FILE_STORE_KEY } from 'src/utils/storage'

const RestoreButton: React.FC = () => {
  const { locales } = useGlobalData()
  const hasStored = !!localStorage.getItem(FILE_STORE_KEY)

  const remove = () => {
    clearStorage()
  }

  const importStored = () => {}

  return (
    !locales &&
    hasStored && (
      <Dropdown.Button
        className="mb-4"
        overlay={
          <Menu>
            <Menu.Item key="1" onClick={remove}>
              删除
            </Menu.Item>
          </Menu>
        }
        onClick={importStored}
      >
        检测到有未完成翻译，点击导入
      </Dropdown.Button>
    )
  )
}

export default RestoreButton
