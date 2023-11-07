import Errors from '../interfaces/Errors'
import implementBackup from './implement_backup'
import { Language } from '../hooks/language'
import { SBC, SLW } from '../types'

function loadBackup( BooleanCard:SBC, LoadingWall:SLW, restoreWarning:string, language:Language ) {
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
          let text = language.unknownIssue
          switch( err ) {
          case Errors.NETWORK_FAILURE:
            text = language.networkFailure
            break
          case Errors.FORBIDDEN:
            text = language.forbidden
            break
          case Errors.NOT_FOUND:
            text = language.noBackup
            break
          case Errors.INTERNAL_SERVER_ERROR:
            text = language.corruptBackup
            break
          case Errors.WRONG_DATE:
            text = language.wrongDate
            break
          case Errors.PAYLOAD_TOO_LARGE:
            text = language.lateServerError
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