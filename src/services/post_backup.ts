import { BACKEND_URL } from '../env'
import { DateList } from '../interfaces/history'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import { InventoryIndex } from '../interfaces/inventory'
import session from '../interfaces/session'
import { Units } from '../interfaces/units'

interface PostBackupResult { nextToken:string }

async function postBackup( inventory:InventoryIndex, history:DateList, units:Units ): Promise<PostBackupResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }backup`,
    content = { inventory, history, units },
    config = new FetchConfig( HttpVerb.POST, content, currentSession ),
    result = await FetchConfig.request<PostBackupResult>( url, config )
  return result
}

export default postBackup
export { PostBackupResult }