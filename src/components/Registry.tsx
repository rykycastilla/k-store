import AppContext from '../../app_context'
import { dockSize, fontSize, margin, textColor, textContainer } from '../styles.json'
import getMonth from '../scripts/get_month'
import history, { DateList } from '../interfaces/history'
import NoteItem from '../components/NoteItem'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { RegistryTableCallerProps } from './RegistryTable'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'
import useWeekDay from '../hooks/week_day'

interface DateTitleProps { title:string }

function DateTitle( props:DateTitleProps ): ReactElement {
  const { title } = props
  return <Text style={ useViewport( styles.dateTitle ) }>{ title }</Text>
}

interface RegistryItemProps {
  date: Date,
}

function RegistryItem( props:RegistryItemProps ): ReactElement {
  const { date } = props
  const { SwitchableRegistryTable } = useContext( AppContext ) 
  const weekDay: string = useWeekDay( date )
  const title = `   - ${ weekDay }`
  return (
    <NoteItem
      title={ title }
      action={
        () => {
          const callerProps: RegistryTableCallerProps = { date }
          SwitchableRegistryTable.call( callerProps )
        }
      } />
  )
}

function RegistryContent(): ReactElement {
  const [ historyData, setHistoryData ] = useState( [] as DateList )
  useEffect( () => {
    history.use( setHistoryData )
  }, [] )
  const items: ReactElement[] = [],
    today = new Date().toDateString()
  let currentTitle = ''
  for( const thisDay of historyData ) {
    const date = new Date( thisDay )
    const title: string = today === thisDay
      ? 'hoy'
      : getMonth( date )
    // Printing DateTitle only for the first time (when a new month is detected)
    if( title !== currentTitle ) {
      const dateTitle = <DateTitle key={ Math.random() } title={ title } />
      items.push( dateTitle )
      currentTitle = title
    }
    const registryItem = <RegistryItem key={ thisDay } date={ date } />
    items.push( registryItem )
  }
  return <>{ items }</>
}

function Registry(): ReactElement {
  return (
    <View style={ useViewport( styles.container ) }>
      <ScrollView>
        <RegistryContent />
      </ScrollView>
    </View>
  )
}

const VIEW_BODY_HEIGHT = `100vh - ( ${ margin } * 2 + ${ textContainer } + ${ dockSize } )`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: VIEW_BODY_HEIGHT as unknown as number,
  },
  dateTitle: {
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.52` as unknown as number,
    fontWeight: '700',
  },
} )

export default Registry