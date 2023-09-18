import AsyncStorage from '@react-native-async-storage/async-storage'
import { FunctionVoid, StateSetter } from '../types'

interface InventoryItem { amount:number }

interface InventoryIndex {
  [ article: string ]: InventoryItem,
}

type InventorySetter = StateSetter<InventoryIndex>

class Inventory {
  private storageToken = 'inventory'
  private data: InventoryIndex | null = null
  private setInventory: InventorySetter = () => {}
  private loadInventory: Promise<InventoryIndex>
  public get loaded(): boolean {
    return Boolean( this.storage )
  }
  constructor() {
    this.loadInventory = new Promise( async( resolve ) => {
      let result = await AsyncStorage.getItem( this.storageToken )
      if( !result ) { result = '{}' }
      const resultInventory = JSON.parse( result ) as InventoryIndex
      resolve( resultInventory )
    } )
  }
  // Set the ReactSetter and the storage default value
  public async initialize( setInventory:InventorySetter ) {
    const inventory = await this.loadInventory
    this.setInventory = setInventory
    this.setInventory( inventory )
    this.storage = inventory
  }
  // Modify "amount" property of "InventoryItem" from "InventoryIndex"
  public setAmount( operation:number, article:string, amount:number, _catch:FunctionVoid ) {
    const { storage } = this
    if( !storage ) { return }  // Skipping actions before loading
    if( !storage[ article ] ) {  // this action is only for test
      storage[ article ] = { amount: 0 }
    }
    // Amount changes
    let { amount:result } = storage[ article ]
    result += amount * operation
    if( result < 0 ) { _catch() }
    else {
      storage[ article ].amount = result
      this.storage = storage
    }
  }  
  // Change inventory structure, updating React State and saving persistent data, too
  private set storage( storageValue:InventoryIndex|null ) {
    if( !storageValue ) { return }
    this.data = storageValue
    this.setInventory( storageValue )
    const encodeStorage: string = JSON.stringify( storageValue )
    AsyncStorage.setItem( this.storageToken, encodeStorage )
  }
  private get storage(): InventoryIndex | null {
    return this.data
  }
}

const inventory = new Inventory()

export default inventory
export { InventoryIndex }