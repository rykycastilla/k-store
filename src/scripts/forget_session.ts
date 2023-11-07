import AsyncStorage from '@react-native-async-storage/async-storage'
import { Language } from '../hooks/language'
import RNRestart from 'react-native-restart'
import { SBC } from '../types'
import session from '../interfaces/session'

async function forget() {
  await session.forget()
  await AsyncStorage.clear()
  RNRestart.restart()
}

function forgetSession( BooleanCard:SBC, language:Language ) {
  const callerProps = {
    text: language.logOutWarning,
    action() { forget() }
  }
  BooleanCard.call( callerProps )
}

export default forgetSession
export { forget as forgetWithoutDisclaimer }