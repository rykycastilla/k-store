import { DateList } from '../interfaces/history'
import Errors from '../interfaces/Errors'
import { InventoryIndex } from '../interfaces/inventory'
import { Language } from '../hooks/language'
import { LoadingWallCallerProps, LoadingWallProps } from '../components/LoadingWall'
import postBackup, { PostBackupResult } from '../services/post_backup'
import { SBC } from '../types'
import session from '../interfaces/session'
import { SwitchableComponent } from 'react-component-switcher'
import { Units } from '../interfaces/units'

type SLW = SwitchableComponent<LoadingWallProps,LoadingWallCallerProps>

function saveBackup( inventory:InventoryIndex, history:DateList, units:Units, BooleanCard:SBC, LoadingWall:SLW, language:Language ) {
  const callerProps = {
    text: language.saveWarning,
    action() {
      const promise: Promise<PostBackupResult> = postBackup( inventory, history, units )
      const loadingCallerProps = {
        promise,
        then( result:unknown ) {
          const { nextToken } = result as PostBackupResult
          session.use( nextToken )
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
          case Errors.BAD_REQUEST:
            text = language.corruptBackup
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

export default saveBackup