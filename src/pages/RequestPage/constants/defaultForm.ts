import { Form } from '@/types/Form'

export const createDefaultRequestForm = (): Form => ({
  pharmacy: '',
  category: '',
  theme: '',
  priority: 'Средний',
  warranty: false,
  description: '',
  files: [],
})
