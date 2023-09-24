import { fontSize, margin, textColor } from '../styles.json'
import InputContainer from './InputContainer'
import { Picker as NativePicker } from '@react-native-picker/picker'
import React, { ReactElement } from 'react'
import { StateSetter } from '../types'
import { StyleSheet } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface PickerProps {
  names: string[],
  values?: string[],
  selected: string,
  setSelected: StateSetter<string>
}

function Picker( props:PickerProps ): ReactElement {
  const { names, selected, setSelected } = props
  let { values } = props
  // Using names as values if these does not exist
  if( !values ) { values = names }
  const items: ReactElement[] = []
  for( let _this = 0; _this < names.length; _this++ ) {
    const name: string = names[ _this ]
    let value: string | undefined = values[ _this ]
    // Using "name" as the value of the item (if it does not exist)
    if( !value ) { value = name }
    const item = <NativePicker.Item key={ _this } label={ name } value={ value } />
    items.push( item )
  }
  return (
    <InputContainer>
      <NativePicker
        selectedValue={ selected }
        style={ useViewport( styles.picker ) }
        onValueChange={ value => setSelected( value ) }>
        { items }
      </NativePicker>
    </InputContainer>
  )
}

const styles = StyleSheet.create( {
  picker: {
    width: `100vw - ${ margin } * 5` as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.75` as unknown as number,
  }
} )

export default Picker