import AppContext from '../../app_context'
import { BooleanCardCallerProps } from './BooleanCard'
import { CheckBoxCardCallerProps } from './CheckBoxCard'
import { FunctionVoid, SBC } from '../types'
import React, { ReactElement, useContext } from 'react'
import Section from './Section'
import units, { Currencies, MassUnits } from '../interfaces/units'
import useLanguage, { Language } from '../hooks/language'

type CheckBoxCardCaller = ( callerProps:CheckBoxCardCallerProps ) => void

function symbolDisclaimer( SwitchableBooleanCard:SBC, language:Language, avoidAction:boolean, callback:FunctionVoid ) {
  if( avoidAction ) { return }  // Avoiding execution in special cases
  const booleanCallerProps: BooleanCardCallerProps = {
    text: language.symbolDisclaimer,
    action: callback,
  }
  // Waiting to hide the previous Card
  setTimeout( () => { 
    SwitchableBooleanCard.call( booleanCallerProps )
  }, 500 )
}

function massAction( checkBoxCardCaller:CheckBoxCardCaller, mass:MassUnits, SwitchableBooleanCard:SBC, language:Language ) {
  const massUnits: MassUnits[] = [ MassUnits.GRAM, MassUnits.KILOGRAM, MassUnits.POUND ]
  const checkBoxCallerProps: CheckBoxCardCallerProps = {
    items: [ language.gram, language.kilogram, language.pound ],
    selectedIndex: massUnits.indexOf( mass ),
    action( index:number ) {
      const newUnit: MassUnits = massUnits[ index ],
        avoidAction: boolean = mass === newUnit
      symbolDisclaimer( SwitchableBooleanCard, language, avoidAction, () => {
        units.setMass( newUnit )
      } )
    }
  }
  checkBoxCardCaller( checkBoxCallerProps )
}

function currencyAction( checkBoxCardCaller:CheckBoxCardCaller, currency:Currencies, SwitchableBooleanCard:SBC, language:Language ) {
  const currencies: Currencies[] = [ Currencies.DOLLAR, Currencies.EURO ]
  const checkBoxCallerProps: CheckBoxCardCallerProps = {
    items: [ language.dollar, language.euro ],
    selectedIndex: currencies.indexOf( currency ),
    action( index:number ) {
      const newCurrency: Currencies = currencies[ index ],
        avoidAction: boolean = currency === newCurrency
      symbolDisclaimer( SwitchableBooleanCard, language, avoidAction, () => {
        units.setCurrency( newCurrency )
      } )
    }
  }
  checkBoxCardCaller( checkBoxCallerProps )
}

function UnitsSection(): ReactElement {
  const { SwitchableCheckBoxCard, unitsData, SwitchableBooleanCard } = useContext( AppContext )
  const [ language ] = useLanguage()
  const items = [
    {
      title: language.mass,
      action() { massAction( SwitchableCheckBoxCard.call, unitsData.mass, SwitchableBooleanCard, language ) }
    },
    {
      title: language.currency,
      action() { currencyAction( SwitchableCheckBoxCard.call, unitsData.currency, SwitchableBooleanCard, language ) }
    },
  ]
  return <Section name={ language.units } items={ items } />
}

export default UnitsSection