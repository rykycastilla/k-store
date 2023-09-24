import AppContext, { AppContextData } from '../app_context'
import ArticlesCard from '../src/components/ArticlesCard'
import { backgroundColor } from '../src/styles.json'
import BooleanCard from '../src/components/BooleanCard'
import inventory, { InventoryIndex } from '../src/interfaces/inventory'
import InventoryCard from '../src/components/InventoryCard'
import LoginView from '../src/views/LoginView'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'
import ViewSelector from '../src/components/ViewSelector'

function AppContent(): ReactElement {
  const { SwitchableBooleanCard, SwitchableInventoryCard, SwitchableArticlesCard } = useContext( AppContext )
  const SwitchableLoginView = useSwitch( LoginView, 400 )
  useEffect( () => {
    SwitchableLoginView.call()
    setTimeout( () => {
      setStatusBarStyle( 'dark' )
      setStatusBarBackgroundColor( backgroundColor, true )
    }, 100 )
  }, [] )
  return (
    <>
      <SwitchableArticlesCard.Component quit={ SwitchableArticlesCard.hide } />
      <SwitchableInventoryCard.Component quit={ SwitchableInventoryCard.hide } />
      <SwitchableBooleanCard.Component quit={ SwitchableBooleanCard.hide } />
      <SwitchableLoginView.Component quit={ SwitchableLoginView.hide } />
      <ViewSelector />
    </>
  )
}

function App(): ReactElement {
  const SwitchableBooleanCard = useSwitch( BooleanCard, 400 )
  const SwitchableInventoryCard = useSwitch( InventoryCard, 400 )
  const SwitchableArticlesCard = useSwitch( ArticlesCard, 400 )
  const [ inventoryData, setInventoryData ] = useState( {} as InventoryIndex )
  useEffect( () => {
    inventory.use( setInventoryData )
  }, [] )
  const data: AppContextData = {
    SwitchableBooleanCard: SwitchableBooleanCard,
    SwitchableInventoryCard: SwitchableInventoryCard,
    SwitchableArticlesCard: SwitchableArticlesCard,
    inventoryData: inventoryData,
  }
  return (
    <>
      <AppContext.Provider value={ data }>
        <SafeAreaView>
          <ViewportProvider>
            <AppContent />
          </ViewportProvider>
        </SafeAreaView>
      </AppContext.Provider>
    </>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
} )

export default App