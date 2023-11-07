import { AppState } from 'react-native'
import { FunctionVoid } from '../types'
import { useEffect } from 'react'

function useActive( onactived:FunctionVoid ) {
  useEffect( () => {
    const activeHandler: FunctionVoid = () => {
      const { currentState } = AppState
      if( currentState === 'active' ) { onactived() }
    }
    const listener = AppState.addEventListener( 'change', activeHandler )
    return listener.remove
  }, [ onactived ] )
}

export default useActive