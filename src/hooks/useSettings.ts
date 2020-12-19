import { useContext } from 'react'

import SettingsContext from '../contexts/SettingsContext'
import { SettingsContextValue } from '../contexts/SettingsContext/types'

const useSettings = (): SettingsContextValue => useContext(SettingsContext)

export default useSettings
