import { accentTextColor, dockSize, fontSize, margin, textContainer } from '../styles.json'
import AppContext from '../../app_context'
import { InventoryCardCallerProps } from './InventoryCard'
import { InventoryIndex } from '../interfaces/inventory'
import React, { ReactElement, useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface ItemCardProps {
  article: string,
  price: number,
  weight: number,
  amount: number,
  id: string,
}

function ItemCard( props:ItemCardProps ): ReactElement {
  const { article, price, weight, amount, id } = props
  const { SwitchableInventoryCard } = useContext( AppContext ) 
  return (
    <TouchableOpacity
      style={ useViewport( styles.itemCard ) }
      onPress={
        () => {
          // Calling the inventory card with the current item selected
          const callerProps: InventoryCardCallerProps = { defaultArticle: id }
          SwitchableInventoryCard.call( callerProps ) 
        }
      }>
      <Text style={ useViewport( styles.articleName ) }>{ article }</Text>
      <View style={ useViewport( styles.propertiesContainer ) }>
        <Text style={ useViewport( styles.properties ) }>{ price }$</Text>
        <Text style={ useViewport( styles.properties ) }>{ weight }Kg</Text>
        <Text style={ useViewport( styles.amount ) }>{ amount }</Text>
      </View>
    </TouchableOpacity>
  )
}

interface ItemCardsProps { structure:InventoryIndex }

function ItemCards( props:ItemCardsProps ): ReactElement {
  const { structure } = props
  const articles = Object.values( structure )
  const itemlist: ReactElement[] = []
  for( const article of articles ) {
    // Building each inventory item
    const { name, price, weight, amount, id } = article
    const item =
      <ItemCard
        key={ id }
        article={ name }
        price={ price }
        weight={ weight }
        amount={ amount }
        id={ id } />
    itemlist.push( item )
  }
  return <>{ itemlist }</>
}

function Inventory(): ReactElement {
  const { inventoryData } = useContext( AppContext )
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <ItemCards structure={ inventoryData } />
      </ScrollView>
    </View>
  )
}

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 2 + ${ textContainer } + ${ dockSize } )`,
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
  propertiesContainer: {
    height: '8.66vw' as unknown as number,
    width: '46.11vw' as unknown as number,
    fontSize: `${ fontSize } * 0.9` as unknown as number,
    fontWeight: '700',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  properties: {
    width: '15.37vw' as unknown as number,
    height: '8.66vw' as unknown as number,
    color: '#416864',
    fontSize: `${ fontSize } * 0.9` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
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