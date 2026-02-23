export type RequestTabItem = { value: string; label: string }

export const requestTabsDesktop: RequestTabItem[] = [
  { value: 'new', label: 'Новые' },
  { value: 'rejected', label: 'Отклонены' },
  { value: 'review', label: 'На рассмотрении' },
  { value: 'inProgress', label: 'В работе' },
  { value: 'waitingParts', label: 'Ожидают запчасти' },
  { value: 'done', label: 'Готовы' },
  { value: 'closed', label: 'Закрыты' },
  { value: 'all', label: 'Все статусы' },
]

export const requestTabsMobile: RequestTabItem[] = [
  { value: 'all', label: 'Все статусы' },
  { value: 'new', label: 'Новые' },
  { value: 'review', label: 'На рассмотрении' },
  { value: 'inProgress', label: 'В работе' },
  { value: 'done', label: 'Готовы' },
  { value: 'closed', label: 'Закрыты' },
]
