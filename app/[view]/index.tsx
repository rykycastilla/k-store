import ArticlesView from '../../src/views/ArticlesView'
import React, { ReactElement } from 'react'
import RegistryView from '../../src/views/RegistryView'
import { useLocalSearchParams } from 'expo-router'

function Views(): ReactElement {
  const { view } = useLocalSearchParams()
  let currentView = <></>
  switch( view ) {
    case 'articles':
      currentView = <ArticlesView />
      break
    case 'registry':
      currentView = <RegistryView />
      break
  }
  return currentView
}

export default Views