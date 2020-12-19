import React from 'react'
import type { FC } from 'react'
import { jssPreset, makeStyles, StylesProvider, ThemeProvider } from '@material-ui/core'
import { create } from 'jss'
import rtl from 'jss-rtl'

import { createTheme, Theme } from './theme'

import useSettings from './hooks/useSettings'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
}))

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

const App: FC = () => {
  const classes = useStyles()
  const { settings } = useSettings()

  const theme = createTheme({ theme: settings.theme })

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <div className={classes.root}>App</div>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
