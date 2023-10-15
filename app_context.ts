import { ArticlesCardCallerProps, ArticlesCardProps } from './src/components/ArticlesCard'
import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { CheckBoxCardCallerProps, CheckBoxCardProps } from './src/components/CheckBoxCard'
import { createContext } from 'react'
import { InventoryCardCallerProps, InventoryCardProps } from './src/components/InventoryCard'
import { InventoryIndex } from './src/interfaces/inventory'
import { Languages } from './src/hooks/language'
import { RegistryTableCallerProps, RegistryTableProps } from './src/components/RegistryTable'
import { StateSetter } from './src/types'
import { SwitchableComponent } from 'react-component-switcher'
import { Units } from './src/interfaces/units'

interface AppContextData {
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>,
  SwitchableInventoryCard: SwitchableComponent<InventoryCardProps,InventoryCardCallerProps>,
  SwitchableArticlesCard: SwitchableComponent<ArticlesCardProps,ArticlesCardCallerProps|undefined>,
  SwitchableRegistryTable: SwitchableComponent<RegistryTableProps,RegistryTableCallerProps>,
  SwitchableCheckBoxCard: SwitchableComponent<CheckBoxCardProps,CheckBoxCardCallerProps>,
  inventoryData: InventoryIndex,
  defaultLanguage: Languages,
  setDefaultLanguage: StateSetter<Languages[]>,
  unitsData: Units,
}

const AppContext = createContext( {} as AppContextData )

export default AppContext
export { AppContextData }