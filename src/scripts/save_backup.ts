import { DateList } from '../interfaces/history'
import Errors from '../interfaces/Errors'
import { InventoryIndex } from '../interfaces/inventory'
import { LoadingWallCallerProps, LoadingWallProps } from '../components/LoadingWall'
import postBackup, { PostBackupResult } from '../services/post_backup'
import { SBC } from '../types'
import session from '../interfaces/session'
import { SwitchableComponent } from 'react-component-switcher'
import { Units } from '../interfaces/units'

type SLW = SwitchableComponent<LoadingWallProps,LoadingWallCallerProps>

function saveBackup( inventory:InventoryIndex, history:DateList, units:Units, BooleanCard:SBC, LoadingWall:SLW ) {
  const callerProps = {
    text: 'Are you sure you want to make a backup of your current inventory and articles?',
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
          let text = 'Uknown Issue'
          switch( err ) {
          case Errors.NETWORK_FAILURE:
            text = 'You have no internet access, please, check your network settings'
            break
          case Errors.FORBIDDEN:
            text = 'You are not authorized to use the service. Log out and log in again with a valid account'
            break
          case Errors.BAD_REQUEST:
            text = 'Your inventory file is damaged or corrupt. To solve it, restore from your latest backup'
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

export default saveBackup