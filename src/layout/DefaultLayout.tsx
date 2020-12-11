import React from 'react'
import FilterConfigProvider from '../provider/data'

interface Props {}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <h1 className="py-4 text-center text-2xl">在线翻译</h1>
      <FilterConfigProvider>
        <div className="app-container ">
          {children}
        </div>
      </FilterConfigProvider>
    </main>
  )
}

export default DefaultLayout
