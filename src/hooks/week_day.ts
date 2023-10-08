import React, { useMemo } from 'react'

function getWeekDay( date:Date ): string {
  const weekDay: number = date.getDay()
  let weekDayName = ''
  switch( weekDay ) {
    case 0: 
      weekDayName = 'domingo'
      break
    case 1: 
      weekDayName = 'lunes'
      break
    case 2: 
      weekDayName = 'martes'
      break
    case 3: 
      weekDayName = 'miércoles'
      break
    case 4: 
      weekDayName = 'jueves'
      break
    case 5: 
      weekDayName = 'viernes'
      break
    case 6: 
      weekDayName = 'sábado'
      break
  }
  const monthDay: number = date.getDate()
  return `${ weekDayName }, ${ monthDay }`
}

function useWeekDay( date:Date ): string {
  const result: string = useMemo( () => {
    return getWeekDay( date )
  }, [ date ] )
  return result
}

export default useWeekDay