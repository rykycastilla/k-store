import AppContext from '../../app_context'
import { BooleanCardCallerProps } from './BooleanCard'
import Card from './Card'
import createArticle from '../scripts/create_article'
import CustomTextInput from './CustomTextInput'
import editArticle from '../scripts/edit_article'
import { FunctionVoid, SBC } from '../types'
import { HideFunction, useHiding } from 'react-component-switcher'
import { Q_ } from '../exp'
import React, { ReactElement, useContext, useState } from 'react'

function articlesCardAction( id:string, defaultName:string, name:string, weight:string, price:string, BooleanCard:SBC ) {
  // Building "Alert"
  const invalidAlert: BooleanCardCallerProps = {
    text: 'Los datos introducidos son inválidos',
    action: 'alert',
  }
  const nameAlert: BooleanCardCallerProps = {
    text: 'Este nombre ya existe',
    action: 'alert',
  }
  const catchName: FunctionVoid = () => {
    BooleanCard.call( nameAlert )
  }
  // Verify if input data is valid
  const invalidName: boolean = name === '',
    invalidWeight: boolean = !Q_.test( weight ),
    invalidPrice: boolean = !Q_.test( price )
  if( invalidName || invalidWeight || invalidPrice ) {  // Invalid
    BooleanCard.call( invalidAlert )
  }
  else {  // Valid
    // If id is empty the user is trying to create and article, else, the user is trying to edit
    if( id ) { editArticle( id, defaultName, name, weight, price, BooleanCard, catchName ) }
    else{ createArticle( name, weight, price, catchName ) }
  }
}

interface ArticlesCardProps { quit:HideFunction }

interface ArticlesCardCallerProps {
  articleId: string,
  defaultName: string,
  defaultWeight: string,
  defaultPrice: string,
}

function ArticlesCard( props:ArticlesCardProps, callerProps:ArticlesCardCallerProps|undefined, id:number ): ReactElement {
  const { quit } = props
  // Setting "callerProps" values by default
  if( !callerProps ) {
    callerProps = {
      articleId: '',
      defaultName: '',
      defaultWeight: '',
      defaultPrice: '',
      
    }
  }
  const { articleId, defaultName, defaultWeight, defaultPrice } = callerProps
  const hiding = useHiding( id )
  const { SwitchableBooleanCard } = useContext( AppContext )
  const [ name, setName ] = useState( defaultName )
  const [ weight, setWeight ] = useState( defaultWeight )
  const [ price, setPrice ] = useState( defaultPrice )
  return (
    <Card
      quit={ quit }
      hiding={ hiding }
      action={
        () => {
          setTimeout( () => {
            // Waiting to hide InventoryCard
            articlesCardAction( articleId, defaultName, name, weight, price, SwitchableBooleanCard )
          }, 400 )
        }
      }>
      <CustomTextInput title="Nombre" defaultValue={ defaultName } setValue={ setName } />
      <CustomTextInput title="Peso" defaultValue={ defaultWeight } unit="Kg" setValue={ setWeight } />
      <CustomTextInput title="Precio" defaultValue={ defaultPrice } unit="$" setValue={ setPrice } />
    </Card>
  )
}

export default ArticlesCard
export { ArticlesCardCallerProps, ArticlesCardProps }