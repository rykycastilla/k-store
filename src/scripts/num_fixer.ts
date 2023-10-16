const MAX_NUM = 9999

// Fix number's values: for greater than "9999", show "9999+". Also it gets an option (boolean) to significant numbers (only two numbers)
function numFixer( num:number, significantNum?:boolean ): string {
  let result: string 
  if( num > MAX_NUM ) { result = `${ MAX_NUM }+` }
  else {
    result = significantNum
      ? num.toFixed( 2 )
      : String( num )
  }
  return result
}

export default numFixer