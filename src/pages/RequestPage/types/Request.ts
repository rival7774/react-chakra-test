export type Request = {
  id: string
  pharmacyNo: string
  pharmacyTitle: string
  createdAt: string
  priority: 'Критич.' | 'Высокий' | 'Средний' | 'Низкий'
  theme: string
  category: string
  technician: string
  reaction: string
  resolution: string
  resolutionState: 'none' | 'ok' | 'error'
  reactionState: 'ok' | 'error' | 'none'
  status:
    | 'new'
    | 'inProgress'
    | 'done'
    | 'closed'
    | 'paused'
    | 'rejected'
    | 'review'
    | 'waitingParts'
  mine: boolean
}
