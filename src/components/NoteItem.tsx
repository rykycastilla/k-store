import { Animated, Pressable, StyleSheet, Text } from 'react-native'
import { fontSize, margin, textColor } from '../styles.json'
import { FunctionVoid } from '../types'
import Opacity from '../interfaces/Opacity'
import React, { ReactElement, useEffect, useRef } from 'react'
import useSwitch, { useHiding } from 'react-component-switcher'
import { useViewport } from 'react-native-viewport-provider'

type ReactElements = ReactElement | ReactElement[]

interface ButtonContainerProps { children?:ReactElements }

function ButtonContainer( props:ButtonContainerProps, callerProps:unknown, id:number ): ReactElement {
  const { children } = props
  const hiding = useHiding( id )
  const opacity = useRef( new Animated.Value( 0 ) ).current
  useEffect( () => {
    const toValue: number = hiding
      ? Opacity.HIDE
      : Opacity.SHOW
    Animated.timing( opacity, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: true,
    } ).start()
  }, [ hiding ] )
  return (
    <Animated.View style={ [ useViewport( styles.buttonContainer ), { opacity: opacity } ] }>
      { children }
    </Animated.View>
  )
}

interface NoteItemProps {
  title: string,
  top?: boolean,
  children?: ReactElements
  action?: FunctionVoid,
}

function NoteItem( props:NoteItemProps ): ReactElement {
  const { title, top, children, action } = props
  // Getting ButtonContainer to make it switchable (show and hide with a single touch)
  const SwitchableButtonContainer = useSwitch( ButtonContainer, 100 )
  const topStyle: object = top
    ? { borderTopWidth: 2, borderTopColor: '#CACACA' }
    : {}
  return (
    <Pressable
      style={ [ useViewport( styles.item ), topStyle ] }
      onPress={ action }
      onLongPress={
        () => {
          // Switching between "show" and "hide" buttons to press the container
          const { call, hide, showing } = SwitchableButtonContainer
          if( showing ) { hide() }
          else { call() }
        }
      }>
      <Text style={ useViewport( styles.title ) }>{ title }</Text>
        <SwitchableButtonContainer.Component>
          { children }
        </SwitchableButtonContainer.Component>
    </Pressable>
  )
}

const NOTE_ITEM_WIDTH = `100vw - ${ margin } * 2`,
  BUTTON_CONTAINER_WIDTH = `( ${ margin } * 3 + ${ fontSize } * 2 )`

const styles = StyleSheet.create( {
  item: {
    width: NOTE_ITEM_WIDTH as unknown as number,
    height: '11.11vw' as unknown as number,
    marginLeft: margin as unknown as number,
    borderBottomWidth: 2,
    borderBottomColor: '#CACACA',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    width: `${ NOTE_ITEM_WIDTH } - ${ BUTTON_CONTAINER_WIDTH }` as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
  },
  buttonContainer: {
    width: BUTTON_CONTAINER_WIDTH as unknown as number,
    height: fontSize as unknown as number,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
} )

export default NoteItem