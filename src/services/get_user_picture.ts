import { BACKEND_URL } from '../env'
import Errors from '../interfaces/Errors'
import FetchConfig, { HttpVerb } from '../classes/FetchConfig'
import session from '../interfaces/session'

type GetUserPictureResult = string

async function getUserPicture(): Promise<GetUserPictureResult> {
  const currentSession: string | null = await session.get()
  if( !currentSession ) { throw( Errors.FORBIDDEN ) }
  const url = `${ BACKEND_URL }user/picture`,
    config = new FetchConfig( HttpVerb.GET, undefined, currentSession ),
    result = await FetchConfig.requestImage( url, config ),
    reader = new FileReader()
    // Extracting base64 data from the image file
  const loadingImage: Promise<GetUserPictureResult> = new Promise( resolve => {
    reader.onload = () => {
      const readerResult = reader.result as unknown as GetUserPictureResult
      resolve( readerResult )
    }
    reader.readAsDataURL( result )
  } )
  const imageBase64 = await loadingImage
  return imageBase64
}

export default getUserPicture
export { GetUserPictureResult }