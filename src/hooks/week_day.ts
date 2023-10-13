import React, { useMemo } from 'react'
import useLanguage, { Language } from './language'

function getWeekDay( date:Date, language:Language ): string {
  const weekDay: number = date.getDay()
  let weekDayName = ''
  switch( weekDay ) {
    case 0: 
      weekDayName = language.sunday
      break
    case 1: 
      weekDayName = language.monday
      break
    case 2: 
      weekDayName = language.tuesday
      break
    case 3: 
      weekDayName = language.wednesday
      break
    case 4: 
      weekDayName = language.thursday
      break
    case 5: 
      weekDayName = language.friday
      break
    case 6: 
      weekDayName = language.saturday
      break
  }
  const monthDay: number = date.getDate()
  return `${ weekDayName }, ${ monthDay }`
}

function useWeekDay( date:Date ): string {
  const [ language ] = useLanguage()
  const result: string = useMemo( () => {
    return getWeekDay( date, language )
  }, [ date, JSON.stringify( language ) ] )
  return result
}

export default useWeekDay