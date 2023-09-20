import ArticlesView from '../../src/views/ArticlesView'
import React, { ReactElement } from 'react'
import { useLocalSearchParams } from 'expo-router'

function Views(): ReactElement {
  const { view } = useLocalSearchParams()
  let currentView = <></>
  if( view === 'articles' ) { currentView = <ArticlesView /> }
  return currentView
}

export default Views