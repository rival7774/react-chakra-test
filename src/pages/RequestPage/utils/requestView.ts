import { Request } from '../types/Request'

export type PriorityIconName = 'twoArrowsUp' | 'arrowUp' | 'square' | 'arrowPriorityDown'
export type PriorityColorToken = 'icon.up' | 'icon.square' | 'icon.down'
export type TimeIconName = 'error' | 'statusOk' | 'time'
export type TimeState = 'ok' | 'error' | 'none' | undefined

export const requestStatusLabel: Record<Request['status'], string> = {
  new: 'Новая',
  inProgress: 'В работе',
  done: 'Готово',
  closed: 'Закрыто',
  paused: 'На паузе',
  rejected: 'Отклонена',
  review: 'На рассмотрении',
  waitingParts: 'Ожидают запчасти',
}

type StatusBadgeVariant = 'desktop' | 'mobile'

export const getStatusBadgeProps = (
  status: Request['status'],
  variant: StatusBadgeVariant = 'desktop'
) => {
  const colorDefault = 'text.primary'

  switch (status) {
    case 'new':
      return { bg: 'status.newBg', color: colorDefault }
    case 'inProgress':
      return {
        bg: variant === 'mobile' ? 'status.inProgressBgMobile' : 'status.inProgressBg',
        color: colorDefault,
      }
    case 'done':
      return { bg: 'status.doneBg', color: colorDefault }
    case 'closed':
      return {
        bg: variant === 'mobile' ? 'status.closedBg' : 'text.btnLight',
        color: colorDefault,
      }
    case 'paused':
      return {
        bg: 'surface.white',
        color: colorDefault,
        border: '1px solid',
        borderColor: 'surface.black',
      }
    default:
      return { bg: 'surface.white', color: colorDefault }
  }
}

export const getPriorityView = (
  priority: Request['priority']
): { icon: PriorityIconName; colorToken: PriorityColorToken } => {
  switch (priority) {
    case 'Критич.':
      return { icon: 'twoArrowsUp', colorToken: 'icon.up' }
    case 'Высокий':
      return { icon: 'arrowUp', colorToken: 'icon.up' }
    case 'Средний':
      return { icon: 'square', colorToken: 'icon.square' }
    case 'Низкий':
      return { icon: 'arrowPriorityDown', colorToken: 'icon.down' }
    default:
      return { icon: 'square', colorToken: 'icon.square' }
  }
}

export const getTimeView = (state: TimeState): { icon: TimeIconName; color: string } => {
  if (state === 'error') {
    return { icon: 'error', color: 'icon.up' }
  }

  if (state === 'ok') {
    return { icon: 'statusOk', color: 'icon.ok' }
  }

  return { icon: 'time', color: 'text.primary' }
}
