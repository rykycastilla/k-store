const MAX_LENGTH = 12,
  VISIBLE_CHARS = MAX_LENGTH - 3

function nameFixer( name:string ): string {
  const nameLength: number = name.length
  if( nameLength > MAX_LENGTH ) {
    const visiblePart: string = name.slice( 0, VISIBLE_CHARS ),
      fixedName = `${ visiblePart }...`
      return fixedName
  }
  return name
}

export default nameFixer