import { ArticlesCardCallerProps, ArticlesCardProps } from './src/components/ArticlesCard'
import { BooleanCardProps, BooleanCardCallerProps } from './src/components/BooleanCard'
import { CheckBoxCardCallerProps, CheckBoxCardProps } from './src/components/CheckBoxCard'
import { createContext } from 'react'
import { DateList } from './src/interfaces/history'
import { InventoryCardCallerProps, InventoryCardProps } from './src/components/InventoryCard'
import { InventoryIndex } from './src/interfaces/inventory'
import { Languages } from './src/hooks/language'
import { LoadingWallCallerProps, LoadingWallProps } from './src/components/LoadingWall'
import { ProfileViewCallerProps, ProfileViewProps } from './src/views/ProfileView'
import { RegistryTableCallerProps, RegistryTableProps } from './src/components/RegistryTable'
import { FunctionVoid, StateSetter } from './src/types'
import { SwitchableComponent } from 'react-component-switcher'
import { Units } from './src/interfaces/units'

interface AppContextData {
  SwitchableLoginView: SwitchableComponent<unknown,unknown>
  SwitchableBooleanCard: SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>,
  SwitchableInventoryCard: SwitchableComponent<InventoryCardProps,InventoryCardCallerProps>,
  SwitchableArticlesCard: SwitchableComponent<ArticlesCardProps,ArticlesCardCallerProps|undefined>,
  SwitchableRegistryTable: SwitchableComponent<RegistryTableProps,RegistryTableCallerProps>,
  SwitchableCheckBoxCard: SwitchableComponent<CheckBoxCardProps,CheckBoxCardCallerProps>,
  SwitchableLoadingWall: SwitchableComponent<LoadingWallProps,LoadingWallCallerProps>
  SwitchableProfileView: SwitchableComponent<ProfileViewProps,ProfileViewCallerProps>,
  inventoryData: InventoryIndex,
  historyData: DateList,
  defaultLanguage: Languages,
  setDefaultLanguage: StateSetter<Languages[]>,
  unitsData: Units,
  pressing: boolean,
  press: FunctionVoid,
}

const AppContext = createContext( {} as AppContextData )

export default AppContext
export { AppContextData }