import Errors from '../interfaces/Errors'
import implementBackup from './implement_backup'
import { SBC, SLW } from '../types'

function loadBackup( BooleanCard:SBC, LoadingWall:SLW, restoreWarning:string ) {
  const callerProps = {
    text: restoreWarning,
    action() {
      // Using backup data
      const promise: Promise<void> = implementBackup()
      const loadingCallerProps = {
        promise,
        then() { return null },
        catch( err:string ) {
          type Alert = 'alert'
          const action: Alert = 'alert'
          let text = 'Unknown Issue'
          switch( err ) {
          case Errors.NETWORK_FAILURE:
            text = 'You have no internet access, please, check your network settings'
            break
          case Errors.FORBIDDEN:
            text = 'You are not authorized to use the service. Log out and log in again with a valid account'
            break
          case Errors.NOT_FOUND:
            text = 'There is no backup yet'
            break
          case Errors.INTERNAL_SERVER_ERROR:
            text = 'Your inventory backup is damaged or corrupt. To solve it, save a new valid backup'
            break
          case Errors.WRONG_DATE:
            text = 'Your device have no the correct date, please, solve it'
            break
          case Errors.PAYLOAD_TOO_LARGE:
            text = 'The server took too long to respond'
            break
          }
          const message = { text, action }
          return message
        },
      }
      setTimeout( () => LoadingWall.call( loadingCallerProps ), 500 )
    }
  }
  BooleanCard.call( callerProps )
}

export default loadBackup