import { Badge, Box, Flex, HStack, Table, Text } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { Request } from '../../types/Request'
import { ComponentProps } from 'react'

type TimeIcon = ComponentProps<typeof MyIcon>['name']
type TimeState = 'ok' | 'error' | 'none' | undefined

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
      return { bg: 'status.inProgressBg', color: colorDefault }
    case 'done':
      return { bg: 'status.doneBg', color: colorDefault }
    case 'closed':
      return { bg: 'text.btnLight', color: colorDefault }
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

const HeaderCell = ({ title }: { title: string }) => (
  <Flex align='center' gap='8px'>
    <Text fontSize='14px' fontWeight='400' lineHeight='24px' color='text.primary'>
      {title}
    </Text>
    <Box ms='auto' opacity={0.3}>
      <MyIcon name='filter' size='12px' color='text.primary' />
    </Box>
  </Flex>
)

export const RequestsTable = ({ data }: { data: Request[] }) => {
  return (
    <Box overflowX='auto' overflowY='hidden'>
      <Table.Root size='sm' minW='1200px'>
        <Table.Header>
          <Table.Row bg='text.btnLight' borderBottom='1px solid' borderColor='border.default'>
            <Table.ColumnHeader w='90px' p='8px 10px'>
              <HeaderCell title='№' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='260px' p='8px 10px'>
              <HeaderCell title='Аптека' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='160px' p='8px 10px'>
              <HeaderCell title='Создана' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='120px' p='8px 10px'>
              <HeaderCell title='Приоритет' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='300px' p='8px 10px'>
              <HeaderCell title='Тема' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='200px' p='8px 10px'>
              <HeaderCell title='Категория' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='180px' p='8px 10px'>
              <HeaderCell title='Техник' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='120px' p='8px 10px'>
              <HeaderCell title='Реакция' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='120px' p='8px 10px'>
              <HeaderCell title='Решение' />
            </Table.ColumnHeader>
            <Table.ColumnHeader w='290px' p='8px 10px'>
              <HeaderCell title='Статус' />
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((r) => {
            const d = new Date(r.createdAt)
            const date = d.toLocaleDateString('ru-RU')
            const time = d.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })

            const pr = priorityView(r.priority)

            const showReactionIcon = Boolean(r.reaction)
            const showResolutionIcon = Boolean(r.resolution)

            const getTimeView = (state: TimeState): { icon: TimeIcon; color: string } => {
              if (state === 'error') {
                return { icon: 'error', color: 'icon.up' }
              }

              if (state === 'ok') {
                return { icon: 'statusOk', color: 'icon.ok' }
              }

              return { icon: 'time', color: 'text.primary' }
            }

            const reactionView = getTimeView(r.reactionState)
            const resolutionView = getTimeView(r.resolutionState)

            return (
              <Table.Row
                key={r.id}
                borderBottom='1px solid'
                borderColor='border.default'
                _hover={{ bg: 'border.default' }}
              >
                {/* № */}
                <Table.Cell
                  fontSize='14px'
                  lineHeight='24px'
                  color='text.primary'
                  whiteSpace='nowrap'
                  opacity={r.id ? 1 : 0.3}
                  p='8px 10px'
                >
                  {r.id || '—'}
                </Table.Cell>
                {/* Аптека */}
                <Table.Cell p='8px 10px'>
                  {r.pharmacyNo && r.pharmacyTitle ? (
                    <HStack gap='10px'>
                      <Badge
                        bg='text.btnLight'
                        color='text.primary'
                        borderRadius='4px'
                        p='1px 3px'
                        fontSize='12px'
                        fontWeight='600'
                      >
                        {r.pharmacyNo}
                      </Badge>
                      <Text fontSize='14px' color='text.primary' lineClamp={1}>
                        {r.pharmacyTitle}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
                {/* Создана */}
                <Table.Cell p='8px 10px'>
                  {r.createdAt ? (
                    <Flex gap='6px'>
                      <Text fontSize='14px' color='text.primary'>
                        {date}
                      </Text>

                      <Text fontSize='14px' color='text.primary' opacity={0.3}>
                        {time}
                      </Text>
                    </Flex>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
                {/* Приоритет */}
                <Table.Cell p='8px 10px'>
                  {r.priority ? (
                    <HStack gap='12px'>
                      <Box color={pr.colorToken}>
                        <MyIcon name={pr.icon} size={pr.icon === 'arrowUp' ? '12px' : '14px'} />
                      </Box>
                      <Text fontSize='12px' color='text.primary' opacity={0.4} fontWeight='500'>
                        {r.priority}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
                {/* Тема */}
                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    color='text.primary'
                    lineClamp={1}
                    opacity={r.theme ? 1 : 0.3}
                  >
                    {r.theme || '—'}
                  </Text>
                </Table.Cell>
                {/* Категория */}
                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    color='text.primary'
                    lineClamp={1}
                    opacity={r.category ? 1 : 0.3}
                  >
                    {r.category || '—'}
                  </Text>
                </Table.Cell>
                {/* Техник */}
                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    opacity={r.technician ? 1 : 0.3}
                    color='text.primary'
                    lineClamp={1}
                  >
                    {r.technician || '—'}
                  </Text>
                </Table.Cell>
                {/* Реакция */}
                <Table.Cell p='8px 10px'>
                  {r.reaction ? (
                    <HStack gap='4px'>
                      {showReactionIcon ? (
                        <Box color={reactionView.color}>
                          <MyIcon name={reactionView.icon} size='14px' />
                        </Box>
                      ) : null}

                      <Text fontSize='14px' color={reactionView.color}>
                        {r.reaction}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
                {/* Решение */}
                <Table.Cell p='8px 10px'>
                  {r.resolution ? (
                    <HStack gap='4px'>
                      {showResolutionIcon ? (
                        <Box color={resolutionView.color}>
                          <MyIcon name={resolutionView.icon} size='14px' />
                        </Box>
                      ) : null}

                      <Text
                        fontSize='14px'
                        color={r.resolution ? resolutionView.color : 'text.placeholderSearch'}
                      >
                        {r.resolution}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
                {/* Статус */}
                <Table.Cell p='8px 10px'>
                  {r.status ? (
                    <Badge
                      borderRadius='4px'
                      p='2px 6px'
                      fontSize='14px'
                      lineHeight='20px'
                      {...statusBadgeProps(r.status)}
                    >
                      {statusLabel[r.status]}
                    </Badge>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
