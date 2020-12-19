import React from 'react'
import { Box, Button, Card, CardHeader, Dialog, Divider, Grid, makeStyles, Typography } from '@material-ui/core'

import { Theme } from '../theme'

import { Task } from '../types/service'

type ModalDeleteTaskProps = {
  open: boolean
  task: Task
  onClose: () => void
  onConfirm: (taskId: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  paper: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}))

const ModalDeleteTask: React.FC<ModalDeleteTaskProps> = ({ open, task, onClose, onConfirm }) => {
  const classes = useStyles()

  return (
    <Dialog maxWidth='xl' open={open}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Card>
          <CardHeader title='Are you sure you want to delete the selected task??' />
          <Divider />
          <Box p={3}>
            <Typography align='left' gutterBottom variant='body2' color='textPrimary'>
              Description: {task.description}
            </Typography>
            <Typography align='left' gutterBottom variant='body2' color='textPrimary'>
              Value: {task.value}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Box p={2} display='flex' alignItems='center'>
        <Button
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          Cancel
        </Button>
        <Box flexGrow={1} />
        <Button
          className={classes.confirmButton}
          onClick={(e) => {
            e.preventDefault()
            onConfirm(task._id)
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  )
}

export default ModalDeleteTask
