import articles from '../interfaces/articles'
import { FunctionVoid } from '../types'

function createArticle( name:string, weight:string, price:string, catchName:FunctionVoid ) {
  const articleWeight = Number( weight ),
    articlePrice = Number( price )
  articles.add( name, articleWeight, articlePrice, catchName )
}

export default createArticle