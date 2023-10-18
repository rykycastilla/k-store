import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../../app_context'
import AppView from './AppView'
import { BooleanCardCallerProps, Link } from '../components/BooleanCard'
import { fontSize, googleColor, margin, textColor, textContainer } from '../styles.json'
import { FunctionVoid } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import icon from '../../assets/adaptive-icon.png'
import React, { ReactElement, useEffect, useContext, useRef } from 'react'
import useLanguage from '../hooks/language'
import { useViewport } from 'react-native-viewport-provider'

interface LogInButtonProps { action:FunctionVoid }

function LogInButton( props:LogInButtonProps ): ReactElement {
  const { action } = props
  const [ language ] = useLanguage()
  const { pressing, press } = useContext( AppContext )
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      style={ useViewport( styles.logInButton ) }
      onPress={
        () => {
          if( pressing ) { return }
          press()
          action()
        }
      }>
      <Text style={ useViewport( styles.buttonText ) }>{ language.continue }</Text>
    </TouchableOpacity>
  )
}

interface LoginViewProps { quit:HideFunction }

function LoginView( props:LoginViewProps, callerProps:unknown, id:number ): ReactElement {
  const { quit } = props
  const { SwitchableBooleanCard } = useContext( AppContext )
  const opacity = useRef( new Animated.Value( 1 ) ).current
  const hiding = useHiding( id )
  useEffect( () => {
    if( hiding ) {
      Animated.timing( opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      } ).start()
    }
  }, [ hiding ] )
  const [ language ] = useLanguage()
  return (
    <Animated.View style={ [ styles.superContainer, styles.container, { opacity: opacity } ] }>
      <AppView title={ language.welcome }>
        <View style={ styles.container }>
          <Text style={ useViewport( styles.welcomeText ) }>
            { language.signinInstructions }
          </Text>
          <Image source={ icon } style={ useViewport( styles.backgroundLogo ) } />
          <LogInButton action={
            () => {
              const link: Link = {
                text: language.readMore,
                action() { console.log( '<a></a>' ) }
              }
              const callerProps: BooleanCardCallerProps = {
                text: language.loginDisclaimer,
                link: link,
                action() {
                  setTimeout( quit, 400 )
                },
              }
              SwitchableBooleanCard.call( callerProps )
            }
          } />
        </View>
      </AppView>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  superContainer: { zIndex: 2 },
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