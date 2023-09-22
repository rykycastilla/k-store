import addDatabase from '../../assets/images/add_database.png'
import AppContext from '../../app_context'
import AppView from './AppView'
import articles, { ArticlesIndex } from '../interfaces/articles'
import ModifyButton from '../components/ModifyButton'
import React, { ReactElement, useContext, useEffect, useState } from 'react'

function ArticlesView(): ReactElement {
  const { SwitchableArticlesCard } = useContext( AppContext )
  const [ articlesData, setArticlesData ] = useState( {} as ArticlesIndex )
  useEffect( () => {
    articles.initialize( setArticlesData )
  }, [] )
  return (
    <AppView title="Arículos" color>
      <ModifyButton image={ addDatabase } callSwitchable={ SwitchableArticlesCard.call } />
    </AppView>
  )
}

export default ArticlesView