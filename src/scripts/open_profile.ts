import { ProfileViewCallerProps, ProfileViewProps } from '../views/ProfileView'
import { SLW } from '../types'
import { SwitchableComponent } from 'react-component-switcher'
import userData, { Data } from '../interfaces/user_data'

type SPV = SwitchableComponent<ProfileViewProps,ProfileViewCallerProps>

function callView( data:Data, ProfileView:SPV ): null {
  setTimeout( () => ProfileView.call( data ), 100 )
  return null
}

function openProfile( LoadingWall:SLW, ProfileView:SPV ) {
  const promise = userData.update()
  const callerProps = {
    promise,
    then( result:unknown ) {
      const data = result as Data
      return callView( data, ProfileView )
    },
    catch() { return null }
  }
  LoadingWall.call( callerProps )
}

export default openProfile