import { BACKEND_URL } from '../env'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import session from '../interfaces/session'

interface GetUserEmailResult {
  email: string,
  nextToken: string,
}

async function getUserEmail(): Promise<GetUserEmailResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }user/email`,
    config = new FetchConfig( HttpVerb.GET, undefined, currentSession ),
    result = await FetchConfig.request<GetUserEmailResult>( url, config )
  return result
}

export default getUserEmail
export { GetUserEmailResult }