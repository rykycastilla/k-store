import AsyncStorage from '@react-native-async-storage/async-storage'
import { Languages } from '../hooks/language'
import Storage from '../classes/Storage'

class AppLanguage extends Storage<Languages[]> {
  constructor() { super( 'language', '[]' ) }
  // Overwritting "saveStorage" to change React State only one time
  protected saveStorage() {
    const { storage } = this
    if( !storage ) { return }
    // Saving in persistent memory
    const encodeStorage: string = JSON.stringify( storage )
    AsyncStorage.setItem( this.storageKey, encodeStorage )
  }
  public clear() {
    const { storage } = this
    if( !storage ) { return }
    storage.splice( 0, 1 )
    this.saveStorage()
  }
  public change( language:Languages ) {
    const { storage } = this
    if( !storage ) { return }
    storage[ 0 ] = language
    this.saveStorage()
  }
}

const appLanguage = new AppLanguage()

export default appLanguage