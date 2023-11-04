import AppContext from '../../app_context'
import getBackupExist, { GetBackupExistResult } from '../services/get_backup_exist'
import loadBackup from '../scripts/load_backup'
import { SBC, SLW } from '../types'
import { useContext, useEffect } from 'react'

async function checkBackup( BooleanCard:SBC, LoadingWall:SLW ) {
  const result: GetBackupExistResult = await getBackupExist()
  const { date } = result
  if( date ) {
    const restoreWarning = 'This account already have a backup, Do you want to use it?'
    loadBackup( BooleanCard, LoadingWall, restoreWarning )
  }
}

function useCheckBackup() {
  const { SwitchableBooleanCard, SwitchableLoadingWall } = useContext( AppContext )
  useEffect( () => {
    checkBackup( SwitchableBooleanCard, SwitchableLoadingWall )
  }, [] )
}

export default useCheckBackup