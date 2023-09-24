import createToken from 'create-token'
import { FunctionVoid } from '../types'
import Storage from '../classes/Storage'

class Article {
  name: string
  weight: number
  price: number
  id: string
  constructor( name:string, weight:number, price:number, id:string ) {
    this.name = name
    this.weight = weight
    this.price = price
    this.id = id
  }
}

type ArticlesIndex = Storage.Index<Article>

class Articles extends Storage<Article> {
  constructor() { super( 'articles' ) }
  // Create a unique id
  private getId( storage:ArticlesIndex ): string {
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
  public async nameExist( name:string, skipName?:string ): Promise<boolean> {
    await this.loadIndex
    const { storage } = this
    if( !storage ) { return false }
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
    const nameExist: boolean = await this.nameExist( name )
    if( nameExist ) {
      _catch()
      return
    }
    // Creating id
    const id: string = this.getId( storage )
    // Saving new article
    storage[ id ] = new Article( name, weight, price, id )
    this.storage = storage
  }
  // Delete the item with the specific "id"
  public delete( id:string ) {
    const { storage } = this
    if( !storage ) { return }
    delete storage[ id ]
    this.storage = storage
  }
  // Edit the item with the specific "id"
  public async edit( skipName:string, newName:string, newWeight:number, newPrice:number, id:string, verifyName:boolean ) {
    const { storage } = this
    if( !storage ) { return }
    // Avoiding equal names: you can force the name verification, or avoid that using "verifyName" boolean value
    if( verifyName ) {
      const nameExist: boolean = await this.nameExist( newName, skipName )
      if( nameExist ) {
        return
      }
    }
    // Editing data and saving
    storage[ id ] = new Article( newName, newWeight, newPrice, id )
    this.storage = storage
  }
}

const articles = new Articles()

export default articles
export { ArticlesIndex }