import { accentColor, backgroundColor, fontSize, margin, textColor, textContainer } from '../styles.json'
import React, { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface ViewProps {
  Back?: ReactElement | ReactElement[],
  title: string
  children?: ReactElement | ReactElement[]
  color?: boolean,
}

function AppView( props:ViewProps ): ReactElement {
  const { Back, title, children, color } = props
  const viewNameColor: object = {
    color: color ? accentColor : textColor,
  }
  return (
    <View style={ styles.viewContainer }>
      <View style={ styles.viewHeader }>
        { Back }
        <Text style={ [ useViewport( styles.viewName ), viewNameColor ] }>{ title }</Text>
      </View>
      <View style={ useViewport( styles.viewBody ) }>
        { children }
      </View>
    </View>
  )
}

const VIEW_BODY = `( 100vh - ( ${ margin } * 2 + ${ textContainer } ) )`

const styles = StyleSheet.create( {
  viewContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
  },
  viewHeader: { flexDirection: 'row' },
  viewName: {
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    height: textContainer as unknown as number,
    fontSize: fontSize as unknown as number,
    fontWeight: '700',
  },
  viewBody: {
    width: '100%',
    height: VIEW_BODY as unknown as number,
    marginTop: margin as unknown as number,
  },
} )

export default AppView
export { VIEW_BODY }