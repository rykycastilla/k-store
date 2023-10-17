import Article from '../classes/Article'
import ArticleInfo from '../classes/ArticleInfo'
import createToken from 'create-token'
import { FunctionVoid } from '../types'
import history, { UpdateCallback } from './history'
import Storage from '../classes/Storage'

interface InventoryIndex {
  [ articleId: string ]: Article,
}

class Inventory extends Storage<InventoryIndex> {
  public storage = super.storage
  constructor() {
    super( 'inventory', '{}' )
  }
  // Create a unique id
  private getId( storage:InventoryIndex ): string {
    let articleId = ''
    // Trying to get an id if it already exist
    const execute = true
    while( execute ) {
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
  // Create a new instance (based on today) for every article in inventory
  private updateHistory( storage:InventoryIndex, lastDate:string, date:string ) {
    const articles = Object.values( storage )
    for( const article of articles ) {
      const savedInfo = article.history[ lastDate ]
      // Taking the amount of the latest date to init the current date
      if( savedInfo ) {
        const { amount } = savedInfo
        article.history[ date ] = new ArticleInfo( amount )
      }
      else {
        article.history[ date ] = new ArticleInfo()
      }
    }
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
      // Including today in "registries"
      const updateCallback: UpdateCallback = ( lastDate:string, today:string ) => {
        this.updateHistory( storage, lastDate, today )
      }
      const today = history.update( updateCallback )
      if( !today ) { return }  // Avoiding unloaded history
      // Setting input/output amount differences
      const todayRegistry: ArticleInfo = storage[ id ].history[ today ]
      // operation is 1 when amount is increasing
      if( operation > 0 ) {
        todayRegistry.input += amount
      }
      else {
        todayRegistry.output += amount
      }
      // continue here ...
      // Saving if "amount" is valid
      storage[ id ].amount = result
      todayRegistry.amount = result
      this.saveStorage()
    }
  }
}

const inventory = new Inventory()

export default inventory
export { InventoryIndex }