import AsyncStorage from '@react-native-async-storage/async-storage'
import { StateSetter } from '../types'

module Storage {
  export interface Index<T> {
    [ key: string ]: T,
  }
}

type Index<T> = Storage.Index<T>
type IndexSetter<T> = StateSetter<Index<T>>
type IndexPromise<T> = Promise<Index<T>>

class Storage<T> {
  private readonly storageToken: string  // Name of the key at persistant storage
  private data: Index<T> | null = null  // This property store the current index
  private setIndex: IndexSetter<T> = () => {}  // React Setter
  private readonly loadIndex: IndexPromise<T>
  constructor( storageToken:string ) {
    this.storageToken = storageToken
    this.loadIndex = new Promise( async( resolve ) => {
      let result = await AsyncStorage.getItem( this.storageToken )
      // Incluiding by default an empty object
      if( !result ) { result = '{}' }
      const resultInventory = JSON.parse( result ) as Index<T>
      resolve( resultInventory )
    } )
  }
  // Set the ReactSetter and the storage default value
  public async initialize( setIndex:IndexSetter<T> ) {
    const index = await this.loadIndex
    this.setIndex = setIndex
    this.setIndex( index )
    this.storage = index
  }
  // Change index structure, updating React State and saving persistent data, too
  protected set storage( storageValue:Index<T>|null ) {
    if( !storageValue ) { return }
    this.data = storageValue
    this.setIndex( storageValue )
    const encodeStorage: string = JSON.stringify( storageValue )
    AsyncStorage.setItem( this.storageToken, encodeStorage )
  }
  protected get storage(): Index<T> | null {
    return this.data
  }
}

export default Storage