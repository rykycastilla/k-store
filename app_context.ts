import { ArticlesCardCallerProps, ArticlesCardProps } from './src/components/ArticlesCard'
import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { createContext } from 'react'
import { InventoryCardCallerProps, InventoryCardProps } from './src/components/InventoryCard'
import { InventoryIndex } from './src/interfaces/inventory'
import { SwitchableComponent } from 'react-component-switcher'

import { RegistryTableCallerProps, RegistryTableProps } from './src/components/RegistryTable'

interface AppContextData {
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>,
  SwitchableInventoryCard: SwitchableComponent<InventoryCardProps,InventoryCardCallerProps>,
  SwitchableArticlesCard: SwitchableComponent<ArticlesCardProps,ArticlesCardCallerProps|undefined>,
  SwitchableRegistryTable: SwitchableComponent<RegistryTableProps,RegistryTableCallerProps>
  inventoryData: InventoryIndex,
}

const AppContext = createContext( {} as AppContextData )

export default AppContext
export { AppContextData }