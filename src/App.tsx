import React from 'react'
import type { FC } from 'react'
import { makeStyles } from '@material-ui/core'

import { Theme } from './theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
}))

const App: FC = () => {
  const classes = useStyles()

  return <div className={classes.root}>App</div>
}

export default App
