import articles, { ArticlesIndex } from '../interfaces/articles'
import { dockSize, fontSize, margin, textColor, textContainer } from '../styles.json'
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface ArticleItemProps {
  name: string,
  weight: number,
  price: number,
  top?: boolean,
}

function ArticleItem( props:ArticleItemProps ): ReactElement {
  const { name, weight, price, top } = props
  const topStyle: object = top
    ? { borderTopWidth: 2, borderTopColor: '#CACACA' }
    : {}
  const title: string = `    - ${ name } (${ weight }Kg, ${ price }$)`
  return (
    <View style={ [ useViewport( styles.articleItem ), topStyle ] }>
      <Text style={ useViewport( styles.articleName ) }>{ title }</Text>
    </View>
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
    const { name, weight, price } = article
    // "top" prop (top styling) is only true for the "first" time
    const item: ReactElement =
      <ArticleItem key={ name } name={ name } weight={ weight } price={ price } top={ first } />
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

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 3 + ${ textContainer } + ${ dockSize } )`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: `${ VIEW_BODY_HEIGHT } - ( ( ${ margin } * 2 ) + 10.28vw )` as unknown as number,
    marginTop: margin as unknown as number,
  },
  articleItem: {
    width: `100vw - ${ margin } * 2` as unknown as number,
    height: '11.11vw' as unknown as number,
    marginLeft: margin as unknown as number,
    borderBottomWidth: 2,
    borderBottomColor: '#CACACA',
    justifyContent: 'center',
  },
  articleName: {
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  }
} )

export default ArticlesRegistry