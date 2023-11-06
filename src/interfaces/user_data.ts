import Storage from '../classes/Storage'
import getUserEmail from '../services/get_user_email'
import getUserName from '../services/get_user_name'
import getUserPicture, { GetUserPictureResult } from '../services/get_user_picture'
import session from './session'

interface Data {
  picture: GetUserPictureResult | null,
  name: string | null,
  email: string | null,
}

const defaultData: Data = {
  picture: null,
  name: null,
  email: null,
}

class UserData extends Storage<Data> {
  
  constructor() {
    super( 'user-data', JSON.stringify( defaultData ) )
  }

  // Use saved values
  private loadSaved(): Data {
    const { storage } = this
    if( !storage ) { return defaultData }
    return storage
  }

  // Find an use user data in the network
  public async update(): Promise<Data> {
    try {
      const picture = await getUserPicture()
      const { name } = await getUserName()
      const { email, nextToken } = await getUserEmail()
      session.use( nextToken )  // Updating session
      const dataInstance: Data = { picture, name, email }
      // Saving data
      this.storage = dataInstance
      this.saveStorage()
      return dataInstance
    }
    catch {
      return this.loadSaved()
    }
  }

}

const userData = new UserData()

export default userData
export { Data }