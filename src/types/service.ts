export type ServiceGrid = {
  _id?: string
  title: string
  date?: Date
  dateF?: string
  status: 'inspection' | 'budget' | 'accomplished' | 'canceled'
}

export type Service = {
  title: string
  description: string
  date?: Date
  status: 'inspection' | 'budget' | 'accomplished' | 'canceled'
  tasks: Task[]
  worker: string
  email: string
  clientName: string
  clientCelphone: string
  clientPhone: string
  addressStreet: string
  addressStreet2?: string
  addressNeighborhood: string
  addressCity: string
  addressState: string
  addressPostalCode: string
  addressCountry: string
}

export type Task = {
  _id: string
  description: string
  value: number
}

export const _service: Service = {
  title: '',
  description: '',
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
  addressCountry: 'Br',
}

export const _task: Task = {
  _id: '',
  description: '',
  value: 0,
}

export const serviceTypeOption = [
  { value: 'inspection', text: 'Vistoria' },
  { value: 'budget', text: 'Orçamento' },
  { value: 'accomplished', text: 'Realizado' },
  { value: 'canceled', text: 'Cancelado' },
]
