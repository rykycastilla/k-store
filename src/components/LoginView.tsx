import AppContext from '../../app_context'
import { BooleanCardCallerProps, Link } from './BooleanCard'
import { fontSize, googleColor, margin, textColor, textContainer } from '../styles.json'
import { FunctionVoid } from '../types'
import icon from '../../assets/adaptive-icon.png'
import { Image, StyleSheet, Text, TouchableOpacity, View as ReactView } from 'react-native'
import React, { useContext, ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'
import View from './View'

interface LogInButtonProps { action:FunctionVoid }

function LogInButton( props:LogInButtonProps ): ReactElement {
  const { action } = props
  return (
    <TouchableOpacity activeOpacity={ 0.7 } onPress={ action } style={ useViewport( styles.logInButton ) }>
      <Text style={ useViewport( styles.buttonText ) }>Continuar</Text>
    </TouchableOpacity>
  )
}

function LoginView(): ReactElement {
  const { SwitchableBooleanCard } = useContext( AppContext )
  return (
    <>
    <View title="Bienvenido">
      <ReactView style={ styles.container }>
        <Text style={ useViewport( styles.welcomeText ) }>
          Para comenzar a utilizar nuestros servicios debe iniciar sesión con Google
        </Text>
        <Image source={ icon } style={ useViewport( styles.backgroundLogo ) } />
        <LogInButton action={
          () => {
            const link: Link = {
              text: 'Leer más',
              action() { console.log( '<a></a>' ) }
            }
            const callerProps: BooleanCardCallerProps = {
              text: 'Al continuar, confirma estar de acuerdo con nuestra política de privacidad.',
              link: link,
              action() { console.log( 'Continue...' ) },
            }
            SwitchableBooleanCard.call( callerProps )
          }
        } />
      </ReactView>
    </View>
    </>
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
    borderRadius: '2vw' as unknown as number,
  },
  logInButton: {
    width: `100vw - ( ${ margin } * 2 )` as unknown as number,
    height: `${ fontSize } * 1.76` as unknown as number,
    position: 'absolute',
    left: margin as unknown as number,
    bottom: margin as unknown as number,
    borderRadius: '2vw' as unknown as number,
    backgroundColor: googleColor,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    aligItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: `${ fontSize } * 1.05` as unknown as number,
    fontWeight: '700',
    alignSelf: 'center',
  },
} )

export default LoginView