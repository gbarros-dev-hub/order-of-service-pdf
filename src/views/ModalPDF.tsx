import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Box, colors, Dialog, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment'

import { Theme } from '../theme'

import Logo from '../components/Logo'

import { Service } from '../types/service'

type ModalPDFProps = {
  open: boolean
  service: Service
  onClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  statusField: {
    flexBasis: 200,
  },
  bulkOperations: {
    position: 'relative',
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    backgroundColor: colors.red[500],
    color: colors.common.white,
  },
}))

const ModalPDF: FC<ModalPDFProps> = ({ open, service, onClose }) => {
  const classes = useStyles()

  const [subtotalValue, setSubtotalValue] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)

  useEffect(() => {
    let subtotal = 0

    service.tasks.forEach((item) => {
      subtotal += typeof item.value === 'string' ? parseInt(item.value, 10) : item.value
    })
    setSubtotalValue(subtotal)
    setTotalValue(subtotal + 50)
  }, [service.tasks])

  return (
    <Dialog maxWidth='xl' fullWidth open={open}>
      <Paper className={classes.root}>
        <PerfectScrollbar>
          <Box minWidth={800} p={6}>
            <Grid container justify='space-between'>
              <Grid item>
                <Logo />
                <Typography variant='h5' color='textPrimary'>
                  www.castro-e-melo.com.br
                </Typography>
              </Grid>
              <Grid item>
                <Typography align='right' variant='h1' color='textPrimary'>
                  {service.status === 'inspection' ? 'Vistoria' : service.status === 'budget' ? 'Orçamento' : service.status === 'accomplished' ? 'Realizado' : 'Cancelado'}
                </Typography>
                <Typography align='right' variant='h5' color='textPrimary'>
                  Invoice #1892
                </Typography>
              </Grid>
            </Grid>
            <Box my={4}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Typography variant='body1' color='textPrimary'>
                    Rua Sevilha, 105 <br />
                    Jd. Europa, 74.330-570 <br />
                    Goiânia, GO, BR
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' color='textPrimary'>
                    Castro & Melo Reformas Imóveis Ltda. <br />
                    CNPJ: 02.498.688/0001-07 <br />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='right' variant='body1' color='textPrimary'>
                    Email: castroemeloreformas@gmail.com <br />
                    Tel: (62) 98111-0998
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={4}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Typography gutterBottom variant='h5' color='textPrimary'>
                    Data
                  </Typography>
                  <Typography variant='body1' color='textPrimary'>
                    {moment(service.date).format('DD MMM YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={4}>
              <Typography gutterBottom variant='h5' color='textPrimary'>
                Cliente
              </Typography>
              <Typography>
                {service.clientName} <br />
                {service.clientPhone} <br />
                {service.clientCelphone} <br />
              </Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell />
                  <TableCell align='right'>Unit Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service.tasks.map((items) => (
                  <TableRow key={items._id}>
                    <TableCell>{items.description}</TableCell>
                    <TableCell />
                    <TableCell align='right'>R$ {items.value.toLocaleString('pt-BR', { currency: 'BRL' })}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell />
                  <TableCell>Subtotal</TableCell>
                  <TableCell align='right'>R$ {subtotalValue.toLocaleString('pt-BR', { currency: 'BRL' })}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>Taxas</TableCell>
                  <TableCell align='right'>R$ 50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>Total</TableCell>
                  <TableCell align='right'>R$ {totalValue.toLocaleString('pt-BR', { currency: 'BRL' })}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box mt={2}>
              <Typography gutterBottom variant='h5' color='textPrimary'>
                Notas
              </Typography>
              <Typography variant='body1' color='textSecondary'>
                Please make sure you have the right bank registration number as I had issues before and make sure you guys cover transfer expenses.
              </Typography>
            </Box>
          </Box>
        </PerfectScrollbar>
      </Paper>
    </Dialog>
  )
}

export default ModalPDF
