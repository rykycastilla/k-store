import AsyncStorage from '@react-native-async-storage/async-storage'
import createToken from 'create-token'
import { FunctionVoid, StateSetter } from '../types'

class Article {
  public name: string
  public weight: number
  public price: number
  public readonly id: string
  public amount = 0
  constructor( name:string, weight:number, price:number, id:string ) {
    this.name = name
    this.weight = weight
    this.price = price
    this.id = id
  }
}

interface InventoryIndex {
  [ articleId: string ]: Article,
}

type InventorySetter = StateSetter<InventoryIndex>
type InventoryPromise = Promise<InventoryIndex>

class Inventory {
  private readonly storageKey = 'inventory'
  private storage: InventoryIndex | null = null  // This property store the current inventory value
  private setInventory: InventorySetter = () => {}  // React Setter
  private readonly loadInventory: InventoryPromise
  constructor() {
    this.loadInventory = new Promise( async( resolve ) => {
      let result = await AsyncStorage.getItem( this.storageKey )
      if( !result ) { result = '{}' }
        const resultInventory = JSON.parse( result ) as InventoryIndex
        this.storage = resultInventory
        resolve( resultInventory )
    } )
  }
  // Set the ReactSetter and the storage default value
  public async use( setInventory:InventorySetter ) {
    const storage: InventoryIndex = await this.loadInventory
    this.setInventory = setInventory
    setInventory( storage )
  }
  // Change index structure, updating React State and saving persistent data, too
  private saveStorage() {
    const { storage } = this
    if( !storage ) { return }
    // Changin React State (cloning object to create a different memory value for ReactSetter)
    const newStorage = Object.assign( {}, storage )
    this.setInventory( newStorage )
    // Saving in persistent memory
    const encodeStorage: string = JSON.stringify( storage )
    AsyncStorage.setItem( this.storageKey, encodeStorage )
  }
  // Create a unique id
  private getId( storage:InventoryIndex ): string {
    let articleId: string
    // Trying to get an id if it already exist
    while( true ) {
      articleId = createToken( 7 )
      const exist = Boolean( storage[ articleId ] )
      if( !exist ) { break }
    }
    return articleId
  }
  // Say if this "name" already exist
  public async nameExist( storage:InventoryIndex, name:string, skipName?:string ): Promise<boolean> {
    let nameExist = false
    const articles: Article[] = Object.values( storage )
    for( const article of articles ) {
      if( article.name === skipName ) { continue }
      nameExist = article.name === name
      // Stop when detect the same name
      if( nameExist ) { break }
    }
    return nameExist
  }
  // Add new articles to the storage
  public async add( name:string, weight:number, price:number, _catch:FunctionVoid ) {
    const { storage } = this
    if( !storage ) { return }
    // Avoiding equal names
    const nameExist: boolean = await this.nameExist( storage, name )
    if( nameExist ) {
      _catch()
      return
    }
    // Creating id
    const id: string = this.getId( storage )
    // Saving new article
    storage[ id ] = new Article( name, weight, price, id )
    this.saveStorage()
  }
  // Delete the item with the specific "id"
  public delete( id:string ) {
    const { storage } = this
    if( !storage ) { return }
    delete storage[ id ]
    this.saveStorage()
  }
  // Edit the item with the specific "id"
  public async edit( skipName:string, newName:string, newWeight:number, newPrice:number, id:string, verifyName:boolean ) {
    const { storage } = this
    if( !storage ) { return }
    // Avoiding equal names: you can force the name verification, or avoid that using "verifyName" boolean value
    if( verifyName ) {
      const nameExist: boolean = await this.nameExist( storage, newName, skipName )
      if( nameExist ) { return }
    }
    // Editing data and saving
    const article = storage[ id ]
    article.name = newName
    article.weight = newWeight
    article.price = newPrice
    this.saveStorage()
  }
  // Modify "amount" property of "InventoryItem" from "InventoryIndex"
  public setAmount( operation:number, id:string, amount:number, _catch:FunctionVoid ) {
    const { storage } = this
    if( !storage ) { return }  // Skipping actions before loading
    if( !storage[ id ] ) { return } // Skipping if this "id" does not exist
    // Amount changes
    let { amount:result } = storage[ id ]
    result += amount * operation
    if( result < 0 ) { _catch() }
    else {
      storage[ id ].amount = result
      this.saveStorage()
    }
  }
}

const inventory = new Inventory()

export default inventory
export { InventoryIndex }