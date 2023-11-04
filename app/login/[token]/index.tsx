import AppContext from '../../../app_context'
import React, { ReactElement, useEffect, useContext } from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import session from '../../../src/interfaces/session'
import useCheckBackup from '../../../src/hooks/check_backup'

function Login(): ReactElement {
  const { token } = useLocalSearchParams()
  const { SwitchableLoginView } = useContext( AppContext )
  useEffect( () => {
    session.use( String( token ) )  // Saving session
    setTimeout( () => {
      if( SwitchableLoginView.showing ) { SwitchableLoginView.hide() }  // Hiding LoginView
    }, 400 )
  }, [] )
  useCheckBackup()  // Calling the existing backup warning
  return <Redirect href="/" />
}

export default Login