import DateNumber from '../utils/DateNumber'
import Errors from '../interfaces/Errors'
import getBackup, { GetBackupResult } from '../services/get_backup'
import history from '../interfaces/history'
import inventory from '../interfaces/inventory'
import session from '../interfaces/session'
import units from '../interfaces/units'

// Request and save the backup
async function implementBackup() {
  const backupResult: GetBackupResult = await getBackup()
  const { backup, nextToken } = backupResult
  session.use( nextToken )
  const today = DateNumber(),
    backupDate = DateNumber( backup.date )
  if( today < backupDate ) { throw( Errors.WRONG_DATE ) }  // Avoiding wrong dates
  // Saving the backup in local database
  await inventory.load( backup.inventory )
  await history.load( backup.history )
  await units.load( backup.units )
}

export default implementBackup
