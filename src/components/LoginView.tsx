import { fontSize, margin, textColor, textContainer } from '../styles.json'
import icon from '../../assets/adaptive-icon.png'
import { Image, StyleSheet, Text, View as ReactView } from 'react-native'
import React, { ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'
import View from './View'

function LoginView(): ReactElement {
  return (
    <View title="Bienvenido">
      <ReactView style={ styles.container }>
        <Text style={ useViewport( styles.welcomeText ) }>
          Para comenzar a utilizar nuestros servicios debe iniciar sesión con Google
        </Text>
        <Image source={ icon } style={ useViewport( styles.backgroundLogo ) } />
      </ReactView>
    </View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    alignItem: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    width: '100%',
    height: `( ${ textContainer } * 1.31 ) * 3` as unknown as number,
    position: 'absolute',
    top: margin as unknown as number,
    left: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 1.31` as unknown as number,
    fontWeight: '700',
  },
  backgroundLogo: {
    width: '30.58vw' as unknown as number,
    height: '30.58vw' as unknown as number,
    alignSelf: 'center',
    borderRadius: 10,
  },
} )

export default LoginView