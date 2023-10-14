import AppContext from '../../app_context'
import appLanguage from '../interfaces/app_language'
import AppView from './AppView'
import CheckBox from '../components/CheckBox'
import { CheckBoxCardCallerProps } from '../components/CheckBoxCard'
import React, { ReactElement, useContext, useState } from 'react'
import Section from '../components/Section'
import { StateSetter } from '../types'
import useLanguage, { Languages } from '../hooks/language'

type CheckBoxCardCaller = ( callerProps:CheckBoxCardCallerProps ) => void
type Option = Languages | undefined
type OptionSetter = StateSetter<Option>
type LanguageSetter = StateSetter<Languages>
type DefaultLanguageSetter = StateSetter<Languages[]>

function defaultAction( setOption:OptionSetter, setDefaultLanguage:DefaultLanguageSetter ) {
  setOption( undefined )
  appLanguage.clear()
  setDefaultLanguage( [] as Languages[] )
}

function selectAction( checkBoxCardCaller:CheckBoxCardCaller, option:Option, setOption:OptionSetter, setLanguage:LanguageSetter ) {
  const languagesList: Languages[] = [ Languages.ES, Languages.EN ]
  const callerProps: CheckBoxCardCallerProps = {
    items: [ 'Español', 'Inglés' ],
    selectedIndex: languagesList.indexOf( option as Languages ),
    action( index:number ) {
      if( index === -1 ) { return }
      const newOption: Languages = languagesList[ index ]
      setOption( newOption )
      setLanguage( newOption )
      appLanguage.change( newOption )
    }
  }
  checkBoxCardCaller( callerProps )
}

function LanguageSection(): ReactElement {
  const { defaultLanguage, setDefaultLanguage, SwitchableCheckBoxCard } = useContext( AppContext )
  const [ languageOption, setLanguageOption ] = useState<Languages|undefined>( defaultLanguage )
  const [ language, setLanguage ] = useLanguage()
  const items = [
    {
      title: language.default,
      partner: <CheckBox state={ !languageOption } />,
      action() { defaultAction( setLanguageOption, setDefaultLanguage ) },
    },
    {
      title: language.select,
      action() { selectAction( SwitchableCheckBoxCard.call, languageOption, setLanguageOption, setLanguage ) },
    },
  ]
  return (
    <Section name={ language.language } items={ items } />
  )
}

function SettingsView(): ReactElement {
  const [ language ] = useLanguage()
  return (
    <AppView title={ language.settings } color>
      <LanguageSection />
    </AppView>
  )
}

export default SettingsView