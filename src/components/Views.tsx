import HomeView from './HomeView'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

function Views(): ReactElement {
  return (
    <View style={ styles.container }>
      <HomeView />
    </View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
} )

export default Views