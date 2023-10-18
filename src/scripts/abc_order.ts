interface Structure {
  [ property: string ]: string
}

type IndexedObject<T> = object & T
type Index<T> = IndexedObject<T>[]

function abcOrder<T>( index:Index<T>, property:string ): T[] {
  const order = Object.assign( [], index ) as Structure[]
  order.sort( ( previous, next ) => {
    return previous[ property ] > next[ property ]
      ? 1
      : -1
  } )
  return order as unknown as T[]
}

export default abcOrder