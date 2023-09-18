import { fontSize, googleColor, margin, textColor } from '../styles.json'
import Card from './Card'
import { FunctionVoid } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import { Pressable, StyleSheet, Text } from 'react-native'
import React, { ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'

interface LinkProps {
  text: string,
  action: FunctionVoid,
}

function Link( props:LinkProps ): ReactElement {
  const { text, action } = props
  return (
    <Pressable onPress={ action }>
      <Text style={ useViewport( styles.link ) }>{ text }</Text>
    </Pressable>
  )
}

interface Link {
  text: string,
  action: FunctionVoid,
}

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
  },
  link: {
    width: `100vw - ${ margin } * 4` as unknown as number,
    color: googleColor,
    fontSize: `${ fontSize } * 0.71` as unknown as number,
    textDecorationLine: 'underline',
  },
} )

export default BooleanCard
export { BooleanCardProps, BooleanCardCallerProps, Link }