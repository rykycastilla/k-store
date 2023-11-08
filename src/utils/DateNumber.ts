type DateValue = string | number | Date
type DateNumber = Date & number

// Contructor to mix type "Number" and type "Date" and "floor" the date
function DateNumber( value?:DateValue ): DateNumber {
  const time: Date = typeof value === 'undefined'
    ? new Date()
    : new Date( value )
  // Using the first hour of the current date
  const date = time.toDateString(),
    floorDate = new Date( date )
  return floorDate as unknown as DateNumber
}

export default DateNumber