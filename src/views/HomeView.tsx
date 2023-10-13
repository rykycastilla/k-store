import AppContext from '../../app_context'
import AppView from './AppView'
import homeEdit from '../../assets/images/home_edit.png'
import Inventory from '../components/Inventory'
import ModifyButton from '../components/ModifyButton'
import React, { ReactElement, useContext } from 'react'
import useLanguage from '../hooks/language'

function HomeView(): ReactElement {
  const { SwitchableInventoryCard } = useContext( AppContext )
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.inventory } color>
      <Inventory />
      <ModifyButton image={ homeEdit } callSwitchable={ () => SwitchableInventoryCard.call() } />
    </AppView>
  )
}

export default HomeView