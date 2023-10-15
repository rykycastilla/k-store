import AppContext, { AppContextData } from '../app_context'
import appLanguage from '../src/interfaces/app_language'
import ArticlesCard from '../src/components/ArticlesCard'
import { backgroundColor } from '../src/styles.json'
import BooleanCard from '../src/components/BooleanCard'
import CheckBoxCard from '../src/components/CheckBoxCard'
import inventory, { InventoryIndex } from '../src/interfaces/inventory'
import InventoryCard from '../src/components/InventoryCard'
import { LanguageProvider } from '../src/hooks/language'
import { Languages } from '../src/hooks/language'
import LoginView from '../src/views/LoginView'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import RegistryTable from '../src/components/RegistryTable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import units, { Units } from '../src/interfaces/units'
import useBackButton from '../src/hooks/back_button'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'
import ViewSelector from '../src/components/ViewSelector'

function AppContent(): ReactElement {
  const {
    SwitchableBooleanCard,
    SwitchableInventoryCard,
    SwitchableArticlesCard,
    SwitchableRegistryTable,
    SwitchableCheckBoxCard,
  } = useContext( AppContext )
  const SwitchableLoginView = useSwitch( LoginView, 400 )
  useEffect( () => {
    SwitchableLoginView.call()
    setTimeout( () => {
      setStatusBarStyle( 'dark' )
      setStatusBarBackgroundColor( backgroundColor, true )
    }, 100 )
  }, [] )
  useBackButton( exit => {
    exit()
  } )
  return (
    <>
      <SwitchableArticlesCard.Component quit={ SwitchableArticlesCard.hide } />
      <SwitchableInventoryCard.Component quit={ SwitchableInventoryCard.hide } />
      <SwitchableBooleanCard.Component quit={ SwitchableBooleanCard.hide } />
      <SwitchableLoginView.Component quit={ SwitchableLoginView.hide } />
      <SwitchableRegistryTable.Component quit={ SwitchableRegistryTable.hide } />
      <SwitchableCheckBoxCard.Component quit={ SwitchableCheckBoxCard.hide } />
      <ViewSelector />
    </>
  )
}

function App(): ReactElement {
  const SwitchableBooleanCard = useSwitch( BooleanCard, 400 )
  const SwitchableInventoryCard = useSwitch( InventoryCard, 400 )
  const SwitchableArticlesCard = useSwitch( ArticlesCard, 400 )
  const SwitchableRegistryTable = useSwitch( RegistryTable, 400 )
  const SwitchableCheckBoxCard = useSwitch( CheckBoxCard, 400 )
  const [ inventoryData, setInventoryData ] = useState( {} as InventoryIndex )
  const [ [ defaultLanguage ], setDefaultLanguage ] = useState( [] as Languages[] )
  const [ unitsData, setUnitsData ] = useState( {} as Units )
  useEffect( () => {
    inventory.use( setInventoryData )
    appLanguage.use( setDefaultLanguage )
    units.use( setUnitsData )
  }, [] )
  const data: AppContextData = {
    SwitchableBooleanCard,
    SwitchableInventoryCard,
    SwitchableArticlesCard,
    SwitchableRegistryTable,
    SwitchableCheckBoxCard,
    inventoryData,
    defaultLanguage,
    setDefaultLanguage,
    unitsData,
  }
  
  return (
    <>
      <AppContext.Provider value={ data }>
        <SafeAreaView>
          <ViewportProvider>
            <LanguageProvider defaultLanguage={ defaultLanguage }>
              <AppContent />
            </LanguageProvider>
          </ViewportProvider>
        </SafeAreaView>
      </AppContext.Provider>
    </>
  )
}

export default App