import { accentColor, margin } from '../styles.json'
import AppContext from '../../app_context'
import AppView from './AppView'
import homeEdit from '../../assets/images/home_edit.png'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import inventory, { InventoryIndex } from '../interfaces/inventory'
import React, { ReactElement, useContext, useState } from 'react'
import { useViewport } from 'react-native-viewport-provider'

function ModifyButton(): ReactElement {
  const { SwitchableInventoryCard } = useContext( AppContext )
  const [ inventoryData, setInventoryData ] = useState( {} as InventoryIndex )
  inventory.initialize( setInventoryData )
  console.log( inventoryData )
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      style={ useViewport( styles.button ) }
      onPress={ SwitchableInventoryCard.call }>
      <Image source={ homeEdit } style={ useViewport( styles.buttonImage ) } />
    </TouchableOpacity>
  )
}

function HomeView(): ReactElement {
  return (
    <AppView title="Inventario" color>
      <ModifyButton />
    </AppView>
  )
}

const styles = StyleSheet.create( {
  button: {
    width: '10.28vw' as unknown as number,
    height: '10.28vw' as unknown as number,
    position: 'absolute',
    left: margin as unknown as number,
    bottom: margin as unknown as number,
    borderRadius: '5.14vw' as unknown as number,
    backgroundColor: accentColor,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
  },
  buttonImage: {
    width: '4.5vw' as unknown as number,
    height: '4.5vw' as unknown as number,
    alignSelf: 'center'
  },
} )

export default HomeView