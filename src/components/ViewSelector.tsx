import { Animated, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native'
import { backgroundColor, dockSize } from '../styles.json'
import { CallSwitchable } from '../types'
import dockArticlesIcon from '../../assets/images/dock_articles_icon.png'
import dockArticlesIconActive from '../../assets/images/dock_articles_icon_active.png'
import dockHomeIcon from '../../assets/images/dock_home_icon.png'
import dockHomeIconActive from '../../assets/images/dock_home_icon_active.png'
import dockRegistryIcon from '../../assets/images/dock_registry_icon.png'
import dockRegistryIconActive from '../../assets/images/dock_registry_icon_active.png'
import Opacity from '../interfaces/Opacity'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { router, Slot, usePathname } from 'expo-router'
import useSwitch, { HideFunction, useHiding } from 'react-component-switcher'
import { useViewport } from 'react-native-viewport-provider'

interface AnimatedWallProps { quit:HideFunction }

function AnimatedWall( props:AnimatedWallProps, callerProps:unknown, id:number ): ReactElement {
  const { quit } = props
  const hiding = useHiding( id )
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
  // Setting lifetime of AnimatedWall
  useEffect( () => {
    setTimeout( quit, 300 )
  }, [] )
  return <Animated.View style={ [ styles.animatedWall, { opacity: opacity } ] } />
}

interface NavButtonProps {
  url: string,
  image: ImageSourcePropType,
  activeImage: ImageSourcePropType,
  callAnimatedWall: CallSwitchable,
}

function NavButton( props:NavButtonProps ): ReactElement {
  const { url, image, activeImage, callAnimatedWall } = props
  const path = usePathname()
  // Identify the state of the button
  const [ active, setActive ] = useState( path === url )
  // Chnage the current state of the button if the view changes
  useEffect( () => {
    setActive( path === url )
  }, [ path ] )
  // Setting changing animation
  const inactiveOpacity = useRef( new Animated.Value( 1 ) ).current
  const activeOpacity = useRef( new Animated.Value( 1 ) ).current
  useEffect( () => {
    // Setting future value of both instances of state
    const inactiveState: number = active
      ? Opacity.HIDE
      : Opacity.SHOW
    const activeState: number = active
      ? Opacity.SHOW
      : Opacity.HIDE
    // Setting if "this button" must wait to exe its animation
      const wait: number = active
      ? 100
      : 0
    setTimeout( () => {
      // Inactive instance animation
      Animated.timing( inactiveOpacity, {
        toValue: inactiveState,
        duration: 100,
        useNativeDriver: true,
      } ).start()
      // Active instance animation
      Animated.timing( activeOpacity, {
        toValue: activeState,
        duration: 100,
        useNativeDriver: true,
      } ).start()
    // Using "wait" here
    }, wait )
  }, [ active ] )
  return (
    <Pressable
      style={ useViewport( styles.navButton ) }
      onPress={
        () => {
          // Avoiding redirecting to the active view
          if( active ) { return }
          // Starting Animated Wall (for 160 mls)
          callAnimatedWall()
          setTimeout( () => {
            // Changing path at the middle
            router.replace( url )
          }, 100 )
        }
      }>
      <View style={ [ styles.animatedButtonContainer/* , { opacity: opacity } */ ] }>
        { /* Booth state instances (active and inactive) */ }
        <Animated.Image source={ image } style={ [ styles.navButtonImage, { opacity: inactiveOpacity } ] } />
        <Animated.Image source={ activeImage } style={ [ styles.navButtonImage, { opacity: activeOpacity } ] } />
      </View>
    </Pressable>
  )
}

interface DockProps { callAnimatedWall:CallSwitchable }

function Dock( props:DockProps ): ReactElement {
  const { callAnimatedWall } = props
  return (
    <View style={ useViewport( styles.dock ) }>
      <NavButton
        url="/" image={ dockHomeIcon }
        activeImage={ dockHomeIconActive }
        callAnimatedWall={ callAnimatedWall }  />
      <NavButton
        url="/articles"
        image={ dockArticlesIcon }
        activeImage={ dockArticlesIconActive }
        callAnimatedWall={ callAnimatedWall }/>
      <NavButton
        url="/registry"
        image={ dockRegistryIcon }
        activeImage={ dockRegistryIconActive }
        callAnimatedWall={ callAnimatedWall }/>
    </View>
  )
}

function ViewSelector(): ReactElement {
  const SwitchableAnimatedWall = useSwitch( AnimatedWall, 100 )
  return (
    <>
      <View style={ useViewport( styles.viewContainer ) }>
        <Slot />
        <SwitchableAnimatedWall.Component quit={ SwitchableAnimatedWall.hide } />
      </View>
      <Dock callAnimatedWall={ SwitchableAnimatedWall.call } />
    </>
  )
}

const styles = StyleSheet.create( {
  viewContainer: {
    width: '100%',
    height: `100vh - ${ dockSize }` as unknown as number,
  },
  dock: {
    width: '100%',
    height: dockSize as unknown as number,
    borderTopWidth: 2,
    borderTopColor: '#DADADA',
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navButton: {
    width: '8.33vw' as unknown as number,
    height: '8.33vw' as unknown as number,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedButtonContainer: {
    width: '75%',
    height: '75%',
  },
  navButtonImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  animatedWall: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: backgroundColor,
  }
} )

export default ViewSelector