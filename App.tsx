import AppContext, { AppContextData } from './app_context'
import { backgroundColor } from './src/styles.json'
import BooleanCard from './src/components/BooleanCard'
import LoginView from './src/components/LoginView'
import React, { ReactElement, useEffect, useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'
import Views from './src/components/Views'

function AppContent(): ReactElement {
  const { SwitchableBooleanCard } = useContext( AppContext )
  const SwitchableLoginView = useSwitch( LoginView, 400 )
  useEffect( () => {
    SwitchableLoginView.call( '' as unknown )
  }, [] )
  return (
    <>
      <SwitchableBooleanCard.Component quit={ SwitchableBooleanCard.hide } />
      <SwitchableLoginView.Component quit={ SwitchableLoginView.hide } />
      <Views />
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
