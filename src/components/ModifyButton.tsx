import { accentColor, margin } from '../styles.json'
import { CallSwitchable } from '../types'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'

interface ModifyButtonProps {
  image: ImageSourcePropType,
  callSwitchable: CallSwitchable,
}

function ModifyButton( props:ModifyButtonProps ): ReactElement {
  const { image, callSwitchable } = props
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      style={ useViewport( styles.button ) }
      onPress={ callSwitchable }>
      <Image source={ image } style={ useViewport( styles.buttonImage ) } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  button: {
    width: '10.28vw' as unknown as number,
    height: '10.28vw' as unknown as number,
    marginLeft: margin as unknown as number,
    marginTop: margin as unknown as number,
    borderRadius: '5.14vw' as unknown as number,
    backgroundColor: accentColor,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
  },
  buttonImage: {
    width: '4.5vw' as unknown as number,
    height: '4.5vw' as unknown as number,
    alignSelf: 'center'
  },
} )

export default ModifyButton