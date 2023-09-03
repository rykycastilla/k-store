import { fontSize, margin, textColor, textContainer } from '../styles.json'
import React, { ReactElement } from 'react'
import { StyleSheet, Text, View as ReactView } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'



interface ViewProps {
  title: string
  children?: ReactElement | ReactElement[]
}

function View( props:ViewProps ): ReactElement {
  const { title, children } = props
  return (
    <ReactView style={ styles.viewContainer }>
      <Text style={ useViewport( styles.viewName ) }>{ title }</Text>
      <ReactView style={ useViewport( styles.viewBody ) }>
        { children }
      </ReactView>
    </ReactView>
  )
}

const styles = StyleSheet.create( {
  viewContainer: {
    width: '100%',
    height: '100%',
  },
  viewName: {
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    height: textContainer as unknown as number,
    color: textColor,
    fontSize: fontSize as unknown as number,
    fontWeight: '700',
  },
  viewBody: {
    width: '100%',
    height: `100vh - ( ${ margin } * 2 + ${ textContainer } )` as unknown as number,
    marginTop: margin as unknown as number,
  },
} )

export default View