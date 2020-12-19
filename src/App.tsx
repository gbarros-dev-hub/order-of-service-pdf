import { FC, useCallback, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  jssPreset,
  makeStyles,
  StylesProvider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Edit as EditIcon, PlusCircle as PlusCircleIcon, Trash as TrashIcon } from 'react-feather'
import MomentUtils from '@date-io/moment'
import InputMask from 'react-input-mask'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { create } from 'jss'
import rtl from 'jss-rtl'

import 'moment/locale/pt-br'

import { createTheme, Theme } from './theme'

import useSettings from './hooks/useSettings'

import Page from './components/Page'

import brazilianStates from './utils/brazilianStates'

import { Task, serviceTypeOption, _task, Service, _service } from './types/service'

import ModalTask from './views/ModalTask'
import ModalDeleteTask from './views/ModalDeleteTask'
import ModalPDF from './views/ModalPDF'

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

  const [modalTask, setModalTask] = useState<boolean>(false)
  const [modalDeleteTask, setModalDeleteTask] = useState<boolean>(false)
  const [modalServicePDF, setModalServicePDF] = useState<boolean>(false)

  const [servicePDF, setServicePDF] = useState<Service>(_service)

  const [task, setTask] = useState<Task>(_task)

  const onOpenModalTask = useCallback((dados?: Task) => {
    setTask(dados)
    setModalTask(true)
  }, [])

  const onCloseModalTask = useCallback(() => {
    setTask(_task)
    setModalTask(false)
  }, [])

  const onOpenModalDeleteTask = useCallback((dados?: Task) => {
    setTask(dados)
    setModalDeleteTask(true)
  }, [])

  const onCloseModalDeleteTask = useCallback(() => {
    setTask(_task)
    setModalDeleteTask(false)
  }, [])

  const onOpenModalServicePDF = useCallback((data: Service) => {
    setServicePDF(data)
    setModalServicePDF(true)
  }, [])

  const onCloseModalServicePDF = useCallback(() => {
    setModalServicePDF(false)
  }, [])

  const CustomInput = (props: any) => <InputMask {...props}>{(inputProps: any) => <TextField {...inputProps} />}</InputMask>

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'pt-br'}>
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
                    <Box mt={3}>
                      <Formik
                        initialValues={{
                          title: '',
                          description: '',
                          date: new Date(),
                          status: 'inspection',
                          tasks: [],
                          worker: '',
                          email: '',
                          clientName: '',
                          clientCelphone: '',
                          clientPhone: '',
                          addressStreet: '',
                          addressStreet2: '',
                          addressNeighborhood: '',
                          addressCity: '',
                          addressState: '',
                          addressPostalCode: '',
                          submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                          title: Yup.string().required(),
                          description: Yup.string(),
                          date: Yup.date(),
                          status: Yup.string(),
                          tasks: Yup.array(),
                          worker: Yup.string(),
                          email: Yup.string(),
                          clientName: Yup.string(),
                          clientCelphone: Yup.string(),
                          clientPhone: Yup.string(),
                          addressStreet: Yup.string(),
                          addressStreet2: Yup.string(),
                          addressNeighborhood: Yup.string(),
                          addressCity: Yup.string(),
                          addressState: Yup.string(),
                          addressPostalCode: Yup.string(),
                        })}
                        onSubmit={(values) => {
                          onOpenModalServicePDF({
                            title: values.title,
                            description: values.description,
                            date: values.date,
                            status: values.status as 'inspection' | 'budget' | 'accomplished' | 'canceled',
                            tasks: values.tasks,
                            worker: values.worker,
                            email: values.email,
                            clientName: values.clientName,
                            clientCelphone: values.clientCelphone,
                            clientPhone: values.clientPhone,
                            addressStreet: values.addressStreet,
                            addressStreet2: values.addressStreet2,
                            addressNeighborhood: values.addressNeighborhood,
                            addressCity: values.addressCity,
                            addressState: values.addressState,
                            addressPostalCode: values.addressPostalCode,
                            addressCountry: 'BR',
                          })
                        }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, touched, values }) => (
                          <form onSubmit={handleSubmit}>
                            <Card>
                              <CardHeader title='General Information' />
                              <Divider />
                              <CardContent>
                                <Grid container spacing={3}>
                                  <Grid item md={6} xs={12}>
                                    <TextField
                                      label='Title'
                                      name='title'
                                      required
                                      fullWidth
                                      variant='outlined'
                                      value={values.title}
                                      error={Boolean(touched.title && errors.title)}
                                      helperText={touched.title && errors.title}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid item md={6} xs={12}>
                                    <TextField
                                      label='Description'
                                      name='description'
                                      fullWidth
                                      variant='outlined'
                                      value={values.description}
                                      error={Boolean(touched.description && errors.description)}
                                      helperText={touched.description && errors.description}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid item md={2} xs={6}>
                                    <KeyboardDatePicker
                                      label='Date'
                                      format='MM/DD/YYYY'
                                      name='date'
                                      inputVariant='outlined'
                                      fullWidth
                                      value={values.date}
                                      onBlur={() => setFieldTouched('date')}
                                      onClose={() => setFieldTouched('date')}
                                      onAccept={() => setFieldTouched('date')}
                                      onChange={(date) => setFieldValue('date', date)}
                                    />
                                  </Grid>
                                  <Grid item md={2} xs={6}>
                                    <TextField
                                      label='Status'
                                      name='status'
                                      select
                                      fullWidth
                                      variant='outlined'
                                      value={values.status}
                                      SelectProps={{ native: true }}
                                      onChange={handleChange}
                                    >
                                      {serviceTypeOption.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.text}
                                        </option>
                                      ))}
                                    </TextField>
                                  </Grid>
                                  <Grid item md={8} xs={12}>
                                    <TextField
                                      label='Worker'
                                      name='worker'
                                      fullWidth
                                      required
                                      variant='outlined'
                                      value={values.worker}
                                      error={Boolean(touched.worker && errors.worker)}
                                      helperText={touched.worker && errors.worker}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                            <Box mt={3}>
                              <Card>
                                <CardHeader title='Client' />
                                <Divider />
                                <CardContent>
                                  <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        label='Name'
                                        name='clientName'
                                        required
                                        fullWidth
                                        variant='outlined'
                                        value={values.clientName}
                                        error={Boolean(touched.clientName && errors.clientName)}
                                        helperText={touched.clientName && errors.clientName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <CustomInput
                                        label='Celphone'
                                        name='clientCelphone'
                                        fullWidth
                                        variant='outlined'
                                        mask='(99) 99999-9999'
                                        value={values.clientCelphone}
                                        error={Boolean(touched.clientCelphone && errors.clientCelphone)}
                                        helperText={touched.clientCelphone && errors.clientCelphone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <CustomInput
                                        label='Phone'
                                        name='clientPhone'
                                        fullWidth
                                        variant='outlined'
                                        mask='(99) 9999-9999'
                                        value={values.clientPhone}
                                        error={Boolean(touched.clientPhone && errors.clientPhone)}
                                        helperText={touched.clientPhone && errors.clientPhone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </Card>
                            </Box>
                            <Box mt={3}>
                              <Card>
                                <CardHeader title='Endereço' />
                                <Divider />
                                <CardContent>
                                  <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        label='Street'
                                        name='addressStreet'
                                        required
                                        fullWidth
                                        variant='outlined'
                                        value={values.addressStreet}
                                        error={Boolean(touched.addressStreet && errors.addressStreet)}
                                        helperText={touched.addressStreet && errors.addressStreet}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        label='Street2'
                                        name='addressStreet2'
                                        required
                                        fullWidth
                                        variant='outlined'
                                        value={values.addressStreet2}
                                        error={Boolean(touched.addressStreet2 && errors.addressStreet2)}
                                        helperText={touched.addressStreet2 && errors.addressStreet2}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <TextField
                                        label='Neighborhood'
                                        name='addressNeighborhood'
                                        required
                                        fullWidth
                                        variant='outlined'
                                        value={values.addressNeighborhood}
                                        error={Boolean(touched.addressNeighborhood && errors.addressNeighborhood)}
                                        helperText={touched.addressNeighborhood && errors.addressNeighborhood}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <TextField
                                        label='City'
                                        name='addressCity'
                                        required
                                        fullWidth
                                        variant='outlined'
                                        value={values.addressCity}
                                        error={Boolean(touched.addressCity && errors.addressCity)}
                                        helperText={touched.addressCity && errors.addressCity}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <TextField
                                        label='State'
                                        name='addressState'
                                        select
                                        fullWidth
                                        variant='outlined'
                                        value={values.addressState}
                                        SelectProps={{ native: true }}
                                        onChange={handleChange}
                                      >
                                        {brazilianStates.map((state) => (
                                          <option key={state.value} value={state.value}>
                                            {state.label}
                                          </option>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid item md={3} xs={6}>
                                      <CustomInput
                                        label='Postal Code'
                                        name='addressPostalCode'
                                        fullWidth
                                        variant='outlined'
                                        mask='99999-999'
                                        value={values.addressPostalCode}
                                        error={Boolean(touched.addressPostalCode && errors.addressPostalCode)}
                                        helperText={touched.addressPostalCode && errors.addressPostalCode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </Card>
                            </Box>
                            <Box mt={3}>
                              <Card>
                                <CardHeader
                                  title='Payment'
                                  action={
                                    <Button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        onOpenModalTask(_task)
                                      }}
                                      startIcon={
                                        <SvgIcon fontSize='small'>
                                          <PlusCircleIcon />
                                        </SvgIcon>
                                      }
                                    >
                                      Add Task
                                    </Button>
                                  }
                                />
                                <Divider />
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>DESCRIPTION</TableCell>
                                      <TableCell>VALUE</TableCell>
                                      <TableCell align='right'>Ações</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {values.tasks.length > 0 &&
                                      values.tasks.map((item, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{item.description}</TableCell>
                                          <TableCell>R$ {item.value.toLocaleString('pt-BR', { currency: 'BRL' })}</TableCell>
                                          <TableCell align='right'>
                                            <IconButton
                                              onClick={(e) => {
                                                e.preventDefault()
                                                onOpenModalTask(item)
                                              }}
                                            >
                                              <SvgIcon fontSize='small'>
                                                <EditIcon />
                                              </SvgIcon>
                                            </IconButton>
                                            <IconButton
                                              onClick={(e) => {
                                                e.preventDefault()
                                                onOpenModalDeleteTask(item)
                                              }}
                                            >
                                              <SvgIcon fontSize='small'>
                                                <TrashIcon />
                                              </SvgIcon>
                                            </IconButton>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </Card>
                            </Box>
                            <Box mt={2}>
                              <Button variant='contained' color='secondary' type='submit'>
                                Generate PDF
                              </Button>
                            </Box>
                            {modalTask && (
                              <ModalTask
                                open={modalTask}
                                task={task}
                                insertTask={(data: Task) => {
                                  setFieldValue('tasks', values.tasks.concat(data))
                                  setModalTask(false)
                                }}
                                editTask={(data: Task) => {
                                  const tasksEditted = values.tasks.map((item) => {
                                    if (item._id === data._id) {
                                      return data
                                    }
                                    return item
                                  })
                                  setFieldValue('tasks', tasksEditted)
                                  setModalTask(false)
                                }}
                                onClose={onCloseModalTask}
                              />
                            )}
                            {modalDeleteTask && (
                              <ModalDeleteTask
                                open={modalDeleteTask}
                                task={task}
                                onClose={onCloseModalDeleteTask}
                                onConfirm={(taskId: string) => {
                                  setFieldValue(
                                    'tasks',
                                    values.tasks.filter((task) => task._id !== taskId)
                                  )
                                  setModalDeleteTask(false)
                                }}
                              />
                            )}
                          </form>
                        )}
                      </Formik>
                      {modalServicePDF && <ModalPDF open={modalServicePDF} service={servicePDF} onClose={onCloseModalServicePDF} />}
                    </Box>
                  </Container>
                </Page>
              </div>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
