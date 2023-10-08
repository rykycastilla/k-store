import { fontSize, margin } from '../styles.json'
import { FunctionVoid } from '../types'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactElement } from 'react'
import { useViewport } from 'react-native-viewport-provider'

interface ArticleButtonProps {
  image: ImageSourcePropType,
  action: FunctionVoid,
}

function ArticleButton( props:ArticleButtonProps ): ReactElement {
  const { image, action } = props
  return (
    <View style={ [ useViewport( styles.container ) ] }>
      <TouchableOpacity style={ styles.pressableContainer } onPress={ action }>
        <Image source={ image } style={ styles.buttonImage } />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: fontSize as unknown as number,
    height: fontSize as unknown as number,
    marginRight: margin as unknown as number,
  },
  pressableContainer: {
    width: '100%',
    height: '100%',
  },
  buttonImage: {
    width: '83%',
    height: '83%',
  },
} )

export default ArticleButton