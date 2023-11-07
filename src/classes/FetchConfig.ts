import Errors from '../interfaces/Errors'

interface Error {
  error: Errors,
}

enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Headers {
  [ key: string ]: string
}

class FetchConfig {
  
  cache: RequestCache = 'no-store'
  method: HttpVerb
  headers: Headers = {}
  body?: string
  
  constructor( method:HttpVerb, content?:object, token?:string ) {
    this.method = method
    if( content ) {
      this.headers[ 'Content-Type' ] = 'application/json'
      this.body = JSON.stringify( content )
    }
    if( token ) { this.headers[ 'Authorization' ] = token }
  }

  public static async request<T>( url:string, config:FetchConfig ): Promise<T> {
    try {
      // Making request
      const res: Response = await fetch( url, config ),
        result: object = await res.json()
      if( !res.ok ) {  // Checking request status
        const error = result as Error
        throw( error.error )
      }
      return result as object & T  // Sending successfully request
    }
    catch( err ) {
      // Handling request failure
      const message: string = ( typeof err === 'string' )
        ? err
        : Errors.NETWORK_FAILURE
      return Promise.reject( message )
    }
  }

  public static async requestImage( url:string, config:FetchConfig ): Promise<Blob> {
    try {
      // Making request
      const res: Response = await fetch( url, config )
      if( !res.ok ) {  // Checking request status
        const result = await res.json(),
          error = result as Error
        throw( error.error )
      }
      const file: Blob = await res.blob()
      // Setting file type
      const type = 'image/png',
        image = new Blob( [ file ], { type } )
      return image // Sending successfully request
    }
    catch( err ) {
      // Handling request failure
      const message: string = ( typeof err === 'string' )
        ? err
        : Errors.NETWORK_FAILURE
      return Promise.reject( message )
    }
  }

}

export default FetchConfig
export { HttpVerb }