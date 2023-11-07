import { BACKEND_URL } from '../env'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'

interface GetTimeResult { currentTime:number }

async function getTime(): Promise<GetTimeResult> {
  const url = `${ BACKEND_URL }time`,
    config = new FetchConfig( HttpVerb.GET ),
    result = await FetchConfig.request<GetTimeResult>( url, config )
  return result
}

export default getTime
export { GetTimeResult }