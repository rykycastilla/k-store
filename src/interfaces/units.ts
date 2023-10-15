import Storage from '../classes/Storage'

enum MassUnits {
  KILOGRAM = 'Kg',
  POUND = 'Lb',
  GRAM = 'g',
}

interface Units { mass:MassUnits }

const DEFAULT_DATA: Units = { mass: MassUnits.KILOGRAM }

class Unit extends Storage<Units> {
  constructor() {
    super( 'unit', JSON.stringify( DEFAULT_DATA ) )
  }
  public setMass( mass:MassUnits ) {
    const { storage } = this
    if( !storage ) { return }
    storage.mass = mass
    this.saveStorage()
  }
}

const unit = new Unit()

export default unit
export { MassUnits, Units }