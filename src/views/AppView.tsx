import { accentColor, backgroundColor, fontSize, margin, textColor, textContainer } from '../styles.json'
import React, { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface ViewProps {
  title: string
  children?: ReactElement | ReactElement[]
  color?: boolean,
}

function AppView( props:ViewProps ): ReactElement {
  const { title, children, color } = props
  const viewNameColor: object = {
    color: color ? accentColor : textColor,
  }
  return (
    <View style={ styles.viewContainer }>
      <Text style={ [ useViewport( styles.viewName ), viewNameColor ] }>{ title }</Text>
      <View style={ useViewport( styles.viewBody ) }>
        { children }
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  viewContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
  },
  viewName: {
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    height: textContainer as unknown as number,
    fontSize: fontSize as unknown as number,
    fontWeight: '700',
  },
  viewBody: {
    width: '100%',
    height: `100vh - ( ${ margin } * 2 + ${ textContainer } )` as unknown as number,
    marginTop: margin as unknown as number,
  },
} )

export default AppView