import AppContext from '../../app_context'
import articles from '../interfaces/articles'
import { BooleanCardProps, BooleanCardCallerProps } from './BooleanCard'
import Card from './Card'
import CustomTextInput from './CustomTextInput'
import { HideFunction, SwitchableComponent, useHiding } from 'react-component-switcher'
import { Q_ } from '../exp'
import React, { ReactElement, useContext, useState } from 'react'

type SBC = SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>

function articlesCardAction( name:string, weight:string, price:string, BooleanCard:SBC ) {
  // Building "Alerts"
  const invalidAlert: BooleanCardCallerProps = {
    text: 'Los datos introducidos son inválidos',
    action: 'alert',
  }
  const nameAlert: BooleanCardCallerProps = {
    text: 'Este nombre ya existe',
    action: 'alert',
  }
  // Verify if input data is valid
  const invalidName: boolean = name === '',
    invalidWeight: boolean = !Q_.test( weight ),
    invalidPrice: boolean = !Q_.test( price )
  if( invalidName || invalidWeight || invalidPrice ) {  // Invalid
    BooleanCard.call( invalidAlert )
  }
  else {  // Valid
    const articleWeight = Number( weight ),
      articlePrice = Number( price )
    articles.add( name, articleWeight, articlePrice, () => {
      BooleanCard.call( nameAlert )
    } )
  }
}

interface ArticlesCardProps { quit:HideFunction }

function ArticlesCard( props:ArticlesCardProps, callerProps:unknown, id:number ): ReactElement {
  const { quit } = props
  const hiding = useHiding( id )
  const { SwitchableBooleanCard } = useContext( AppContext )
  const [ name, setName ] = useState( '' )
  const [ weight, setWeight ] = useState( '' )
  const [ price, setPrice ] = useState( '' )
  return (
    <Card
      quit={ quit }
      hiding={ hiding }
      action={
        () => {
          setTimeout( () => {
            // Waiting to hide InventoryCard
            articlesCardAction( name, weight, price, SwitchableBooleanCard )
          }, 400 )
        }
      }>
      <CustomTextInput title="Nombre" setValue={ setName } />
      <CustomTextInput title="Peso" unit="Kg" setValue={ setWeight } />
      <CustomTextInput title="Precio" unit="$" setValue={ setPrice } />
    </Card>
  )
}

export default ArticlesCard
export { ArticlesCardProps }