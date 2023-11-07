import abcOrder from '../scripts/abc_order'
import { accentTextColor, dockSize, fontSize, margin, textContainer } from '../styles.json'
import AppContext from '../../app_context'
import { InventoryCardCallerProps } from './InventoryCard'
import { InventoryIndex } from '../interfaces/inventory'
import nameFixer from '../scripts/name_fixer'
import numFixer from '../scripts/num_fixer'
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
  const { SwitchableInventoryCard, unitsData, pressing, press } = useContext( AppContext ) 
  return (
    <TouchableOpacity
      style={ useViewport( styles.itemCard ) }
      onPress={
        () => {
          if( pressing ) { return }
          press()
          // Calling the inventory card with the current item selected
          const callerProps: InventoryCardCallerProps = { defaultArticle: id }
          SwitchableInventoryCard.call( callerProps ) 
        }
      }>
      <>
        <Text style={ useViewport( styles.articleName ) }>{ nameFixer( article ) }</Text>
        <View style={ useViewport( styles.propertiesContainer ) }>
          <Text style={ useViewport( styles.properties ) }>{ numFixer( price, true, 99999 ) }{ unitsData.currency }</Text>
          <Text style={ useViewport( styles.properties ) }>{ numFixer( weight, true ) }{ unitsData.mass }</Text>
          <Text style={ useViewport( styles.amount ) }>{ numFixer( amount, undefined, 999999 ) }</Text>
        </View>
      </>
    </TouchableOpacity>
  )
}

interface ItemCardsProps { structure:InventoryIndex }

function ItemCards( props:ItemCardsProps ): ReactElement {
  const { structure } = props
  const articles = Object.values( structure ),
    orderArticles = abcOrder( articles, 'name' )
  const itemlist: ReactElement[] = []
  for( const article of orderArticles ) {
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

// This Component have the purpose of show the bottom shadow of the last "ItemCard"
function BottomMargin(): ReactElement {
  return <View style={ useViewport( styles.bottomMargin ) } />
}

function Inventory(): ReactElement {
  const { inventoryData } = useContext( AppContext )
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <ItemCards structure={ inventoryData } />
        <BottomMargin />
      </ScrollView>
    </View>
  )
}

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 2 + ${ textContainer } + ${ dockSize } )`,
  CARD_COLOR = '#F0F0F0',
  BORDER = 14,
  FONT_SIZE = '0.7',
  DATA_CONTAINER = '23.06vw'

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
    fontSize: `${ fontSize } * 0.9` as unknown as number,
    fontWeight: '700',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  properties: {
    width: DATA_CONTAINER as unknown as number,
    height: '8.66vw' as unknown as number,
    color: '#416864',
    fontSize: `${ fontSize } * ${ FONT_SIZE }` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  amount: {
    width: DATA_CONTAINER as unknown as number,
    height: '8.66vw' as unknown as number,
    borderTopLeftRadius: BORDER,
    borderBottomRightRadius: BORDER,
    backgroundColor: '#416864',
    color: CARD_COLOR,
    fontSize: `${ fontSize } * ${ FONT_SIZE }` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
    verticalAlign: 'middle',
    alignSelf: 'flex-end',
  },
  bottomMargin: {
    width: '100%',
    height: margin as unknown as number,
  },
} )

export default Inventory