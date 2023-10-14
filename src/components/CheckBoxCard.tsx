import Card from './Card'
import CheckBox from './CheckBox'
import { fontSize, margin, textColor, textContainer } from '../styles.json'
import { HideFunction, useHiding } from 'react-component-switcher'
import { Pressable, StyleSheet, Text } from 'react-native'
import React, { ReactElement, useState } from 'react'
import { StateSetter } from '../types'
import { useViewport } from 'react-native-viewport-provider'

interface CheckBoxItemProps {
  title: string,
  state: boolean,
  setSelected: StateSetter<string>,
}

function CheckBoxItem( props:CheckBoxItemProps ): ReactElement {
  const { title, state, setSelected } = props
  return (
    <Pressable
      style={ useViewport( styles.item ) }
      onPress={
        () => setSelected( title )
      }>
      <CheckBox state={ state } />
      <Text style={ useViewport( styles.itemText ) }>{ title }</Text>
    </Pressable>
  )
}

interface CheckBoxItemListProps {
  items: string[],
  selected: string,
  setSelected: StateSetter<string>,
}

function CheckBoxItemList( props:CheckBoxItemListProps ): ReactElement {
  const { items, selected, setSelected } = props
  const itemList: ReactElement[] = []
  for( let _this = 0; _this < items.length; _this++ ) {
    const title = items[ _this ]
    const state: boolean = title === selected
    const item = <CheckBoxItem key={ _this } title={ title } state={ state } setSelected={ setSelected } />
    itemList.push( item )
  }
  return <>{ itemList }</>
}

interface CheckBoxCardProps { quit:HideFunction }

interface CheckBoxCardCallerProps {
  items: string[],
  selectedIndex: number,
  action: ( selected:string ) => void
}

function CheckBoxCard( props:CheckBoxCardProps, callerProps:CheckBoxCardCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { items, selectedIndex, action } = callerProps
  const hiding = useHiding( id )
  const [ selected, setSelected ] = useState( items[ selectedIndex ] )
  return (
    <Card
      quit={ quit }
      hiding={ hiding }
      action={
        () => action( selected )
      }>
      <CheckBoxItemList items={ items } selected={ selected } setSelected={ setSelected } />
    </Card>
  )
}

const styles = StyleSheet.create( {
  item: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    height:  `${ textContainer } * 0.83` as unknown as number,
    marginTop: margin as unknown as number,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemText: {
    marginLeft: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  },
} )

export default CheckBoxCard
export { CheckBoxCardCallerProps, CheckBoxCardProps }