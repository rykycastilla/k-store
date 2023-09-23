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
  // Add new articles to the storage
  public add( name:string, weight:number, price:number, _catch:FunctionVoid ) {
    const { storage } = this
    if( !storage ) { return }
    // Avoiding equal names
    let nameExist = false
    const articles: Article[] = Object.values( storage )
    for( const article of articles ) {
      nameExist = article.name === name
      if( nameExist ) {
        _catch()
        return
      }
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
}

const articles = new Articles()

export default articles
export { ArticlesIndex }