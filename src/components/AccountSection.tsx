import { alertColor } from '../styles.json'
import AppContext from '../../app_context'
import forgetSession from '../scripts/forget_session'
import openProfile from '../scripts/open_profile'
import React, { ReactElement, useContext } from 'react'
import Section from './Section'
import useLanguage from '../hooks/language'

function BackupSection(): ReactElement {
  const { SwitchableBooleanCard, SwitchableLoadingWall, SwitchableProfileView } = useContext( AppContext )
  const [ language ] = useLanguage()
  const items = [
    {
      title: language.profile,
      action() { openProfile( SwitchableLoadingWall, SwitchableProfileView ) }
    },
    {
      title: language.logOut,
      color: alertColor,
      action() { forgetSession( SwitchableBooleanCard, language ) }
    },
  ]
  return <Section name={ language.account } items={ items } />
}

export default BackupSection