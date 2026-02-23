import { Badge, Box, Flex, HStack, Table, Text } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { Request } from '../../types/Request'
import {
  getPriorityView,
  getStatusBadgeProps,
  getTimeView,
  requestStatusLabel,
} from '../../utils/requestView'

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
          {data.map((request) => {
            const createdAt = new Date(request.createdAt)
            const date = createdAt.toLocaleDateString('ru-RU')
            const time = createdAt.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })

            const priority = getPriorityView(request.priority)
            const reactionView = getTimeView(request.reactionState)
            const resolutionView = getTimeView(request.resolutionState)

            return (
              <Table.Row
                key={request.id}
                borderBottom='1px solid'
                borderColor='border.default'
                _hover={{ bg: 'border.default' }}
              >
                <Table.Cell
                  fontSize='14px'
                  lineHeight='24px'
                  color='text.primary'
                  whiteSpace='nowrap'
                  opacity={request.id ? 1 : 0.3}
                  p='8px 10px'
                >
                  {request.id || '—'}
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  {request.pharmacyNo && request.pharmacyTitle ? (
                    <HStack gap='10px'>
                      <Badge
                        bg='text.btnLight'
                        color='text.primary'
                        borderRadius='4px'
                        p='1px 3px'
                        fontSize='12px'
                        fontWeight='600'
                      >
                        {request.pharmacyNo}
                      </Badge>
                      <Text fontSize='14px' color='text.primary' lineClamp={1}>
                        {request.pharmacyTitle}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  {request.createdAt ? (
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

                <Table.Cell p='8px 10px'>
                  {request.priority ? (
                    <HStack gap='12px'>
                      <Box color={priority.colorToken}>
                        <MyIcon
                          name={priority.icon}
                          size={priority.icon === 'arrowUp' ? '12px' : '14px'}
                        />
                      </Box>
                      <Text fontSize='12px' color='text.primary' opacity={0.4} fontWeight='500'>
                        {request.priority}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    color='text.primary'
                    lineClamp={1}
                    opacity={request.theme ? 1 : 0.3}
                  >
                    {request.theme || '—'}
                  </Text>
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    color='text.primary'
                    lineClamp={1}
                    opacity={request.category ? 1 : 0.3}
                  >
                    {request.category || '—'}
                  </Text>
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  <Text
                    fontSize='14px'
                    opacity={request.technician ? 1 : 0.3}
                    color='text.primary'
                    lineClamp={1}
                  >
                    {request.technician || '—'}
                  </Text>
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  {request.reaction ? (
                    <HStack gap='4px'>
                      <Box color={reactionView.color}>
                        <MyIcon name={reactionView.icon} size='14px' />
                      </Box>
                      <Text fontSize='14px' color={reactionView.color}>
                        {request.reaction}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  {request.resolution ? (
                    <HStack gap='4px'>
                      <Box color={resolutionView.color}>
                        <MyIcon name={resolutionView.icon} size='14px' />
                      </Box>

                      <Text fontSize='14px' color={resolutionView.color}>
                        {request.resolution}
                      </Text>
                    </HStack>
                  ) : (
                    <Text fontSize='14px' color='text.primary' opacity={0.3}>
                      —
                    </Text>
                  )}
                </Table.Cell>

                <Table.Cell p='8px 10px'>
                  <Badge
                    borderRadius='4px'
                    p='2px 6px'
                    fontSize='14px'
                    lineHeight='20px'
                    {...getStatusBadgeProps(request.status)}
                  >
                    {requestStatusLabel[request.status]}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
