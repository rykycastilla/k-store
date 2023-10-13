import AppView from './AppView'
import React, { ReactElement } from 'react'
import useLanguage from '../hooks/language'

function SettingsView(): ReactElement {
  const [ language ] = useLanguage()
  return <AppView title={ language.settings } color />
}

export default SettingsView