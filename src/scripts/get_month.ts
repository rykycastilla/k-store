import { Language } from '../hooks/language'

function getMonth( date:Date, language:Language ): string {
  const monthIndex: number = date.getMonth()
  let month = ''
  switch( monthIndex ) {
    case 0:
      month = language.january
      break
    case 1:
      month = language.february
      break
    case 2:
      month = language.march
      break
    case 3:
      month = language.april
      break
    case 4:
      month = language.may
      break
    case 5:
      month = language.june
      break
    case 6:
      month = language.july
      break
    case 7:
      month = language.augost
      break
    case 8:
      month = language.september
      break
    case 9:
      month = language.octover
      break
    case 10:
      month = language.november
      break
    case 11:
      month = language.december
      break
  }
  const year: number = date.getFullYear()
  return `${ month }, ${ year }`
}

export default getMonth