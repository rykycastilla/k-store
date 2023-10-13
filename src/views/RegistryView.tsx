import AppView from './AppView'
import React, { ReactElement } from 'react'
import Registry from '../components/Registry'
import useLanguage from '../hooks/language'

function RegistryView(): ReactElement {
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.registries } color>
      <Registry />
    </AppView>
  )
}

export default RegistryView