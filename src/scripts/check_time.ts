import AsyncStorage from '@react-native-async-storage/async-storage'
import getTime from '../services/get_time'
import WrongDateCardHandler, { SWDC } from '../classes/WrongDateCardHandler'

const MAX_DIFFERENCE = 7_200_000,  // 2 hours
  PREVIOUS_VALID_DATE_KEY = 'previous-valid-date'

// Checking if the current date is valid
async function onlineStrategy(): Promise<boolean> {
  const { currentTime } = await getTime()
  const difference: number = Math.abs( Date.now() - currentTime )
  return difference <= MAX_DIFFERENCE
}

// Checking if the current date is valid
async function offlineStrategy(): Promise<boolean> {
  const result: string | null = await AsyncStorage.getItem( PREVIOUS_VALID_DATE_KEY )
  const validDate: number = result
    ? Number( result )
    : 0
  return validDate < Date.now()
}

async function checkTime( WrongDateCard:SWDC ) {
  let dateIsValid: boolean
  // Using strategies to check the date
  try { dateIsValid = await onlineStrategy() }
  catch { dateIsValid = await offlineStrategy() }
  // Using the "wrong date card" (if it is necesary)
  const handler = new WrongDateCardHandler( WrongDateCard )
  if( dateIsValid ) {
    handler.hide()
    // Saving the new valid date
    const newValidDate: number = Date.now()
    await AsyncStorage.setItem( PREVIOUS_VALID_DATE_KEY, String( newValidDate ) )
  }
  else { handler.show() }
}

export default checkTime