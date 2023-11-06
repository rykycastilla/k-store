import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart'
import { SBC } from '../types'
import session from '../interfaces/session'

async function forget() {
  await session.forget()
  await AsyncStorage.clear()
  RNRestart.restart()
}

function forgetSession( BooleanCard:SBC ) {
  const callerProps = {
    text: 'Are you sure you want to log out?',
    action() { forget() }
  }
  BooleanCard.call( callerProps )
}

export default forgetSession
export { forget as forgetWithoutDisclaimer }