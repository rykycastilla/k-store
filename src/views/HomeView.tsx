import AppContext from '../../app_context'
import AppView from './AppView'
import homeEdit from '../../assets/images/home_edit.png'
import Inventory from '../components/Inventory'
import ModifyButton from '../components/ModifyButton'
import React, { ReactElement, useContext } from 'react'

function HomeView(): ReactElement {
  const { SwitchableInventoryCard } = useContext( AppContext )
  return (
    <AppView title="Inventario" color>
      <Inventory />
      <ModifyButton image={ homeEdit } callSwitchable={ () => SwitchableInventoryCard.call() } />
    </AppView>
  )
}

export default HomeView