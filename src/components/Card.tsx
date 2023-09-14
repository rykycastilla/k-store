import { Animated, StyleSheet, View } from 'react-native'
import AppContext from '../../app_context'
import { backgroundColor, margin } from '../styles.json'
import { BlurView } from 'expo-blur'
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

interface CardProps {
  children: ReactElement|ReactElement[],
  hiding: boolean,
}

function Card( props:CardProps ): ReactElement {
  const { children, hiding } = props
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
    zIndex: 1,
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
  },
} )

export default Card