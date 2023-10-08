import ArticleInfo from './ArticleInfo'
import history from '../interfaces/history'

interface HistoryIndex {
  [ date: string ]: ArticleInfo,
}

class Article {
  readonly id: string
  name: string
  weight: number
  price: number
  amount = 0
  history: HistoryIndex = {}
  constructor( name:string, weight:number, price:number, id:string ) {
    this.name = name
    this.weight = weight
    this.price = price
    this.id = id
    // Creating empty history for previous dates
    const { storage } = history
    if( storage ) {
      const dates = Object.values( storage )
      for( const date of dates ) {
        this.history[ date ] = new ArticleInfo()
      }
    }
  }
}

export default Article