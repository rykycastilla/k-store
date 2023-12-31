import AppContext from '../../app_context'
import { fontSize, margin, textColor } from '../styles.json'
import { FunctionVoid } from '../types'
import React, { ReactElement, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface SectionItemProps {
  title: string,
  action: FunctionVoid,
  partner?: ReactElement,
  color?: string,
  underline?: boolean,
}

function SectionItem( props:SectionItemProps ): ReactElement {
  const { title, action, partner, color, underline } = props
  const underlineStyle: object = underline
    ? {
      borderBottomWidth: 1,
      borderBottomColor: '#CACACA',
    }
    : {}
  const { pressing, press } = useContext( AppContext )
  const itemTextColor = color ? color : textColor
  return (
    <TouchableOpacity
      style={ [ useViewport( styles.item ), underlineStyle ] }
      onPress={
        () => {
          if( pressing ) { return }
          press()
          action()
        }
      }>
      <Text style={ [ useViewport( styles.itemText ), { color: itemTextColor } ] }>{ title }</Text>
      { partner }
    </TouchableOpacity>
  )
}

interface SectionItemListProps { items:SectionItemProps[] }

function SectionItemList( props:SectionItemListProps ): ReactElement {
  const { items } = props
  const sectionItems: ReactElement[] = [],
    itemsLength: number = items.length
  for( let _this = 0; _this < itemsLength; _this++ ) {
    const { title, partner, color, action } = items[ _this ]
    const underline: boolean = _this !== itemsLength - 1
    const sectionItem =
      <SectionItem
        key={ _this }
        title={ title }
        color={ color }
        partner={ partner }
        action={ action }
        underline={ underline } />
    sectionItems.push( sectionItem )
  }
  return <>{ sectionItems }</>
}

interface SectionProps {
  name: string,
  items: SectionItemProps[],
}

function Section( props:SectionProps ): ReactElement {
  const { name, items } = props
  return (
    <>
      <Text style={ useViewport( styles.name ) }>{ name }</Text>
      <View style={ useViewport( styles.sectionBody ) }>
        <SectionItemList items={ items } />
      </View>
    </>
  )
}

const styles = StyleSheet.create( {
  name: {
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.71` as unknown as number,
    fontWeight: '700',
  },
  sectionBody: {
    width: `100vw - ${ margin } * 2` as unknown as number,
    marginLeft: margin as unknown as number,
    borderRadius: '2.8vw' as unknown as number,
    backgroundColor: '#EAEAEA',
    alignItems: 'center'
  },
  item: {
    width:  `100vw - ${ margin } * 4` as unknown as number,
    height: `${ fontSize } * 1.95` as unknown as number,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  },
} )

export default Section
export { SectionItemProps }