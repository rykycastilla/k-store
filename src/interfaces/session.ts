import AsyncStorage from '@react-native-async-storage/async-storage'

class Session {
  
  private readonly key = 'session'
  private current: string | null = null
  private readonly load: Promise<string|null>

  constructor() {
    this.load = AsyncStorage.getItem( this.key )
    this.load.then( encodeResult => {
      const result: string | null = encodeResult
        ? JSON.parse( encodeResult )
        : null
      this.current = result
    } )
  }

  private save() {
    const { key, current } = this
    const encodeData: string = JSON.stringify( current )
    AsyncStorage.setItem( key, encodeData )
  }

  public async use( newSession:string ) {
    await this.load
    this.current = newSession
    this.save()
  }

  public async get(): Promise<string|null> {
    await this.load
    return this.current
  }

  public forget() {
    this.current = null
    this.save()
  }

}

const session = new Session()

export default session