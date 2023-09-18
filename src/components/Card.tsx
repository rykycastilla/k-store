import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../../app_context'
import { accentTextColor, backgroundColor, fontSize, margin, textColor } from '../styles.json'
import { BlurView } from 'expo-blur'
import { FunctionVoid } from '../types'
import { HideFunction } from 'react-component-switcher'
import React, { ReactElement, useContext, useEffect, useRef } from 'react'
import { useViewport } from 'react-native-viewport-provider'

class AnimationDispatcher {
  public value: Animated.Value | null = null
  public load( value:Animated.Value ) { this.value = value }
  public start( toValue:number ) {
    const animValue = this.value
    if( animValue ) {
      Animated.timing( animValue, {
        toValue: toValue,
        duration: 400,
        useNativeDriver: true,
      } ).start()
    }
  }
}

const animationDispatcher = new AnimationDispatcher()

interface AnimatedContainerProps { children:ReactElement|ReactElement[] }

function AnimatedContainer( props:AnimatedContainerProps ): ReactElement {
  const { children } = props
  const opacity = useRef( new Animated.Value( 0 ) ).current
  animationDispatcher.load( opacity )
  return <Animated.View style={ [ styles.container, { opacity: opacity } ] }>{ children }</Animated.View>
}

enum Opacity {
  HIDE = 0,
  SHOW = 1,
}

interface ButtonProps {
  text: string,
  color?: boolean,
  action: FunctionVoid,
}

function Button( props:ButtonProps ): ReactElement {
  const { text, color, action } = props
  const textColorStyle: object = {
    color: color
      ? accentTextColor
      : textColor
  }
  return (
    <TouchableOpacity activeOpacity={ 0.5 } onPress={ action } style={ useViewport( styles.button ) }>
      <Text style={ [ textColorStyle, useViewport( styles.buttonText ) ] }>{ text }</Text>
    </TouchableOpacity>
  )
}

function accept( action:FunctionVoid, quit:HideFunction ) {
  action()
  quit()
}

interface CardProps {
  children: ReactElement|ReactElement[],
  hiding: boolean,
  quit: HideFunction,
  action: FunctionVoid,
  alert?: boolean,
}

function Card( props:CardProps ): ReactElement {
  const { children, hiding, quit, action, alert } = props
  const { setBarColor } = useContext( AppContext )
  useEffect( () => {
    if( hiding ) {
      animationDispatcher.start( Opacity.HIDE )
      setBarColor( backgroundColor )
    }
    else {
      animationDispatcher.start( Opacity.SHOW )
      // Background color with "Card Blur"
      setBarColor( '#989494' )
    }
  }, [ hiding ] )
  return (
    <AnimatedContainer>
      <BlurView intensity={ 4 } tint="dark" style={ [ styles.container, styles.darkWall ] }>
        <View style={ useViewport( styles.card ) }>
          { children }
          { alert ? <></> : <Button text="Cancelar" action={ quit } /> }
          <Button text="Aceptar" color action={ () => accept( action, quit ) } />
        </View>
      </BlurView>
    </AnimatedContainer>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
  },
  darkWall: { backgroundColor: 'rgba( 0, 0, 0, 0.4 )' },
  card: {
    width: `100vw - ${ margin } * 2` as unknown as number,
    position: 'absolute',
    left: margin as unknown as number,
    bottom: margin as unknown as number,
    borderRadius: '2vw' as unknown as number,
    backgroundColor: backgroundColor,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    marginTop: `${ margin } * 2` as unknown as number,
    marginBottom: margin as unknown as number,
  },
  buttonText: {
    fontSize: `${ fontSize } * 1.05` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
  }
} )

export default Card