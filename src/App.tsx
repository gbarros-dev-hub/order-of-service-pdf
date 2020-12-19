import type { FC } from 'react'
import { jssPreset, makeStyles, StylesProvider, ThemeProvider } from '@material-ui/core'
import { create } from 'jss'
import rtl from 'jss-rtl'

import { createTheme, Theme } from './theme'

import useSettings from './hooks/useSettings'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  title: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
  },
  gridWrapper: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(2),
  },
}))

const App: FC = () => {
  const classes = useStyles()
  const { settings } = useSettings()

  const theme = createTheme({ theme: settings.theme })

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <div className={classes.root}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>App</div>
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
