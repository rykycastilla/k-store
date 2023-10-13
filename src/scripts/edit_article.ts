import { BooleanCardCallerProps } from '../components/BooleanCard'
import { FunctionVoid } from '../types'
import inventory from '../interfaces/inventory'
import { Language } from '../hooks/language'
import { SBC } from '../types'

async function editArticle( id:string, defaultName:string, name:string, weight:string, price:string, BooleanCard:SBC, catchName:FunctionVoid, language:Language ) {
  const parsedWeight = Number( weight ),
    parsedPrice = Number( price )
  // Creating Verification Alert
  const verificationAlert: BooleanCardCallerProps = {
    text: language.editWarning,
    // Using verification alert before edit
    action() { inventory.edit( defaultName, name, parsedWeight, parsedPrice, id, false ) }
  }
  // Verifying if name already exist (skipping action if storage was not loaded yet)
  const { storage } = inventory
  if( !storage ) { return }
  const nameExist: boolean = await inventory.nameExist( storage, name, defaultName )
  if( nameExist ) { catchName() }
  else { BooleanCard.call( verificationAlert ) }
}

export default editArticle