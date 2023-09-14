import AppContext, { AppContextData } from './app_context'
import { backgroundColor } from './src/styles.json'
import BooleanCard from './src/components/BooleanCard'
import LoginView from './src/components/LoginView'
import React, { ReactElement, useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'

function AppContent(): ReactElement {
  const { SwitchableBooleanCard } = useContext( AppContext )
  return (
    <>
      <SwitchableBooleanCard.Component quit={ SwitchableBooleanCard.hide } />
      <LoginView />
    </>
  )
}

function App(): ReactElement {
  const [ barColor, setBarColor ] = useState( backgroundColor )
  const SwitchableBooleanCard = useSwitch( BooleanCard, 400 )
  const data: AppContextData = {
    setBarColor: setBarColor,
    SwitchableBooleanCard: SwitchableBooleanCard,
  }
  return (
    <>
      <AppContext.Provider value={ data }>
        <StatusBar backgroundColor={ barColor } style="dark" />
        <ViewportProvider>
          <AppContent />
        </ViewportProvider>
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
