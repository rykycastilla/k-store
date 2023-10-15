import AppContext from '../../app_context'
import { BooleanCardCallerProps } from './BooleanCard'
import { CheckBoxCardCallerProps } from './CheckBoxCard'
import { FunctionVoid, SBC } from '../types'
import React, { ReactElement, useContext } from 'react'
import Section from './Section'
import units, { Currencies, MassUnits } from '../interfaces/units'

type CheckBoxCardCaller = ( callerProps:CheckBoxCardCallerProps ) => void

function symbolDisclaimer( SwitchableBooleanCard:SBC, avoidAction:boolean, callback:FunctionVoid ) {
  if( avoidAction ) { return }  // Avoiding execution in special cases
  const booleanCallerProps: BooleanCardCallerProps = {
    text: 'This action only will change the symbol (it is not a unit conversion)',
    action: callback,
  }
  // Waiting to hide the previous Card
  setTimeout( () => { 
    SwitchableBooleanCard.call( booleanCallerProps )
  }, 500 )
}

function massAction( checkBoxCardCaller:CheckBoxCardCaller, mass:MassUnits, SwitchableBooleanCard:SBC ) {
  const massUnits: MassUnits[] = [ MassUnits.GRAM, MassUnits.KILOGRAM, MassUnits.POUND ]
  const checkBoxCallerProps: CheckBoxCardCallerProps = {
    items: [ 'Gram', 'Kilogram', 'Pound' ],
    selectedIndex: massUnits.indexOf( mass ),
    action( index:number ) {
      const newUnit: MassUnits = massUnits[ index ],
        avoidAction: boolean = mass === newUnit
      symbolDisclaimer( SwitchableBooleanCard, avoidAction, () => {
        units.setMass( newUnit )
      } )
    }
  }
  checkBoxCardCaller( checkBoxCallerProps )
}

function currencyAction( checkBoxCardCaller:CheckBoxCardCaller, currency:Currencies, SwitchableBooleanCard:SBC ) {
  const currencies: Currencies[] = [ Currencies.DOLLAR, Currencies.EURO ]
  const checkBoxCallerProps: CheckBoxCardCallerProps = {
    items: [ 'Dollar', 'Euro' ],
    selectedIndex: currencies.indexOf( currency ),
    action( index:number ) {
      const newCurrency: Currencies = currencies[ index ],
        avoidAction: boolean = currency === newCurrency
      symbolDisclaimer( SwitchableBooleanCard, avoidAction, () => {
        units.setCurrency( newCurrency )
      } )
    }
  }
  checkBoxCardCaller( checkBoxCallerProps )
}

function UnitsSection(): ReactElement {
  const { SwitchableCheckBoxCard, unitsData, SwitchableBooleanCard } = useContext( AppContext )
  const items = [
    {
      title: 'Mass',
      action() { massAction( SwitchableCheckBoxCard.call, unitsData.mass, SwitchableBooleanCard ) }
    },
    {
      title: 'Currency',
      action() { currencyAction( SwitchableCheckBoxCard.call, unitsData.currency, SwitchableBooleanCard ) }
    },
  ]
  return <Section name="Units" items={ items } />
}

export default UnitsSection