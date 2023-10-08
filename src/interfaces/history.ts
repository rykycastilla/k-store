import Storage from '../classes/Storage'

type DateList = string[]
type UpdateCallback = ( lastDate:string, today:string ) => void

class History extends Storage<DateList> {
  public storage = super.storage
  constructor() {
    super( 'history', '[]' )
  }
  // Add "today" to the history
  public update( callback:UpdateCallback ): string | null {
    const { storage } = this
    if( !storage ) { return null }
    const today = new Date().toDateString()
    const [ lastDate ] = storage
    // Only inlcude the new date if it does not exist
    const todayInHistory: boolean = storage.includes( today )
    if( todayInHistory ) { return today }
    // Reversing to start list by the near date
    storage.reverse()
    storage.push( today )
    storage.reverse()
    this.saveStorage()
    // Executing "callback" only when the registry is updated
    callback( lastDate, today )
    return today
  }

}

const history = new History()

export default history
export { DateList, UpdateCallback }