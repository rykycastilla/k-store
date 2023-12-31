import Card from './Card'
import { fontSize, margin, textColor } from '../styles.json'
import { FunctionVoid } from '../types'
import Link from './Link'
import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { ReactElement } from 'react'
import { useHiding } from 'react-component-switcher'
import useLanguage from '../hooks/language'
import { useViewport } from 'react-native-viewport-provider'

function Margin(): ReactElement {
  return <View style={ useViewport( styles.margin ) } />
}

function WrongDateCard( props:unknown, callerProps:unknown, id:number ): ReactElement {
  props ; callerProps
  const hiding = useHiding( id )
  const emptyFunction: FunctionVoid = () => { return }
  const [ language ] = useLanguage()
  return (
    <Card hiding={ hiding } noButtons action={ emptyFunction } quit={ emptyFunction }>
      <Text style={ useViewport( styles.text ) }>
        { language.dateWarning }
      </Text>
      <Link
        text={ language.fixDateLink }
        action={ () => Linking.sendIntent( 'android.settings.DATE_SETTINGS' ) } />
      <Margin />
    </Card>
  )
}

const styles = StyleSheet.create( {
  text: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    marginBottom: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  },
  margin: {
    width: '100%',
    height: margin as unknown as number,
  },
} )

export default WrongDateCard