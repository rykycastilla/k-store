import { BACKEND_URL } from '../env'
import { Languages } from '../hooks/language'
import { openBrowserAsync } from 'expo-web-browser'

function launchPrivacyPolicy( languageCode:Languages ) {
  const url = `${ BACKEND_URL }privacy/${ languageCode }`
  openBrowserAsync( url )
}

export default launchPrivacyPolicy