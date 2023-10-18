import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppContext from '../../app_context'
import { backgroundColor, margin } from '../styles.json'
import { HideFunction, useHiding } from 'react-component-switcher'
import { InventoryIndex } from '../interfaces/inventory'
import Opacity from '../interfaces/Opacity'
import quitRegistry from '../../assets/images/quit_registry.png'
import React, { ReactElement, useContext, useEffect, useMemo, useRef } from 'react'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import TableData from '../classes/TableData'
import tableTemplate from '../scripts/table_template'
import useBackButton from '../hooks/back_button'
import useLanguage from '../hooks/language'
import { useViewport } from 'react-native-viewport-provider'
import { WebView } from 'react-native-webview'

function animation( ref:Animated.Value, toValue:Opacity ) {
  Animated.timing( ref, {
    toValue: toValue,
    duration: 400,
    useNativeDriver: true,
  } ).start()
}

interface QuitButtonProps { quit:HideFunction }

function QuitButton( props:QuitButtonProps ): ReactElement {
  const { quit } = props
  return (
    <TouchableOpacity style={ useViewport( styles.quitButton ) } onPress={ quit }>
      <Image source={ quitRegistry } style={ styles.quitButtonImage } />
    </TouchableOpacity>
  )
}

interface TableProps { content:string }

function Table( props:TableProps ): ReactElement {
  const { content } = props
  return (
    <View style={ useViewport( styles.table ) }>
      <WebView source={ { html: content } } />
    </View>
  )
}

interface RegistryTableProps { quit:HideFunction }

interface RegistryTableCallerProps {
  date: Date,
  inventoryData: InventoryIndex,
}

function RegistryTable( props:RegistryTableProps, callerProps:RegistryTableCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { date, inventoryData } = callerProps
  const [ language ] = useLanguage()
  const { unitsData } = useContext( AppContext )
  const hiding = useHiding( id )
  const opacity = useRef( new Animated.Value( 0 ) ).current
  // Setting status bar color and animation
  useEffect( () => {
    if( hiding ) {
      animation( opacity, Opacity.HIDE )
      // Default background style
      setStatusBarBackgroundColor( backgroundColor, true )
      setStatusBarStyle( 'dark' )
    }
    else {
      animation( opacity, Opacity.SHOW )
      setStatusBarBackgroundColor( 'black', true )
      setStatusBarStyle( 'light' )
    }
  }, [ hiding ] )
  // Building table data structure
  const content: string = useMemo( () => {
    const table = new TableData( date, inventoryData )
    return tableTemplate( table, language, unitsData )
  }, [] )
  useBackButton( () => {
    quit()
  } )
  return (
    <Animated.View style={ [ styles.container, { opacity: opacity } ] }>
      <QuitButton quit={ quit } />
      <Table content={ content } />
    </Animated.View>
  )
}

const QUIT_BUTTON_SIZE = '7vw'

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  quitButton: {
    width: QUIT_BUTTON_SIZE as unknown as number,
    height: QUIT_BUTTON_SIZE as unknown as number,
    position: 'absolute',
    top: margin as unknown as number,
    left: margin as unknown as number,
  },
  quitButtonImage: {
    width: '100%',
    height: '100%',
  },
  table: {
    width: '100%',
    height: `100vh - ( ${ QUIT_BUTTON_SIZE } + ${ margin } * 2 ) * 2` as unknown as number,
  },
} )

export default RegistryTable
export { RegistryTableCallerProps, RegistryTableProps }