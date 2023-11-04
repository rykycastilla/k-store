import AppContext from '../../app_context'
import loadBackup from '../scripts/load_backup'
import React, { ReactElement, useContext } from 'react'
import saveBackup from '../scripts/save_backup'
import Section from './Section'

function BackupSection(): ReactElement {
  const {
    SwitchableBooleanCard,
    SwitchableLoadingWall,
    inventoryData,
    historyData,
    unitsData,
  } = useContext( AppContext )
  const items = [
    {
      title: 'Load',
      action() {
        const restoreWarning = 'Are you sure you want to restore this backup? your current data will be deleted'
        loadBackup( SwitchableBooleanCard, SwitchableLoadingWall, restoreWarning )
      }
    },
    {
      title: 'Save',
      action() {
        saveBackup( inventoryData, historyData, unitsData, SwitchableBooleanCard, SwitchableLoadingWall )
      }
    },
  ]
  return <Section name="Backup" items={ items } />
}

export default BackupSection