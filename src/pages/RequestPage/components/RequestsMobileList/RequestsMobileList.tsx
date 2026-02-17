import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { Request } from '../../types/Request'

const statusLabel: Record<Request['status'], string> = {
  new: 'Новая',
  inProgress: 'В работе',
  done: 'Готово',
  closed: 'Закрыто',
  paused: 'На паузе',
  rejected: 'Отклонена',
  review: 'На рассмотрении',
  waitingParts: 'Ожидают запчасти',
}

const statusBadgeProps = (s: Request['status']) => {
  const colorDefault = 'text.primary'

  switch (s) {
    case 'new':
      return { bg: 'status.newBg', color: colorDefault }
    case 'inProgress':
      return { bg: 'status.inProgressBgMobile', color: colorDefault }
    case 'done':
      return { bg: 'status.doneBg', color: colorDefault }
    case 'closed':
      return { bg: 'status.closedBg', color: colorDefault }
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

// ровно как в RequestsTable
const priorityView = (
  p: Request['priority']
): {
  icon: 'twoArrowsUp' | 'arrowUp' | 'square' | 'arrowPriorityDown'
  colorToken: 'icon.up' | 'icon.square' | 'icon.down'
} => {
  switch (p) {
    case 'Критич.':
      return { icon: 'twoArrowsUp', colorToken: 'icon.up' }
    case 'Высокий':
      return { icon: 'arrowUp', colorToken: 'icon.up' }
    case 'Средний':
      return { icon: 'square', colorToken: 'icon.square' }
    case 'Низкий':
      return { icon: 'arrowPriorityDown', colorToken: 'icon.down' }
  }
}

const getGroupLabel = (dateStr: string) => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'СЕГОДНЯ'
  if (date.toDateString() === yesterday.toDateString()) return 'ВЧЕРА'

  return `В ${date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' }).toUpperCase()}`
}

const orderWeight = (label: string) => {
  if (label === 'СЕГОДНЯ') return 0
  if (label === 'ВЧЕРА') return 1
  return 2
}

export const RequestsMobileList = ({ data }: { data: Request[] }) => {
  const grouped = data.reduce(
    (acc, r) => {
      const label = getGroupLabel(r.createdAt)
      if (!acc[label]) acc[label] = []
      acc[label].push(r)
      return acc
    },
    {} as Record<string, Request[]>
  )

  const groupsSorted = Object.entries(grouped).sort(([a], [b]) => {
    const wa = orderWeight(a)
    const wb = orderWeight(b)
    if (wa !== wb) return wa - wb
    return a.localeCompare(b, 'ru')
  })

  return (
    <Box>
      {groupsSorted.map(([group, items]) => (
        <Box key={group} mb='18px'>
          <Text
            fontSize='14px'
            fontWeight='600'
            color='text.primary'
            mb='10px'
            textTransform='uppercase'
          >
            {group}
          </Text>

          <Flex direction='column' gap='12px'>
            {items.map((r) => {
              const pr = priorityView(r.priority)

              const resolutionIcon =
                r.resolutionState === 'ok'
                  ? 'statusOk'
                  : r.resolutionState === 'error'
                    ? 'error'
                    : 'time'
              const resolutionColor =
                r.resolutionState === 'ok'
                  ? 'icon.ok'
                  : r.resolutionState === 'error'
                    ? 'icon.up'
                    : 'text.primary'

              return (
                <Box
                  key={r.id}
                  bg='surface.white'
                  border='1px solid'
                  borderColor='border.default'
                  borderRadius='12px'
                  p='14px'
                  cursor='pointer'
                  _hover={{ bg: 'border.default' }}
                >
                  {/* 1 строка: тема + (приоритет + статус) */}
                  <Flex justify='space-between' align='center' gap='12px'>
                    <Text fontSize='14px' color='text.primary' lineClamp={2}>
                      {r.theme}
                    </Text>

                    <HStack gap='10px' flexShrink={0} align='center'>
                      <MyIcon
                        name={pr.icon}
                        size={pr.icon === 'arrowUp' ? '12px' : '14px'}
                        color={pr.colorToken}
                      />

                      <Badge
                        borderRadius='4px'
                        p='2px 6px'
                        fontSize='14px'
                        lineHeight='20px'
                        {...statusBadgeProps(r.status)}
                      >
                        {statusLabel[r.status]}
                      </Badge>
                    </HStack>
                  </Flex>

                  {/* 2 строка: ID-плашка + аптека + (иконка решения + время) */}
                  <Flex mt='16px' align='center' justify='space-between' gap='12px'>
                    <HStack gap='10px' minW={0}>
                      <Box bg='bg.number' borderRadius='4px' p='4px' flexShrink={0}>
                        <Text fontSize='14px' fontWeight='500' color='text.primary'>
                          {r.id}
                        </Text>
                      </Box>

                      <Text
                        fontSize='12px'
                        lineHeight='20px'
                        color='text.address'
                        lineClamp={1}
                        opacity={r.pharmacyTitle ? 1 : 0.3}
                      >
                        {r.pharmacyTitle || '—'}
                      </Text>
                    </HStack>

                    <HStack gap='4px' flexShrink={0}>
                      <MyIcon name={resolutionIcon} size='14px' color={resolutionColor} />
                      <Text
                        fontSize='14px'
                        color={r.resolution ? resolutionColor : 'text.primary'}
                        opacity={r.resolution ? 1 : 0.3}
                      >
                        {r.resolution || '—'}
                      </Text>
                    </HStack>
                  </Flex>
                </Box>
              )
            })}
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
