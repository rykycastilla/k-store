import { InventoryIndex } from '../interfaces/inventory'

interface ArticleInfo {
  name: string,
  weight: number,
  price: number,
  init: number,
  input: number,
  output: number,
  end: number,
}

class TableData {
  readonly date: string
  readonly articles: ArticleInfo[] = []
  totalInput = 0
  totalOutput = 0
  earns = 0
  constructor( date:Date, inventory:InventoryIndex ) {
    // Building "date" with the format: dd/mm/yy
    const day: number = date.getDate(),
      dateName: string = date.toDateString(),
      month: number = date.getMonth() + 1,
      year: number = date.getFullYear()
    this.date = `${ day }/${ month }/${ year }`
    // Building articles registry (with info)
    const articles = Object.values( inventory )
    for( const article of articles ) {
      const { name, weight, price } = article
      // init, input, output, end
      const { amount:end, input, output } = article.history[ dateName ]
      const init: number = end - input + output  // calculating init value
      const articleInfo: ArticleInfo = { name, weight, price, init, input, output, end }
      this.articles.push( articleInfo )
      // Calculating global properties
      this.totalInput += input
      this.totalOutput += output
      this.earns += output * price
    }
  }
}

export default TableData