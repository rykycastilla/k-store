import Storage from '../classes/Storage'

enum MassUnits {
  KILOGRAM = 'Kg',
  POUND = 'Lb',
  GRAM = 'g',
}

enum Currencies {
  DOLLAR = '$',
  EURO = '€',
}

interface Units {
  mass: MassUnits,
  currency: Currencies,
}

const DEFAULT_DATA: Units = {
  mass: MassUnits.KILOGRAM,
  currency: Currencies.DOLLAR,
}

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
  public setCurrency( currency:Currencies ) {
    const { storage } = this
    if( !storage ) { return }
    storage.currency = currency
    this.saveStorage()
  }
}

const unit = new Unit()

export default unit
export { Currencies, MassUnits, Units }