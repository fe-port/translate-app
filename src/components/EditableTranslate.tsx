import React, { useCallback, useState } from 'react'

interface Props {
  defaultValue: string
  onChange?: (v: string) => void
}

const EditableTranslate: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [inputVisible, setInputVisible] = useState(!defaultValue)
  const [value, setValue] = useState(defaultValue ?? '')
  const handleChange = useCallback(
    e => {
      setValue(e.target.value)
      onChange?.(e.target.value)
    },
    [onChange]
  )
  return !inputVisible ? (
    <span onClick={() => setInputVisible(true)}>{defaultValue}</span>
  ) : (
    <input className="w-full border-b focus:border-blue-500 appearance-none focus:outline-none"
      value={value}
      onChange={handleChange}
    />
  )
}

export default EditableTranslate
