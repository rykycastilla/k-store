import AccountSection from '../components/AccountSection'
import AppView from './AppView'
import BackupSection from '../components/BackupSection'
import { dockSize, margin } from '../styles.json'
import LanguageSection from '../components/LanguageSection'
import React, { ReactElement } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import UnitsSection from '../components/UnitsSection'
import useLanguage from '../hooks/language'
import { useViewport } from 'react-native-viewport-provider'
import { VIEW_BODY } from '../views/AppView'

function Margin(): ReactElement {
  return <View style={ useViewport( styles.margin ) } />
}

function SettingsBody(): ReactElement {
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <LanguageSection />
        <UnitsSection />
        <BackupSection />
        <AccountSection />
        <Margin />
      </ScrollView>
    </View>
  )
}

function SettingsView(): ReactElement {
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.settings } color>
      <SettingsBody />
    </AppView>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: `${ VIEW_BODY } - ${ dockSize }` as unknown as number,
  },
  margin: {
    width: '100%',
    height: margin as unknown as number,
  },
} )

export default SettingsView