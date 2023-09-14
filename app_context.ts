import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { createContext } from 'react'
import { StateSetter } from './src/types'
import { SwitchableComponent } from 'react-component-switcher'

export interface AppContextData {
  setBarColor: StateSetter<string>,
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>
}

const AppContext = createContext( {} as AppContextData )

export default AppContext