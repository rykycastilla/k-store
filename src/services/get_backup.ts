import { BACKEND_URL } from '../env'
import { DateList } from '../interfaces/history'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import { InventoryIndex } from '../interfaces/inventory'
import session from '../interfaces/session'
import { Units } from '../interfaces/units'

interface Backup {
  inventory: InventoryIndex,
  history: DateList,
  units: Units
  date: number,
}

interface GetBackupResult {
  backup: Backup,
  nextToken: string,
}

async function getBackup(): Promise<GetBackupResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }backup`,
    config = new FetchConfig( HttpVerb.GET, undefined, currentSession ),
    result = await FetchConfig.request<GetBackupResult>( url, config )
  return result
}

export default getBackup
export { Backup, GetBackupResult }