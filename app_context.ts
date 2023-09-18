import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { createContext } from 'react'
import { InventoryCardProps } from './src/components/InventoryCard'
import { StateSetter } from './src/types'
import { SwitchableComponent } from 'react-component-switcher'

export interface AppContextData {
  setBarColor: StateSetter<string>,
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>
  SwitchableInventoryCard: SwitchableComponent<InventoryCardProps,unknown>
}

const AppContext = createContext( {} as AppContextData )

export default AppContext