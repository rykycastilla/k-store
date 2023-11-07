import AppContext from '../../app_context'
import loadBackup from '../scripts/load_backup'
import React, { ReactElement, useContext } from 'react'
import saveBackup from '../scripts/save_backup'
import Section from './Section'
import useLanguage from '../hooks/language'

function BackupSection(): ReactElement {
  const {
    SwitchableBooleanCard,
    SwitchableLoadingWall,
    inventoryData,
    historyData,
    unitsData,
  } = useContext( AppContext )
  const [ language ] = useLanguage()
  const items = [
    {
      title: language.load,
      action() {
        const restoreWarning = language.loadWarning
        loadBackup( SwitchableBooleanCard, SwitchableLoadingWall, restoreWarning, language )
      }
    },
    {
      title: language.save,
      action() {
        saveBackup( inventoryData, historyData, unitsData, SwitchableBooleanCard, SwitchableLoadingWall, language )
      }
    },
  ]
  return <Section name={ language.backup } items={ items } />
}

export default BackupSection