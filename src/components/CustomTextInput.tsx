import { fontSize, margin, textColor } from '../styles.json'
import InputContainer from './InputContainer'
import React, { ReactElement } from 'react'
import { StateSetter } from '../types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface TextInputCardProps {
  title: string,
  defaultValue?: string,
  setValue: StateSetter<string>,
  unit?: string,
}

function CustomTextInput( props:TextInputCardProps ): ReactElement {
  const { title, defaultValue, setValue, unit } = props
  return (
    <View style={ styles.container }>
      <Text style={ useViewport( styles.title ) }>{ title }</Text>
      <InputContainer noMargin>
        <TextInput
          onChangeText={ ( value:string ) => setValue( value ) }
          defaultValue={ defaultValue }
          style={ useViewport( styles.input ) } />
          <Text style={ useViewport( styles.unit ) }>{ unit }</Text>
      </InputContainer>
    </View>
  )
}

const UNIT_NAME_SIZE = `${ fontSize } * 2.5`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
    fontWeight: '700',
  },
  input: {
    width: `100vw - ( ${ margin } * 5 + ${ UNIT_NAME_SIZE } )` as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.75` as unknown as number,
  },
  unit: {
    width: UNIT_NAME_SIZE as unknown as number,
    color: '#909090',
    fontSize: `${ fontSize } * 0.8` as unknown as number, 
    textAlign: 'center',
  },
} )

export default CustomTextInput