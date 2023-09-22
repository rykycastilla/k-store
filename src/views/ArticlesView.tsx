import addDatabase from '../../assets/images/add_database.png'
import AppContext from '../../app_context'
import AppView from './AppView'
import ArticlesRegistry from '../components/ArticlesRegistry'
import ModifyButton from '../components/ModifyButton'
import React, { ReactElement, useContext, useEffect, useState } from 'react'

function ArticlesView(): ReactElement {
  const { SwitchableArticlesCard } = useContext( AppContext )
  return (
    <AppView title="Arículos" color>
      <ArticlesRegistry />
      <ModifyButton image={ addDatabase } callSwitchable={ SwitchableArticlesCard.call } />
    </AppView>
  )
}

export default ArticlesView