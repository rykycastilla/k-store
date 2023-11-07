import Language from '../languages/type'
import { NativeModules } from 'react-native'
import React, { createContext, ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import { StateSetter } from '../types'
import { useLocales } from 'expo-localization'

import english from '../languages/english.json'
import spanish from '../languages/spanish.json'

enum Languages {
  EN = 'en',
  ES = 'es',
}

type LanguageSetter = StateSetter<Languages>

interface LangCodeState {
  langCode: Languages,
  setLangCode: LanguageSetter,
}

const LanguageContext = createContext( {} as LangCodeState )

interface LanguageProviderProps {
  children:ReactElement,
  defaultLanguage?: Languages,
}

function LanguageProvider( props:LanguageProviderProps ): ReactElement {
  const { children, defaultLanguage } = props
  const [ langCode, setLangCode ] = useState( Languages.EN )
  const data: LangCodeState = {
    langCode,
    setLangCode,
  }
  NativeModules.I18nManager.localeIdentifier
  const [ { languageCode:deviceLanguage } ] = useLocales()
  useEffect( () => {
    if( defaultLanguage ) { setLangCode( defaultLanguage ) }
    else {
      switch( deviceLanguage ) {
      case 'en':
        setLangCode( Languages.EN )
        break
      case 'es':
        setLangCode( Languages.ES )
        break
      default:
        setLangCode( Languages.EN )
      }
    }
  }, [ deviceLanguage, defaultLanguage ] )
  return (
    <LanguageContext.Provider value={ data }>
      { children }
    </LanguageContext.Provider>
  )
}

function useLanguage(): [ Language, LanguageSetter ] {
  const { langCode, setLangCode } = useContext( LanguageContext )
  const language = useMemo( () => {
    switch( langCode ) {
    case Languages.EN:
      return english
    case Languages.ES:
      return spanish
    default:
      return english
    }
  }, [ langCode ] ) as Language
  return [ language, setLangCode ]
}

export default useLanguage
export { Language, LanguageProvider, Languages }