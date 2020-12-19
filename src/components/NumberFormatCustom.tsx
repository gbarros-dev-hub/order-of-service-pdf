import React from 'react'
import NumberFormat from 'react-number-format'

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumberFormatCustom: React.FC<NumberFormatCustomProps> = ({ inputRef, onChange, name, ...other }) => (
  <NumberFormat
    {...other}
    isNumericString
    getInputRef={inputRef}
    thousandSeparator={'.'}
    decimalSeparator={','}
    decimalScale={4}
    onValueChange={(values) => {
      onChange({
        target: {
          name: name,
          value: values.value,
        },
      })
    }}
  />
)

export default NumberFormatCustom
