import { Animated, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import { fontSize, margin } from '../styles.json'
import { FunctionVoid } from '../types'
import Opacity from '../interfaces/Opacity'
import React, { ReactElement, useEffect, useRef } from 'react'
import { useHiding } from 'react-component-switcher'
import { useViewport } from 'react-native-viewport-provider'

interface ArticleButtonProps {
  image: ImageSourcePropType,
  action: FunctionVoid,
}

function ArticleButton( props:ArticleButtonProps, callerProps:unknown, id:number ): ReactElement {
  const { image, action } = props
  const hiding = useHiding( id )
  console.log( hiding )
  const opacity = useRef( new Animated.Value( 0 ) ).current
  useEffect( () => {
    const toValue: number = hiding
      ? Opacity.HIDE
      : Opacity.SHOW
    Animated.timing( opacity, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: true,
    } ).start()
  }, [ hiding ] )
  return (
    <Animated.View style={ [ useViewport( styles.container ), { opacity: opacity } ] }>
      <TouchableOpacity style={ styles.pressableContainer } onPress={ action }>
        <Image source={ image } style={ styles.buttonImage } />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: `${ fontSize } * 0.83` as unknown as number,
    height: `${ fontSize } * 0.83` as unknown as number,
    marginLeft: margin as unknown as number,
  },
  pressableContainer: {
    width: '100%',
    height: '100%',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
} )

export default ArticleButton