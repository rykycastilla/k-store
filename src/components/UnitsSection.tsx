import AppContext from '../../app_context'
import { CheckBoxCardCallerProps } from './CheckBoxCard'
import React, { ReactElement, useContext } from 'react'
import Section from './Section'
import units, { Currencies, MassUnits } from '../interfaces/units'

type CheckBoxCardCaller = ( callerProps:CheckBoxCardCallerProps ) => void

function massAction( checkBoxCardCaller:CheckBoxCardCaller, mass:MassUnits ) {
  const massUnits: MassUnits[] = [ MassUnits.GRAM, MassUnits.KILOGRAM, MassUnits.POUND ]
  const callerProps: CheckBoxCardCallerProps = {
    items: [ 'Gram', 'Kilogram', 'Pound' ],
    selectedIndex: massUnits.indexOf( mass ),
    action( index:number ) {
      const newUnit: MassUnits = massUnits[ index ]
      units.setMass( newUnit )
    }
  }
  checkBoxCardCaller( callerProps )
}

function currencyAction( checkBoxCardCaller:CheckBoxCardCaller, currency:Currencies ) {
  const currencies: Currencies[] = [ Currencies.DOLLAR, Currencies.EURO ]
  const callerProps: CheckBoxCardCallerProps = {
    items: [ 'Dollar', 'Euro' ],
    selectedIndex: currencies.indexOf( currency ),
    action( index:number ) {
      const newCurrency: Currencies = currencies[ index ]
      units.setCurrency( newCurrency )
    }
  }
  checkBoxCardCaller( callerProps )
}

function UnitsSection(): ReactElement {
  const { SwitchableCheckBoxCard, unitsData } = useContext( AppContext )
  console.log( unitsData )
  const items = [
    {
      title: 'Mass',
      action() { massAction( SwitchableCheckBoxCard.call, unitsData.mass ) }
    },
    {
      title: 'Currency',
      action() { currencyAction( SwitchableCheckBoxCard.call, unitsData.currency ) }
    },
  ]
  return <Section name="Units" items={ items } />
}

export default UnitsSection