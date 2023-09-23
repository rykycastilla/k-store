import AppContext from '../../app_context'
import { BooleanCardCallerProps } from './BooleanCard'
import Card from './Card'
import CustomTextInput from './CustomTextInput'
import { fontSize, margin, textColor } from '../styles.json'
import { HideFunction, useHiding } from 'react-component-switcher'
import InputContainer from './InputContainer'
import inventory from '../interfaces/inventory'
import { N } from '../exp'
import { Picker } from '@react-native-picker/picker'
import React, { ReactElement } from 'react'
import { SBC, StateSetter } from '../types'
import { StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { useViewport } from 'react-native-viewport-provider'

function inventoryCardAction( action:string, article:string, amount:string, BooleanCard:SBC ) {  
  // Building "Alerts"
  const invalidAlert: BooleanCardCallerProps = {
    text: 'Los datos introducidos son inválidos',
    action: 'alert',
  }
  const invalidOperation: BooleanCardCallerProps = {
    text: 'La cantidad en inventario no puede ser inferior a cero',
    action: 'alert',
  }
  // Verify if input data is valid
  const invalidAmount: boolean = !N.test( amount ),
    invalidArticle: boolean = article === ''
  if( invalidAmount || invalidArticle ) { BooleanCard.call( invalidAlert ) }  // Invalid
  else {  // Valid
    const operation: number = ( action === 'add' ) ? 1 : -1
    let amountDiference = Number( amount )
    inventory.setAmount( operation, article, amountDiference, () => {
      BooleanCard.call( invalidOperation )
    } )
  }
}

interface ActionPickerProps {
  actionValue: string,
  setActionValue: StateSetter<string>,
}

function ActionPicker( props:ActionPickerProps ): ReactElement {
  const { actionValue:action, setActionValue:setAction } = props
  return (
      <InputContainer>
      <Picker selectedValue={ action } onValueChange={ ( value:string ) => setAction( value ) } style={ useViewport( styles.picker ) }>
        <Picker.Item label="Agregar" value="add" />
        <Picker.Item label="Quitar" value="quit" />
      </Picker>
    </InputContainer>
  )
}

interface InventoryCardProps { quit:HideFunction }

function InventoryCard( props:InventoryCardProps, callerProps:unknown, id:number ): ReactElement {
  const { quit } = props
  const [ actionValue, setActionValue ] = useState( 'add' )
  const [ articleValue, setArticleValue ] = useState( '' )
  const [ amountValue, setAmountValue ] = useState( '' )
  const hiding = useHiding( id )
  const { SwitchableBooleanCard:SBC } = useContext( AppContext )
  return (
    <Card
      hiding={ hiding }
      quit={ quit }
      action={
        () => {
          setTimeout( () => {
            // Waiting to hide InventoryCard
            inventoryCardAction( actionValue, articleValue, amountValue, SBC )
          }, 400 )
        } 
      }>
      <ActionPicker actionValue={ actionValue } setActionValue={ setActionValue } />
      <CustomTextInput title="Artículo" setValue={ setArticleValue }  />
      <CustomTextInput title="Cantidad" setValue={ setAmountValue }  />
    </Card>
  )
}

const styles = StyleSheet.create( {
  picker: {
    width: `100vw - ${ margin } * 5` as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.75` as unknown as number,
  },
} )

export default InventoryCard
export { InventoryCardProps }