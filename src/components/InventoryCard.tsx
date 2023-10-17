import AppContext from '../../app_context'
import { BooleanCardCallerProps } from './BooleanCard'
import Card from './Card'
import CustomTextInput from './CustomTextInput'
import getIndexNames from '../scripts/get_index_names'
import { HideFunction, useHiding } from 'react-component-switcher'
import inventory from '../interfaces/inventory'
import { N } from '../exp'
import Picker from './Picker'
import React, { ReactElement, useContext, useState } from 'react'
import { SBC, StateSetter } from '../types'
import useLanguage, { Language } from '../hooks/language'

function inventoryCardAction( action:string, article:string, amount:string, BooleanCard:SBC, language:Language ) {  
  // Building "Alerts"
  const invalidAlert: BooleanCardCallerProps = {
    text: language.invalidData,
    action: 'alert',
  }
  const invalidOperation: BooleanCardCallerProps = {
    text: language.inventoryAmountAlert,
    action: 'alert',
  }
  // Verify if input data is valid
  const invalidAmount: boolean = !N.test( amount ),
    invalidArticle: boolean = article === 'null'
  if( invalidAmount || invalidArticle ) { BooleanCard.call( invalidAlert ) }  // Invalid
  else {  // Valid
    const operation: number = ( action === 'add' ) ? 1 : -1
    const amountDiference = Number( amount )
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
  const [ language ] = useLanguage()
  const names = [ language.add, language.quit ],
    values = [ 'add', 'quit' ]
  return (
    <Picker
      names={ names }
      values={ values }
      selected={ action }
      setSelected={ setAction } />
  )
}

interface ArticlePickerProps {
  value: string,
  setValue: StateSetter<string>,
}

function ArticlePicker( props:ArticlePickerProps ): ReactElement {
  const { value, setValue } = props
  const { inventoryData } = useContext( AppContext )
  const { names, ids } = getIndexNames( inventoryData )
  const [ language ] = useLanguage()
  // Using this by default
  names.push( language.nullArticle )
  ids.push( 'null' )
  return (
    <Picker
      names={ names }
      values={ ids }
      selected={ value }
      setSelected={ setValue } />
  )
}

interface InventoryCardProps { quit:HideFunction }

interface InventoryCardCallerPropsInterface { defaultArticle:string }

type InventoryCardCallerProps = InventoryCardCallerPropsInterface | undefined

function InventoryCard( props:InventoryCardProps, callerProps:InventoryCardCallerProps, id:number ): ReactElement {
  const { quit } = props
  if( !callerProps ) {
    callerProps = { defaultArticle: 'null' }
  }
  const { defaultArticle } = callerProps
  const [ actionValue, setActionValue ] = useState( 'add' )
  const [ articleValue, setArticleValue ] = useState( defaultArticle )
  const [ amountValue, setAmountValue ] = useState( '' )
  const hiding = useHiding( id )
  const { SwitchableBooleanCard:SBC } = useContext( AppContext )
  const [ language ] = useLanguage()
  return (
    <Card
      hiding={ hiding }
      quit={ quit }
      action={
        () => {
          setTimeout( () => {
            // Waiting to hide InventoryCard
            inventoryCardAction( actionValue, articleValue, amountValue, SBC, language )
          }, 400 )
        } 
      }>
      <ActionPicker actionValue={ actionValue } setActionValue={ setActionValue } />
      <ArticlePicker value={ articleValue } setValue={ setArticleValue } />
      <CustomTextInput title={ language.amount } setValue={ setAmountValue } numeric />
    </Card>
  )
}

export default InventoryCard
export { InventoryCardCallerProps, InventoryCardProps }