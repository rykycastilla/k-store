import deleteUser from '../services/delete_user'
import Errors from '../interfaces/Errors'
import { forgetWithoutDisclaimer } from './forget_session'
import { Language } from '../hooks/language'
import { SBC, SLW } from '../types'

function deleteAccount( BooleanCard:SBC, LoadingWall:SLW, language:Language ) {
  LoadingWall
  const callerProps = {
    text: language.deleteAccountWarning,
    action () {
      const promise: Promise<void> = deleteUser()
      const callerProps = {
        promise,
        then() {
          forgetWithoutDisclaimer()
          return null
        },
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
          }
          const message = { text, action }
          return message
        },
      }
      setTimeout( () => LoadingWall.call( callerProps ), 500 )
    }
  }
  BooleanCard.call( callerProps )
}

export default deleteAccount