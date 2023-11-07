import { fontSize, margin, textColor } from '../styles.json'
import Card from './Card'
import { FunctionVoid } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import Link, { LinkProps } from './Link'
import React, { ReactElement } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

type Link = LinkProps

interface BooleanCardProps { quit:HideFunction }

interface BooleanCardCallerProps {
  text: string,
  action: FunctionVoid | 'alert',
  link?: Link,
}

function BooleanCard( props:BooleanCardProps, callerProps:BooleanCardCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { text, action, link } = callerProps
  const hiding = useHiding( id )
  const alert: boolean = action === 'alert' 
  return (
    <Card
      hiding={ hiding }
      quit={ quit }
      action={ alert ? () => {} : action as FunctionVoid }
      alert={ alert }>
      <Text style={ useViewport( styles.text ) }>{ text }{ link ? '\n' : '' }</Text>
      { link ? <Link text={ link.text } action={ link.action } /> : <></> }
    </Card>
  )
}

const styles = StyleSheet.create( {
  text: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    marginTop: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  }
} )

export default BooleanCard
export { BooleanCardProps, BooleanCardCallerProps, Link }