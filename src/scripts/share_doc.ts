import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'

async function shareDoc( html:string ) {
  const { uri } = await printToFileAsync( { html } )
  shareAsync( uri, { UTI: '.pdf', mimeType: 'application/pdf' } )
}

export default shareDoc