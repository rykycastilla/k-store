import AppView from './AppView'
import BackupSection from '../components/BackupSection'
import LanguageSection from '../components/LanguageSection'
import React, { ReactElement } from 'react'
import { ScrollView } from 'react-native'
import UnitsSection from '../components/UnitsSection'
import useLanguage from '../hooks/language'

function SettingsView(): ReactElement {
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.settings } color>
      <ScrollView>
        <LanguageSection />
        <UnitsSection />
        <BackupSection />
      </ScrollView>
    </AppView>
  )
}

export default SettingsView