import { Animated, Image, StyleSheet } from 'react-native'
import AppContext from '../../app_context'
import { backgroundColor } from '../styles.json'
import { BlurView } from 'expo-blur'
import { BooleanCardCallerProps } from './BooleanCard'
import { HideFunction, useHiding } from 'react-component-switcher'
import loading from '../../assets/images/loading.gif'
import Opacity from '../interfaces/Opacity'
import React, { ReactElement, useContext, useEffect, useRef } from 'react'
import { SBC } from '../types'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { useViewport } from 'react-native-viewport-provider'

async function wait() {
  const promise: Promise<void> = new Promise( resolve => {
    setTimeout( resolve, 600 )
  } )
  await promise
}

interface LoadingWallProps { quit:HideFunction }

interface LoadingWallCallerProps {
  promise: Promise<unknown>,
  then: ( result:unknown ) => BooleanCardCallerProps | null,
  catch: ( err:string ) => BooleanCardCallerProps | null,
}

async function resolve( callerProps:LoadingWallCallerProps, quit:HideFunction, BooleanCard:SBC ) {
  const { promise } = callerProps
  const defaultTaskDuration = wait()
  // Declare how to process the promise of the task
  const resolveTask: Promise<BooleanCardCallerProps|null> = new Promise( resolvePromise => {
    promise.catch( ( err:unknown ) => {
      const errString = String( err ),
        resultAlert = callerProps.catch( errString )
      resolvePromise( resultAlert )
    } )
    promise.then( ( result:unknown ) => {
      const resultAlert = callerProps.then( result )
      resolvePromise( resultAlert )
    } )
  } )
  // Waiting the default duration and the task result
  await defaultTaskDuration
  const taskResult = await resolveTask
  quit()  // Hiding LoadingWall
  setTimeout( () => {
    // Calling Alert if it is necesary
    if( taskResult ) { BooleanCard.call( taskResult ) }
  }, 300 )
}

function LoadingWall( props:LoadingWallProps, callerProps:LoadingWallCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { SwitchableBooleanCard } = useContext( AppContext )
  // Setting status bar color and animation
  const hiding = useHiding( id )
  const opacity = useRef( new Animated.Value( 0 ) ).current
  useEffect( () => {
    let toValue: Opacity
    if( hiding ) {
      toValue = Opacity.HIDE
      setStatusBarBackgroundColor( backgroundColor, true )
    }
    else {
      toValue = Opacity.SHOW
      setStatusBarBackgroundColor( '#D0CCCC', true )
    }
    Animated.timing( opacity, {
      toValue: toValue,
      duration: 250,
      useNativeDriver: true,
    } ).start()
  }, [ hiding ] )
  // solving promise
  useEffect( () => {
    resolve( callerProps, quit, SwitchableBooleanCard )
  }, [] )
  return (
    <Animated.View style={ [ styles.container, { opacity: opacity } ] }>
      <BlurView intensity={ 4 } tint="light" style={ [ styles.container, styles.darkWall ] }>
        <Image source={ loading } style={ useViewport( styles.loading ) } />
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkWall: { backgroundColor: 'rgba( 0, 0, 0, 0.2 )' },
  loading: {
    width: '8vw' as unknown as number,
    height: '8vw' as unknown as number,
  },
} )

export default LoadingWall
export { LoadingWallCallerProps, LoadingWallProps }