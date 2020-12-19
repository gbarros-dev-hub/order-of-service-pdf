import React from 'react'
import { Box, Button, Dialog, Grid, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuiv4 } from 'uuid'

import { Theme } from '../theme'

import { Task } from '../types/service'

import NumberFormatCustom from '../components/NumberFormatCustom'

type ModalTaskProps = {
  open: boolean
  task: Task
  insertTask: (data: Task) => void
  editTask: (data: Task) => void
  onClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2),
  },
  paper: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}))

const ModalTask: React.FC<ModalTaskProps> = ({ open, task, insertTask, editTask, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog maxWidth='sm' fullWidth open={open}>
      <Box p={3}>
        <Typography align='center' gutterBottom variant='h3' color='textPrimary'>
          {task._id ? 'Edit Task' : 'Insert Task'}
        </Typography>
      </Box>
      <Box mt={2}>
        <Formik
          enableReinitialize
          initialValues={{
            description: task.description || '',
            value: task.value || 0,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string().required('Description not informed!'),
            value: Yup.number().required('Value not informed!'),
          })}
          onSubmit={async (values, { resetForm }) => {
            const data: Partial<Task> = {
              description: values.description,
              value: values.value,
            }
            if (task._id) {
              resetForm()
              editTask({ _id: task._id, description: data.description, value: data.value })
            } else {
              resetForm()
              insertTask({ _id: uuiv4(), description: data.description, value: data.value })
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form className={classes.root} onSubmit={handleSubmit}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={6}>
                    <TextField
                      label='Description'
                      name='description'
                      required
                      fullWidth
                      variant='outlined'
                      value={values.description}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label='Value'
                      name='value'
                      variant='outlined'
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                        inputComponent: NumberFormatCustom as any,
                      }}
                      inputProps={{ maxLength: 9 }}
                      value={values.value}
                      error={Boolean(touched.value && errors.value)}
                      helperText={touched.value && errors.value}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Box p={2} display='flex' alignItems='center'>
                <Box flexGrow={1} />
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    onClose()
                  }}
                >
                  Cancel
                </Button>
                <Button variant='contained' type='submit' color='secondary' className={classes.confirmButton}>
                  {task._id ? 'Edit' : 'Insert'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

export default ModalTask
