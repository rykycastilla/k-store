import LoginView from './src/components/LoginView'
import React, { createContext, ReactElement } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import ViewportProvider from 'react-native-viewport-provider'

function AppContent(): ReactElement {
  return <LoginView />
}

interface AppContextData {}

const AppContext = createContext( {} as AppContextData )

function App(): ReactElement {
  const data: AppContextData = {}
  return (
    <>
      <StatusBar style="dark" />
      <AppContext.Provider value={ data }>
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
