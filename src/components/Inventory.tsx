import { accentTextColor, backgroundColor, fontSize, margin, textContainer } from '../styles.json'
import inventory, { InventoryIndex } from '../interfaces/inventory'
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface ItemCardProps {
  article: string,
  amount: number,
}

function ItemCard( props:ItemCardProps ): ReactElement {
  const { article, amount } = props
  return (
    <View style={ useViewport( styles.itemCard ) }>
      <Text style={ useViewport( styles.articleName ) }>{ article }</Text>
      <Text style={ useViewport( styles.amount ) }>{ amount }</Text>
    </View>
  )
}

interface ItemCardsProps { structure:InventoryIndex }

function ItemCards( props:ItemCardsProps ): ReactElement {
  const { structure } = props
  const articles: string[] = Object.keys( structure )
  const itemlist: ReactElement[] = []
  for( const article of articles ) {
    // Building each inventory item
    const { amount } = structure[ article ]
    const item = <ItemCard key={ article } article={ article } amount={ amount } />
    itemlist.push( item )
  }
  return <>{ itemlist }</>
}

function Inventory(): ReactElement {
  const [ inventoryData, setInventoryData ] = useState( {} as InventoryIndex )
  inventory.initialize( setInventoryData )
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <ItemCards structure={ inventoryData } />
      </ScrollView>
    </View>
  )
}

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 2 + ${ textContainer } )`,
  CARD_COLOR = '#F0F0F0',
  BORDER = 14

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: `${ VIEW_BODY_HEIGHT } - ( ( ${ margin } * 2 ) + 10.28vw )` as unknown as number,
  },
  itemCard: {
    width: `100vw - ${ margin } * 2` as unknown as number,
    height: '25.97vw' as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    borderRadius: BORDER,
    backgroundColor: CARD_COLOR,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  articleName: {
    height: `17.31vw - ${ margin }` as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    color: accentTextColor,
    fontSize: `${ fontSize } * 0.9` as unknown as number,
    fontWeight: '700',
  },
  amount: {
    width: '15.37vw' as unknown as number,
    height: '8.66vw' as unknown as number,
    borderTopLeftRadius: BORDER,
    borderBottomRightRadius: BORDER,
    backgroundColor: '#416864',
    color: CARD_COLOR,
    fontSize: `${ fontSize } * 0.9` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
} )

export default Inventory