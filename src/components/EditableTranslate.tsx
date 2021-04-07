import React, { useCallback, useState } from 'react'

interface Props {
  defaultValue: string
  onChange?: (v: string) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const EditableTranslate: React.FC<Props> = ({
  defaultValue,
  onChange,
  onBlur
}) => {
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
    <input
      className="editable-translate w-full border-b focus:border-blue-500 appearance-none focus:outline-none"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
    />
  )
}

export default EditableTranslate
