import type { FC } from 'react'
import { Box, Container, Grid, jssPreset, makeStyles, StylesProvider, ThemeProvider, Typography } from '@material-ui/core'
import { create } from 'jss'
import rtl from 'jss-rtl'

import { createTheme, Theme } from './theme'

import useSettings from './hooks/useSettings'

import Page from './components/Page'

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
            <div className={classes.content}>
              <Page className={classes.title} title='Order of Service'>
                <Container maxWidth={false}>
                  <Grid className={classes.gridWrapper} container justify='space-between' spacing={3}>
                    <Grid item>
                      <Typography variant='h3' color='textPrimary'>
                        Order of Service
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={3}>App</Box>
                </Container>
              </Page>
            </div>
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
