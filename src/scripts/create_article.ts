import { FunctionVoid } from '../types'
import inventory from '../interfaces/inventory'

function createArticle( name:string, weight:string, price:string, catchName:FunctionVoid ) {
  const articleWeight = Number( weight ),
    articlePrice = Number( price )
  inventory.add( name, articleWeight, articlePrice, catchName )
}

export default createArticle