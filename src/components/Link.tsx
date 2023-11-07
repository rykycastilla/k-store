import { fontSize, googleColor, margin } from '../styles.json'
import { FunctionVoid } from '../types'
import { Pressable, StyleSheet, Text } from 'react-native'
import React, { ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'

interface LinkProps {
  text: string,
  action: FunctionVoid,
}

function Link( props:LinkProps ): ReactElement {
  const { text, action } = props
  return (
    <Pressable onPress={ action }>
      <Text style={ useViewport( styles.link ) }>{ text }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create( {
  link: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    color: googleColor,
    fontSize: `${ fontSize } * 0.71` as unknown as number,
    textDecorationLine: 'underline',
  }
} )

export default Link
export { LinkProps }