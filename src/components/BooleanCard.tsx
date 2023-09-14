import { accentTextColor, fontSize, googleColor, margin, textColor } from '../styles.json'
import Card from './Card'
import { FunctionVoid } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

interface ButtonProps {
  text: string,
  color?: boolean,
  action: FunctionVoid,
}

function Button( props:ButtonProps ): ReactElement {
  const { text, color, action } = props
  const textColorStyle: object = {
    color: color
      ? accentTextColor
      : textColor
  }
  return (
    <TouchableOpacity activeOpacity={ 0.7 } onPress={ action } style={ useViewport( styles.button ) }>
      <Text style={ [ textColorStyle, useViewport( styles.buttonText ) ] }>{ text }</Text>
    </TouchableOpacity>
  )
}

interface Link {
  text: string,
  action: FunctionVoid,
}

function accept( action:FunctionVoid, quit:HideFunction ) {
  action()
  quit()
}

interface BooleanCardProps { quit:HideFunction }

interface BooleanCardCallerProps {
  text: string,
  action: FunctionVoid,
  link: Link,
}

function BooleanCard( props:BooleanCardProps, callerProps:BooleanCardCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { text, action, link } = callerProps
  const hiding = useHiding( id )
  return (
    <Card hiding={ hiding }>
      <View style={ styles.container }>
        <Text style={ useViewport( styles.text ) }>{ text }{ link ? '\n' : '' }</Text>
        { link ? <Link text={ link.text } action={ link.action } /> : <></> }
        <Button text="Cancelar" action={ quit } />
        <Button text="Aceptar" color action={ () => accept( action, quit ) } />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
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
  button: {
    width: '50%',
    marginTop: `${ margin } * 2` as unknown as number,
    marginBottom: margin as unknown as number,
  },
  buttonText: {
    fontSize: `${ fontSize } * 1.05` as unknown as number,
    fontWeight: '700',
    textAlign: 'center',
  }
} )

export default BooleanCard
export { BooleanCardProps, BooleanCardCallerProps, Link }