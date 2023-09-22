import { FunctionVoid } from '../types'
import Storage from '../classes/Storage'

interface InventoryItem { amount:number }

type InventoryIndex = Storage.Index<InventoryItem>
class Inventory extends Storage<InventoryItem> {
  constructor() { super( 'inventory' ) }
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
}

const inventory = new Inventory()

export default inventory
export { InventoryIndex }