import deleteUser from '../services/delete_user'
import Errors from '../interfaces/Errors'
import { forgetWithoutDisclaimer } from './forget_session'
import { SBC, SLW } from '../types'

function deleteAccount( BooleanCard:SBC, LoadingWall:SLW ) {
  LoadingWall
  const callerProps = {
    text: 'Are you sure you want to delete your account (and your backup data). This action is IRREVERSIBLE',
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
          let text = 'Unknown Issue'
          switch( err ) {
          case Errors.NETWORK_FAILURE:
            text = 'You have no internet access, please, check your network settings'
            break
          case Errors.FORBIDDEN:
            text = 'You are not authorized to use the service. Log out and log in again with a valid account'
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