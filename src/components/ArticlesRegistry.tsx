import AppContext from '../../app_context'
import ArticleButton from './ArticleButton'
import { ArticlesCardCallerProps } from './ArticlesCard'
import { BooleanCardCallerProps } from './BooleanCard'
import deleteIcon from '../../assets/images/delete_icon.png'
import { dockSize, fontSize, margin, textColor, textContainer } from '../styles.json'
import editIcon from '../../assets/images/edit_icon.png'
import inventory, { InventoryIndex } from '../interfaces/inventory'
import React, { ReactElement, useContext } from 'react'
import { SBC } from '../types'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import useSwitch, { CallFunction } from 'react-component-switcher'
import { useViewport } from 'react-native-viewport-provider'

function deleteAction( id:string, BooleanCard:SBC ) {
  const callerProps: BooleanCardCallerProps = {
    text: '¿Desea eliminar este artículo?\nLos datos de los registros serán preservados',
    action() { inventory.delete( id ) }
  }
  BooleanCard.call( callerProps )
}

type CallArticlesCard = CallFunction<ArticlesCardCallerProps>

function editAction( id:string, name:string, weight:string, price:string, call:CallArticlesCard ) {
  const callerProps: ArticlesCardCallerProps = {
    articleId: id,
    defaultName: name,
    defaultWeight: weight,
    defaultPrice: price,
  }
  call( callerProps )
}

interface ArticleItemProps {
  name: string,
  weight: number,
  price: number,
  id: string,
  top?: boolean,
}

function ArticleItem( props:ArticleItemProps ): ReactElement {
  const { name, weight, price, id, top } = props
  const title: string = `    - ${ name } (${ weight }Kg, ${ price }$)`
  const { SwitchableBooleanCard, SwitchableArticlesCard } = useContext( AppContext )
  const SwitchableDeleteButton = useSwitch( ArticleButton, 100 )
  const SwitchableEditButton = useSwitch( ArticleButton, 100 )
  const topStyle: object = top
    ? { borderTopWidth: 2, borderTopColor: '#CACACA' }
    : {}
  return (
    <Pressable
      style={ [ useViewport( styles.articleItem ), topStyle ] }
      onPress={
        () => {
          // Switching between "show" and "hide" buttons to press the container
          if( SwitchableDeleteButton.showing && SwitchableEditButton.showing ) {
              SwitchableDeleteButton.hide()
              SwitchableEditButton.hide()
            } else {
              SwitchableDeleteButton.call()
              SwitchableEditButton.call()
          }
        }
      }>
      <Text style={ useViewport( styles.articleName ) }>{ title }</Text>
      <SwitchableDeleteButton.Component
        image={ deleteIcon }
        action={
          () => deleteAction( id, SwitchableBooleanCard )
        } />
        <SwitchableEditButton.Component
        image={ editIcon }
        action={
          () => {
            const textWeight = String( weight ),
              textPrice = String( price )
            editAction( id, name, textWeight, textPrice, SwitchableArticlesCard.call )
          }
        } />
    </Pressable>
  )
}

interface ArticleItemListProps { structure:InventoryIndex }

function ArticleItemList( props:ArticleItemListProps ): ReactElement {
  const { structure } = props
  const articles = Object.values( structure )
  const itemList: ReactElement[] = []
  let first = true
  for( const article of articles ) {
    // Building each article item
    const { name, weight, price, id } = article
    // "top" prop (top styling) is only true for the "first" time
    const item: ReactElement =
      <ArticleItem key={ id } id={ id } name={ name } weight={ weight } price={ price } top={ first } />
    itemList.push( item )
    first = false
  }
  return <>{ itemList }</>
}

function ArticlesRegistry(): ReactElement {
  const { inventoryData } = useContext( AppContext )
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <ArticleItemList structure={ inventoryData } />
      </ScrollView>
    </View>
  )
}

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 3 + ${ textContainer } + ${ dockSize } )`,
  ARTICLE_ITEM_WIDTH = `100vw - ${ margin } * 2`,
  ITEM_CONTENT_SIZE = `${ fontSize } * 0.83`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: `${ VIEW_BODY_HEIGHT } - ( ( ${ margin } * 2 ) + 10.28vw )` as unknown as number,
    marginTop: margin as unknown as number,
  },
  articleItem: {
    width: ARTICLE_ITEM_WIDTH as unknown as number,
    height: '11.11vw' as unknown as number,
    marginLeft: margin as unknown as number,
    borderBottomWidth: 2,
    borderBottomColor: '#CACACA',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  articleName: {
    width: `${ `100vw - ${ margin } * 2` } - ( ${ margin } * 3 + ${ ITEM_CONTENT_SIZE } * 2 )` as unknown as number,
    color: textColor,
    fontSize: ITEM_CONTENT_SIZE as unknown as number,
  },
} )

export default ArticlesRegistry