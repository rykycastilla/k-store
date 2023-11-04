import { BACKEND_URL } from '../env'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import session from '../interfaces/session'

interface GetBackupExistResult {
  date: number | null,
  nextToken: string,
}

async function getBackupExist(): Promise<GetBackupExistResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }backup/exist`,
    config = new FetchConfig( HttpVerb.GET, undefined, currentSession ),
    result = await FetchConfig.request<GetBackupExistResult>( url, config )
  return result
}

export default getBackupExist
export { GetBackupExistResult }