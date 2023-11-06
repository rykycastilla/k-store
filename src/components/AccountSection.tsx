import { alertColor } from '../styles.json'
import AppContext from '../../app_context'
import forgetSession from '../scripts/forget_session'
import openProfile from '../scripts/open_profile'
import React, { ReactElement, useContext } from 'react'
import Section from './Section'

function BackupSection(): ReactElement {
  const { SwitchableBooleanCard, SwitchableLoadingWall, SwitchableProfileView } = useContext( AppContext )
  const items = [
    {
      title: 'Profile',
      action() { openProfile( SwitchableLoadingWall, SwitchableProfileView ) }
    },
    {
      title: 'Log Out',
      color: alertColor,
      action() { forgetSession( SwitchableBooleanCard ) }
    },
  ]
  return <Section name="Account" items={ items } />
}

export default BackupSection