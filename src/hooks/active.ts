import { AppState } from 'react-native'
import { FunctionVoid } from '../types'
import { useEffect, useMemo } from 'react'

function useActive( onactived:FunctionVoid ) {
  const activeHandler: FunctionVoid = useMemo( () => {
    return () => {
      const { currentState } = AppState
      if( currentState === 'active' ) { onactived() }
    }
  }, [ onactived ] )
  useEffect( () => activeHandler(), [] )  // Executing for the first time
  // Updating callback
  useEffect( () => {
    const listener = AppState.addEventListener( 'change', activeHandler )
    return listener.remove
  }, [ onactived ] )
}

export default useActive