import AppContext, { AppContextData } from '../app_context'
import { backgroundColor } from '../src/styles.json'
import BooleanCard from '../src/components/BooleanCard'
import InventoryCard from '../src/components/InventoryCard'
import LoginView from '../src/views/LoginView'
import React, { ReactElement, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'
import ViewSelector from '../src/components/ViewSelector'

function AppContent(): ReactElement {
  const { SwitchableBooleanCard, SwitchableInventoryCard } = useContext( AppContext )
  const SwitchableLoginView = useSwitch( LoginView, 400 )
  useEffect( () => {
    SwitchableLoginView.call( '' as unknown )
    setTimeout( () => {
      setStatusBarStyle( 'dark' )
      setStatusBarBackgroundColor( backgroundColor, true )
    }, 100 )
  }, [] )
  return (
    <>
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
  const data: AppContextData = {
    SwitchableBooleanCard: SwitchableBooleanCard,
    SwitchableInventoryCard: SwitchableInventoryCard,
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