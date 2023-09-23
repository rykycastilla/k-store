import AppContext from '../../app_context'
import ArticleButton from './ArticleButton'
import articles, { ArticlesIndex } from '../interfaces/articles'
import { BooleanCardCallerProps } from './BooleanCard'
import deleteIcon from '../../assets/images/delete_icon.png'
import { dockSize, fontSize, margin, textColor, textContainer } from '../styles.json'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { SBC } from '../types'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import useSwitch from 'react-component-switcher'
import { useViewport } from 'react-native-viewport-provider'

function deleteAction( id:string, BooleanCard:SBC ) {
  const callerProps: BooleanCardCallerProps = {
    text: '¿Desea eliminar este artículo?\nLos datos de los registros serán preservados',
    action() { articles.delete( id ) }
  }
  BooleanCard.call( callerProps )
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
  const { SwitchableBooleanCard } = useContext( AppContext )
  const SwitchableDeleteButton = useSwitch( ArticleButton, 100 )
  const topStyle: object = top
    ? { borderTopWidth: 2, borderTopColor: '#CACACA' }
    : {}
  return (
    <Pressable
      style={ [ useViewport( styles.articleItem ), topStyle ] }
      onPress={
        () => {
          // Switching between "show" and "hide" delete button to press the container
          const { showing, call, hide } = SwitchableDeleteButton
          if( showing ) { hide() }
          else { call() }
        }
      }>
      <Text style={ useViewport( styles.articleName ) }>{ title }</Text>
      <SwitchableDeleteButton.Component
        image={ deleteIcon }
        action={
          () => deleteAction( id, SwitchableBooleanCard )
        } />
    </Pressable>
  )
}

interface ArticleItemListProps { structure:ArticlesIndex }

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
  const [ articlesData, setArticlesData ] = useState( {} as ArticlesIndex )
  useEffect( () => {
    articles.initialize( setArticlesData )
  }, [] )
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <ArticleItemList structure={ articlesData } />
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
    flexWrap: 'wrap',
    borderBottomColor: '#CACACA',
    justifyContent: 'center',
  },
  articleName: {
    width: `${ `100vw - ${ margin } * 2` } - ( ${ margin } * 2 + ${ ITEM_CONTENT_SIZE } )` as unknown as number,
    color: textColor,
    fontSize: ITEM_CONTENT_SIZE as unknown as number,
  },
} )

export default ArticlesRegistry