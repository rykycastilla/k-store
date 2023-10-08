import AppView from './AppView'
import React, { ReactElement } from 'react'
import Registry from '../components/Registry'

function RegistryView(): ReactElement {
  return (
    <AppView title="Registros" color>
      <Registry />
    </AppView>
  )
}

export default RegistryView