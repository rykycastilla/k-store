import { AppState } from 'react-native'
import { FunctionVoid } from '../types'
import { useEffect } from 'react'

function useInactive( oninactived:FunctionVoid ) {
  useEffect( () => {
    const inactiveHandler: FunctionVoid = () => {
      const { currentState } = AppState
      if( currentState === 'background' ) { oninactived() }
    }
    const listener = AppState.addEventListener( 'change', inactiveHandler )
    return listener.remove
  }, [ oninactived ] )
}

export default useInactive