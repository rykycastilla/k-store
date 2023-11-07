import AppContext from '../../app_context'
import { FunctionVoid, SBC, SLW } from '../types'
import getBackupExist, { GetBackupExistResult } from '../services/get_backup_exist'
import loadBackup from '../scripts/load_backup'
import { useContext, useEffect } from 'react'
import useLanguage, { Language } from '../hooks/language'

async function checkBackup( BooleanCard:SBC, LoadingWall:SLW, language:Language ) {
  const result: GetBackupExistResult = await getBackupExist()
  const { date } = result
  if( date ) {
    const restoreWarning = language.backupExistsWarning
    loadBackup( BooleanCard, LoadingWall, restoreWarning, language )
  }
}

let callCard: FunctionVoid = () => { return }
setTimeout( () => {
  if( callCard ) { callCard() }
}, 1500 )

function useCheckBackup() {
  const { SwitchableBooleanCard, SwitchableLoadingWall } = useContext( AppContext )
  const [ language ] = useLanguage()
  useEffect( () => {
    // Saving the function to load when needed
    callCard = () => checkBackup( SwitchableBooleanCard, SwitchableLoadingWall, language )
  }, [ language ] )
}

export default useCheckBackup