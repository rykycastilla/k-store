import { Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../../app_context'
import { backgroundColor, fontSize, margin, textContainer } from '../styles.json'
import { FunctionVoid, StateSetter } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import nextIndex from '../../assets/images/next_index.png'
import Opacity from '../interfaces/Opacity'
import previousIndex from '../../assets/images/previous_index.png'
import quitRegistry from '../../assets/images/quit_registry.png'
import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import TableData from '../classes/TableData'
import useBackButton from '../hooks/back_button'
import { useViewport } from 'react-native-viewport-provider'
import ZoomView from './ZoomView'

function animation( ref:Animated.Value, toValue:Opacity ) {
  Animated.timing( ref, {
    toValue: toValue,
    duration: 400,
    useNativeDriver: true,
  } ).start()
}

interface QuitButtonProps { quit:HideFunction }

function QuitButton( props:QuitButtonProps ): ReactElement {
  const { quit } = props
  return (
    <TouchableOpacity style={ useViewport( styles.quitButton ) } onPress={ quit }>
      <Image source={ quitRegistry } style={ styles.quitButtonImage } />
    </TouchableOpacity>
  )
}

interface CellStyle { height:number }

interface CellProps {
  children?: string | number,
  size?: number,
}

function Cell( props:CellProps ): ReactElement {
  const { children } = props
  let { size } = props
  if( !size ) { size = 1 }
  const cellStyle = useViewport( styles.cell ) as CellStyle
  const width: number = cellStyle.height * size
  return (
    <View style={ [ cellStyle, { width: width } ] }>
      <Text style={ useViewport( styles.cellText ) }>{ children }</Text>
    </View>
  )
}

interface TableArticlesProps {
  content: TableData,
  initIndex: number,
  topIndex: number,
}

function TableArticles( props:TableArticlesProps ): ReactElement {
  const { content} = props
  let { initIndex, topIndex  } = props
  initIndex -= 1 ; topIndex -= 1
  const { articles } = content
  const cells: ReactElement[] = []
  for( let _this = initIndex; _this < articles.length && _this <= topIndex ; _this++ ) {
    const article = articles[ _this ]
    const { name, init, input, output, end } = article
    const weight = `${ article.weight }Kg`,
      price = `${ article.price }$`
    const articleRow1 = <Cell key={ Math.random() }>{ _this + 1 }</Cell>,        
      articleRow2 = <Cell key={ Math.random() } size={ 3 }>{ name }</Cell>,
      articleRow3 = <Cell key={ Math.random() } size={ 2 }>{ weight }</Cell>,
      articleRow4 = <Cell key={ Math.random() } size={ 2 }>{ price }</Cell>,
      articleRow5 = <Cell key={ Math.random() } size={ 2 }>{ init }</Cell>,
      articleRow6 = <Cell key={ Math.random() } size={ 2 }>{ input }</Cell>,
      articleRow7 = <Cell key={ Math.random() } size={ 2 }>{ output }</Cell>,
      articleRow8 = <Cell key={ Math.random() } size={ 2 }>{ end }</Cell>
    cells.push( articleRow1, articleRow2, articleRow3, articleRow4, articleRow5, articleRow6, articleRow7, articleRow8 )
  }
  return <>{ cells }</>
}

interface TableProps {
  content: TableData,
  firstArticle: number,
  lastArticle: number,
}

function Table( props:TableProps ): ReactElement {
  const { content, firstArticle, lastArticle } = props
  const { date, totalInput, totalOutput } = content
  const earns = `${ content.earns }$`
  return (
    <View style={ useViewport( styles.table ) }>
      <Cell size={ 12 }>Resumen de Inventario</Cell>
      <Cell size={ 4 }>{ date }</Cell>
      <Cell>No.</Cell>
      <Cell size={ 3 }>Artículo</Cell>
      <Cell size={ 2 }>Peso</Cell>
      <Cell size={ 2 }>Precio</Cell>
      <Cell size={ 2 }>Inicio</Cell>
      <Cell size={ 2 }>Entrada</Cell>
      <Cell size={ 2 }>Salida</Cell>
      <Cell size={ 2 }>Final</Cell>
      <TableArticles content={ content } initIndex={ firstArticle } topIndex={ lastArticle } />
      <Cell size={ 6 }>Entrada Total</Cell>
      <Cell size={ 6 }>Salida Total</Cell>
      <Cell size={ 4 }>Ingreso Bruto</Cell>
      <Cell size={ 6 }>{ totalInput }</Cell>
      <Cell size={ 6 }>{ totalOutput }</Cell>
      <Cell size={ 4 }>{ earns }</Cell>
    </View>
  )
}

interface IndexButtonProps {
  image:ImageSourcePropType,
  index: number,
  setIndex: StateSetter<number>
  indexChange: number,
  topIndex?: number,
}

function IndexButton( props:IndexButtonProps ): ReactElement {
  const { image, index, setIndex, indexChange, topIndex } = props
  const top: number = !topIndex ? Infinity : topIndex
  const newIndex: number = index + indexChange
  // Verifying if is possible an index change
  let allowAction: boolean
  if( indexChange < 0 ) { allowAction = newIndex > 0 }
  else { allowAction = newIndex <= top }
  // Only executing index change if it is possible (and setting styles)
  const action: FunctionVoid = allowAction
    ? () => setIndex( newIndex )
    : () => {}
  const opacity: object = allowAction
    ? {}
    : { opacity: 0.5 }
  return (
    <Pressable style={ [ useViewport( styles.indexButton ), opacity ] } onPress={ action }>
      <Image source={ image } style={ styles.indexButtonImage } />
    </Pressable>
  )
}

interface IndexButtonDockProps {
  currentIndex: number,
  setCurrentIndex: StateSetter<number>,
  topIndex: number
}

function IndexButtonDock( props:IndexButtonDockProps ): ReactElement {
  const { currentIndex, setCurrentIndex, topIndex } = props
  return (
    <View style={ useViewport( styles.indexButtonContainer ) }>
      <IndexButton
        image={ previousIndex }
        index={ currentIndex }
        setIndex={ setCurrentIndex }
        indexChange={ -1 } />
      <Text style={ useViewport( styles.indexPage ) }>{ currentIndex }</Text>
      <IndexButton
        image={ nextIndex }
        index={ currentIndex }
        setIndex={ setCurrentIndex }
        indexChange={ 1 }
        topIndex={ topIndex } />
    </View>
  )
}

interface RegistryTableProps { quit:HideFunction }

interface RegistryTableCallerProps { date:Date }

function RegistryTable( props:RegistryTableProps, callerProps:RegistryTableCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { date } = callerProps
  // Building table data structure
  const { inventoryData } = useContext( AppContext )
  const table: TableData = useMemo( () => {
    return new TableData( date, inventoryData )
  }, [] )
  const hiding = useHiding( id )
  const opacity = useRef( new Animated.Value( 0 ) ).current
  // Setting status bar color and animation
  useEffect( () => {
    if( hiding ) {
      animation( opacity, Opacity.HIDE )
      // Default background style
      setStatusBarBackgroundColor( backgroundColor, true )
      setStatusBarStyle( 'dark' )
    }
    else {
      animation( opacity, Opacity.SHOW )
      setStatusBarBackgroundColor( 'black', true )
      setStatusBarStyle( 'light' )
    }
  }, [ hiding ] )
  const articleRows: number = table.articles.length,
    rowsAmount: number = articleRows + 4
  // Rendering rows
  const { width, height } = useViewport( { width: '100vw', height: '100vh' } ) as { width:number, height:number }  // Would be use useDimensions instead
  const articlesAmount: number = Math.floor( height / width * 7.4 )
  const rowsToRender: number = Math.min( rowsAmount, articlesAmount + 4 )
  const tableContainerStyle = {
    width: '100%',
    height: `${ CELL_SIZE } * ${ rowsToRender } + ${ margin } * 2`,
    backgroundColor: 'white',
  }
  // Building index structure
  const [ currentIndex, setCurrentIndex ] = useState( 1 )
  const topIndex = Math.ceil( articleRows / articlesAmount ),
    firstArticle: number = ( currentIndex - 1 ) * articlesAmount + 1,
    lastArticle: number = firstArticle + ( articlesAmount - 1 )
    useBackButton( () => {
      quit()
    } )
    return (
    <Animated.View style={ [ styles.container, { opacity: opacity } ] }>
      <QuitButton quit={ quit } />
      <ZoomView style={ useViewport( tableContainerStyle ) }>
        <Table content={ table } firstArticle={ firstArticle } lastArticle={ lastArticle } />
      </ZoomView>
      <IndexButtonDock
        currentIndex={ currentIndex }
        setCurrentIndex={ setCurrentIndex }
        topIndex={ topIndex } />
    </Animated.View>
  )
}

const TABLE_SIZE = `( 100vw - ${ margin } * 2 )`,
  CELL_SIZE = `${ TABLE_SIZE } / 16`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  quitButton: {
    width: '7vw' as unknown as number,
    height: '7vw' as unknown as number,
    position: 'absolute',
    top: margin as unknown as number,
    left: margin as unknown as number,
  },
  quitButtonImage: {
    width: '100%',
    height: '100%',
  },
  table: {
    width: TABLE_SIZE as unknown as number,
    height: 150,
    margin: margin as unknown as number,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    height: CELL_SIZE as unknown as number,
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    color: 'black',
    fontSize: `${ CELL_SIZE } / 2.5` as unknown as number,
    fontWeight: '800',
    textAlign: 'center',
  },
  indexButtonContainer: {
    width: '100%',
    height: '16.5vw' as unknown as number,
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexPage: {
    marginLeft: `${ margin } * 2` as unknown as number,
    marginRight: `${ margin } * 2` as unknown as number,
    color: '#CACACA',
    fontSize: fontSize as unknown as number,
    textAlign: 'center',
  },
  indexButton: {
    width: textContainer as unknown as number,
    height: textContainer as unknown as number,
  },
  indexButtonImage: {
    width: '100%',
    height: '100%',
  },
} )

export default RegistryTable
export { RegistryTableCallerProps, RegistryTableProps }