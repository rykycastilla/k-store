import { Dispatch, SetStateAction } from 'react'

export type StateSetter<T> = Dispatch<SetStateAction<T>>
export type FunctionVoid = () => void