import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { createContext } from 'react'
import { InventoryCardProps } from './src/components/InventoryCard'
import { SwitchableComponent } from 'react-component-switcher'

import { ArticlesCardProps } from './src/components/ArticlesCard'

interface AppContextData {
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>
  SwitchableInventoryCard: SwitchableComponent<InventoryCardProps,unknown>
  SwitchableArticlesCard: SwitchableComponent<ArticlesCardProps,unknown>
}

const AppContext = createContext( {} as AppContextData )

export default AppContext
export { AppContextData }