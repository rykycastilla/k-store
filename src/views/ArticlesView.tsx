import addDatabase from '../../assets/images/add_database.png'
import AppContext from '../../app_context'
import AppView from './AppView'
import ArticlesRegistry from '../components/ArticlesRegistry'
import ModifyButton from '../components/ModifyButton'
import React, { ReactElement, useContext } from 'react'
import useLanguage from '../hooks/language'

function ArticlesView(): ReactElement {
  const { SwitchableArticlesCard } = useContext( AppContext )
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.articles } color>
      <ArticlesRegistry />
      <ModifyButton image={ addDatabase } callSwitchable={ () => SwitchableArticlesCard.call() } />
    </AppView>
  )
}

export default ArticlesView