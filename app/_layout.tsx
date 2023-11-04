import AppContext, { AppContextData } from '../app_context'
import appLanguage from '../src/interfaces/app_language'
import ArticlesCard from '../src/components/ArticlesCard'
import autoBackup from '../src/scripts/auto_backup'
import { backgroundColor } from '../src/styles.json'
import BooleanCard from '../src/components/BooleanCard'
import CheckBoxCard from '../src/components/CheckBoxCard'
import history, { DateList } from '../src/interfaces/history'
import inventory, { InventoryIndex } from '../src/interfaces/inventory'
import InventoryCard from '../src/components/InventoryCard'
import { LanguageProvider } from '../src/hooks/language'
import { Languages } from '../src/hooks/language'
import LoadingWall from '../src/components/LoadingWall'
import LoginView from '../src/views/LoginView'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import RegistryTable from '../src/components/RegistryTable'
import { SafeAreaView } from 'react-native-safe-area-context'
import session from '../src/interfaces/session'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import units, { Units } from '../src/interfaces/units'
import useBackButton from '../src/hooks/back_button'
import useSwitch from 'react-component-switcher'
import ViewportProvider from 'react-native-viewport-provider'
import ViewSelector from '../src/components/ViewSelector'
import useInactive from '../src/hooks/inactive'

type AsyncFunction = () => Promise<void>

function AppContent(): ReactElement {
  const {
    SwitchableBooleanCard,
    SwitchableInventoryCard,
    SwitchableArticlesCard,
    SwitchableRegistryTable,
    SwitchableCheckBoxCard,
    SwitchableLoginView,
    SwitchableLoadingWall
  } = useContext( AppContext )
  useEffect( () => {
    // Using login if the session does not exists
    const loginRequired: AsyncFunction = async() => {
      const currentSession = await session.get()
      if( !currentSession ) {
        SwitchableLoginView.call()
      }
    }
    loginRequired() 
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
      <SwitchableLoadingWall.Component quit={ SwitchableLoadingWall.hide } />
      <ViewSelector />
    </>
  )
}

function App(): ReactElement {
  const SwitchableLoginView = useSwitch( LoginView, 400 )
  const SwitchableBooleanCard = useSwitch( BooleanCard, 400 )
  const SwitchableInventoryCard = useSwitch( InventoryCard, 400 )
  const SwitchableArticlesCard = useSwitch( ArticlesCard, 400 )
  const SwitchableRegistryTable = useSwitch( RegistryTable, 400 )
  const SwitchableCheckBoxCard = useSwitch( CheckBoxCard, 400 )
  const SwitchableLoadingWall = useSwitch( LoadingWall, 250 )
  const [ pressing, setPressing ] = useState( false )
  const press = () => {
    setPressing( true )
    setTimeout( () => {
      setPressing( false )
    }, 500 )
  }
  const [ inventoryData, setInventoryData ] = useState( {} as InventoryIndex )
  const [ [ defaultLanguage ], setDefaultLanguage ] = useState( [] as Languages[] )
  const [ unitsData, setUnitsData ] = useState( {} as Units )
  const [ historyData, setHistoryData ] = useState( [] as DateList )
  useEffect( () => {
    inventory.use( setInventoryData )
    appLanguage.use( setDefaultLanguage )
    history.use( setHistoryData )
    units.use( setUnitsData )
  }, [] )
  const data: AppContextData = {
    SwitchableLoginView,
    SwitchableBooleanCard,
    SwitchableInventoryCard,
    SwitchableArticlesCard,
    SwitchableRegistryTable,
    SwitchableCheckBoxCard,
    SwitchableLoadingWall,
    inventoryData,
    historyData,
    defaultLanguage,
    setDefaultLanguage,
    unitsData,
    pressing,
    press,
  }
  useInactive( () => autoBackup( inventoryData, historyData, unitsData ) )  // Making backups automatically
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