import dockArticlesIcon from '../../assets/images/dock_articles_icon.png'
import dockHomeIcon from '../../assets/images/dock_home_icon.png'
import { dockSize } from '../styles.json'
import { Link } from 'expo-router'
import React, { ReactElement } from 'react'
import { Slot } from 'expo-router'
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native'
import { useViewport } from 'react-native-viewport-provider'

interface NavButtonProps {
  image: ImageSourcePropType,
  url: string,
}

function NavButton( props:NavButtonProps ): ReactElement {
  const { image, url } = props
  return (
    <Link href={ url } asChild>
      <Pressable style={ useViewport( styles.navButton ) }>
        <Image source={ image } style={ styles.navButtonImage } />
      </Pressable>
    </Link>
  )
}

function Dock(): ReactElement {
  return (
    <View style={ useViewport( styles.dock ) }>
      <NavButton url="/" image={ dockHomeIcon } />
      <NavButton url="/articles" image={ dockArticlesIcon } />
    </View>
  )
}

function ViewSelector(): ReactElement {
  return (
    <>
      <View style={ useViewport( styles.viewContainer ) }>
        <Slot />
      </View>
      <Dock />
    </>
  )
}

const styles = StyleSheet.create( {
  viewContainer: {
    width: '100%',
    height: `100vh - ${ dockSize }` as unknown as number,
  },
  dock: {
    width: '100%',
    height: dockSize as unknown as number,
    borderTopWidth: 2,
    borderTopColor: '#DADADA',
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navButton: {
    width: '8.33vw' as unknown as number,
    height: '8.33vw' as unknown as number,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonImage: {
    width: '75%',
    height: '75%',
  }
} )

export default ViewSelector