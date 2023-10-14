import AsyncStorage from '@react-native-async-storage/async-storage'
import { StateSetter } from '../types'

class Storage<T> {
  protected readonly storageKey: string
  protected storage: T | null = null
  private setStorage: StateSetter<T> = () => {}  // React Setter
  private readonly loadStorage: Promise<T>
  private defaultStructure: string
  constructor( key:string, defaultStructure:string ) {
    this.defaultStructure = defaultStructure
    this.storageKey = key
    this.loadStorage = new Promise( async( resolve ) => {
      let result = await AsyncStorage.getItem( this.storageKey )
      if( !result ) { result = this.defaultStructure }
        const resultInventory = JSON.parse( result ) as T
        this.storage = resultInventory
        resolve( resultInventory )
    } )
  }
  // Set the ReactSetter and the storage default value
  public async use( setStorage:StateSetter<T> ) {
    const storage: T = await this.loadStorage
    this.setStorage = setStorage
    setStorage( storage )
  }
  // Change structure, updating React State and saving persistent data, too
  protected saveStorage() {
    const { storage, defaultStructure } = this
    if( !storage ) { return }
    // Changin React State (cloning object)
    const defaultStructureParsed: object = JSON.parse( defaultStructure )
    const newStorage = Object.assign( defaultStructureParsed, storage )
    this.setStorage( newStorage )
    // Saving in persistent memory
    const encodeStorage: string = JSON.stringify( storage )
    AsyncStorage.setItem( this.storageKey, encodeStorage )
  }
}

export default Storage