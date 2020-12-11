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
    <input
      value={value}
      onChange={handleChange}
      style={{
        padding: '8px 12px',
        fontSize: '16px',
        border: '1px solid #999',
        borderColor: 'transparent transparent #999 transparent'
      }}
    />
  )
}

export default EditableTranslate
