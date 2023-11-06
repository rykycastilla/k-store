import { BACKEND_URL } from '../env'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import session from '../interfaces/session'

interface GetUserNameResult {
  name: string,
  nextToken: string,
}

async function getUserName(): Promise<GetUserNameResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }user/name`,
    config = new FetchConfig( HttpVerb.GET, undefined, currentSession ),
    result = await FetchConfig.request<GetUserNameResult>( url, config )
  return result
}

export default getUserName
export { GetUserNameResult }