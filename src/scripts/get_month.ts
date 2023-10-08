function getMonth( date:Date ): string {
  const monthIndex: number = date.getMonth()
  let month = ''
  switch( monthIndex ) {
    case 0:
      month = 'enero'
      break
    case 1:
      month = 'febrero'
      break
    case 2:
      month = 'marzo'
      break
    case 3:
      month = 'abril'
      break
    case 4:
      month = 'mayo'
      break
    case 5:
      month = 'junio'
      break
    case 6:
      month = 'julio'
      break
    case 7:
      month = 'agosto'
      break
    case 8:
      month = 'septiembre'
      break
    case 9:
      month = 'octubre'
      break
    case 10:
      month = 'noviembre'
      break
    case 11:
      month = 'diciembre'
      break
  }
  const year: number = date.getFullYear()
  return `${ month }, ${ year }`
}

export default getMonth