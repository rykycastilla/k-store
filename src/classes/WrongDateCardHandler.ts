import { SwitchableComponent } from 'react-component-switcher'

type SWDC = SwitchableComponent<unknown,unknown>

class WrongDateCardHandler {
  
  private readonly target: SWDC

  constructor( target:SWDC ) {
    this.target = target
  }

  public show() {
    const { target } = this
    if( !target.showing ) { target.call() }
  }

  public hide() {
    const { target } = this
    if( target.showing ) { target.hide() }
  }

}

export default WrongDateCardHandler
export { SWDC }