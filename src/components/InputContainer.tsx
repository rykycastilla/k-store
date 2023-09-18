import { containerColor, margin } from '../styles.json'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface InputContainerProps {
  children: ReactElement | ReactElement[],
  noMargin?: boolean,
}

function InputContainer( props:InputContainerProps ): ReactElement {
  const { children, noMargin } = props
  const margin = noMargin ? {} : styles.margin
  return <View style={ [ useViewport( styles.container ), useViewport( margin ) ] }>{ children }</View>
}

const styles = StyleSheet.create( {
  container: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    height: '6.39vw' as unknown as number,
    borderRadius: '1.5vw' as unknown as number,
    backgroundColor: containerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: { marginTop: margin as unknown as number },
} )

export default InputContainer