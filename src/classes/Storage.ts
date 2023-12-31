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
    this.loadStorage = new Promise( ( resolve ) => {
      AsyncStorage.getItem( this.storageKey )
        .then( result => {
          if( !result ) { result = this.defaultStructure }
          const resultInventory = JSON.parse( result ) as T
          this.storage = resultInventory
          resolve( resultInventory )
        } )
    } )
  }

  // Set the ReactSetter and the storage default value
  public async use( setStorage:StateSetter<T> ) {
    const storage: T = await this.loadStorage
    this.setStorage = setStorage
    setStorage( storage )
  }

  // Change structure, updating React State and saving persistent data, too
  protected async saveStorage() {
    const { storage, defaultStructure } = this
    if( !storage ) { return }
    // Changin React State (cloning object)
    const defaultStructureParsed: object = JSON.parse( defaultStructure )
    const newStorage = Object.assign( defaultStructureParsed, storage )
    this.setStorage( newStorage )
    // Saving in persistent memory
    const encodeStorage: string = JSON.stringify( storage )
    await AsyncStorage.setItem( this.storageKey, encodeStorage )
  }

  // Replae all the storage data
  public async load( newStorage:T ) {
    if( !this.storage ) { return }
    this.storage = newStorage
    await  this.saveStorage()
  }

}

export default Storage