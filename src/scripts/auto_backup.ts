import AsyncStorage from '@react-native-async-storage/async-storage'
import { DateList } from '../interfaces/history'
import { InventoryIndex } from '../interfaces/inventory'
import postBackup, { PostBackupResult } from '../services/post_backup'
import DateNumber from '../utils/DateNumber'
import session from '../interfaces/session'
import { Units } from '../interfaces/units'

const PREVIOUS_BACKUP_KEY = 'previous-backup',
  BACKUP_TIME = 604_800_000  // 7 days

async function isBackupDay(): Promise<[boolean,string]> {
  const today = DateNumber(),
    todayString: string = today.toDateString(),
    result: string | null = await AsyncStorage.getItem( PREVIOUS_BACKUP_KEY )
  if( !result ) {  // Setting this by the first backup day
    return [ true, todayString ]
  }
  const previousBackup = DateNumber( result ),
    elapsed: number = today - previousBackup
  // Verifying if today is a backup day
  const previousBackupWasToday: boolean = elapsed === 0,
    newBackupTime: boolean = elapsed >= BACKUP_TIME,
    allowBackup: boolean = previousBackupWasToday || newBackupTime
  return [ allowBackup, todayString ]
}

async function autoBackup( inventory:InventoryIndex, history:DateList, units:Units ) {
  // Verifying if the backup is needed
  const [ makeBackup, date ] = await isBackupDay()
  if( makeBackup ) {  // Making backup
    const result: PostBackupResult = await postBackup( inventory, history, units )
    const { nextToken } = result
    session.use( nextToken )
    await AsyncStorage.setItem( PREVIOUS_BACKUP_KEY, date )  // Saving backup date
  }
}

export default autoBackup