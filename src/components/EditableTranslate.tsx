import React, { useCallback, useState } from 'react'

interface Props {
  value: string
  onChange?: (v: string) => void
}

const EditableTranslate: React.FC<Props> = ({ value, onChange }) => {
  const [inputVisible, setInputVisible] = useState(!value)
  const handleChange = useCallback(
    e => {
      onChange?.(e.target.value)
    },
    [onChange]
  )
  return !inputVisible ? (
    <span onClick={() => setInputVisible(true)}>{value}</span>
  ) : (
    <input className="w-full border-b focus:border-blue-500 appearance-none focus:outline-none"
      value={value}
      onChange={handleChange}
    />
  )
}

export default EditableTranslate
