import { BooleanCardCallerProps, BooleanCardProps } from './components/BooleanCard'
import { CallFunction, SwitchableComponent } from 'react-component-switcher'
import { Dispatch, SetStateAction } from 'react'
import { LoadingWallCallerProps, LoadingWallProps } from './components/LoadingWall'

export type StateSetter<T> = Dispatch<SetStateAction<T>>
export type FunctionVoid = () => void
export type CallSwitchable = CallFunction<unknown>
export type SBC = SwitchableComponent<BooleanCardProps,BooleanCardCallerProps>
export type SLW = SwitchableComponent<LoadingWallProps,LoadingWallCallerProps>