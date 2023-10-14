import { accentTextColor, fontSize } from '../styles.json'
import { Animated, StyleSheet, View } from 'react-native'
import React, { ReactElement, useEffect, useRef } from 'react'
import { useViewport } from 'react-native-viewport-provider'

interface CircleSwitchProps {
  state: boolean,
  style?: object | object[],
}

function CircleSwitch( props:CircleSwitchProps ): ReactElement {
  const { state, style } = props
  const scale = useRef( new Animated.Value( 0 ) ).current
  useEffect( () => {
    const toValue: number = state ? 1 : 0
    Animated.timing( scale, {
      toValue: toValue,
      duration: 250,
      useNativeDriver: true,
    } ).start()
  }, [ state ] )
  const selectedSize = {
    transform: [ { scaleX: scale }, { scaleY: scale } ]
  }
  return (
    <View style={ [ useViewport( styles.circle ), style ] }>
      <Animated.View style={ [ useViewport( styles.selected ), selectedSize ] } />
    </View>
  )
}

const styles = StyleSheet.create( {
  circle: {
    width: `${ fontSize } * 0.71` as unknown as number,
    height: `${ fontSize } * 0.71` as unknown as number,
    borderRadius: `${ fontSize } * 0.71 / 2` as unknown as number,
    borderWidth: 2,
    borderColor: accentTextColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    width: '75%',
    height: '75%',
    borderRadius: `${ fontSize } * 0.71 / 2` as unknown as number,
    backgroundColor: accentTextColor,
  },
} )

export default CircleSwitch