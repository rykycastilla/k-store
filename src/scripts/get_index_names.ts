import { InventoryIndex } from '../interfaces/inventory'

interface IndexNames {
  names: string[],
  ids: string[],
}

function getIndexNames( inventory:InventoryIndex ): IndexNames {
  const names: string[] = [],
    ids: string[] = []
  const articles = Object.values( inventory )
  // Getting names and ids from the inventory
  for( const article of articles ) {
    const { name, id } = article
    names.push( name )
    ids.push( id )
  }
  const result: IndexNames = {
    names: names,
    ids: ids,
  }
  return result
}

export default getIndexNames