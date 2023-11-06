import { BACKEND_URL } from '../env'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import session from '../interfaces/session'

async function deleteUser() {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }user`,
    config = new FetchConfig( HttpVerb.DELETE, undefined, currentSession )
  await FetchConfig.request( url, config )
}

export default deleteUser
