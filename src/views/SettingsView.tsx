import AppView from './AppView'
import LanguageSection from '../components/LanguageSection'
import React, { ReactElement } from 'react'
import UnitsSection from '../components/UnitsSection'
import useLanguage from '../hooks/language'

function SettingsView(): ReactElement {
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.settings } color>
      <LanguageSection />
      <UnitsSection />
    </AppView>
  )
}

export default SettingsView