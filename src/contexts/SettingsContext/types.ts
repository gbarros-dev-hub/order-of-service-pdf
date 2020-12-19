export type Settings = {
  theme?: string
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (update: Settings) => void
}

export type SettingsProviderProps = {
  settings?: Settings
  children?: React.ReactNode
}
