import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { Request } from '../../types/Request'
import {
  getPriorityView,
  getStatusBadgeProps,
  getTimeView,
  requestStatusLabel,
} from '../../utils/requestView'

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
    (acc, request) => {
      const label = getGroupLabel(request.createdAt)
      if (!acc[label]) acc[label] = []
      acc[label].push(request)
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
            {items.map((request) => {
              const priority = getPriorityView(request.priority)
              const resolutionView = getTimeView(request.resolutionState)

              return (
                <Box
                  key={request.id}
                  bg='surface.white'
                  border='1px solid'
                  borderColor='border.default'
                  borderRadius='12px'
                  p='14px'
                  cursor='pointer'
                  _hover={{ bg: 'border.default' }}
                >
                  <Flex justify='space-between' align='center' gap='12px'>
                    <Text fontSize='14px' color='text.primary' lineClamp={2}>
                      {request.theme}
                    </Text>

                    <HStack gap='10px' flexShrink={0} align='center'>
                      <MyIcon
                        name={priority.icon}
                        size={priority.icon === 'arrowUp' ? '12px' : '14px'}
                        color={priority.colorToken}
                      />

                      <Badge
                        borderRadius='4px'
                        p='2px 6px'
                        fontSize='14px'
                        lineHeight='20px'
                        {...getStatusBadgeProps(request.status, 'mobile')}
                      >
                        {requestStatusLabel[request.status]}
                      </Badge>
                    </HStack>
                  </Flex>

                  <Flex mt='16px' align='center' justify='space-between' gap='12px'>
                    <HStack gap='10px' minW={0}>
                      <Box bg='bg.number' borderRadius='4px' p='4px' flexShrink={0}>
                        <Text fontSize='14px' fontWeight='500' color='text.primary'>
                          {request.id}
                        </Text>
                      </Box>

                      <Text
                        fontSize='12px'
                        lineHeight='20px'
                        color='text.address'
                        lineClamp={1}
                        opacity={request.pharmacyTitle ? 1 : 0.3}
                      >
                        {request.pharmacyTitle || '—'}
                      </Text>
                    </HStack>

                    <HStack gap='4px' flexShrink={0}>
                      <MyIcon
                        name={resolutionView.icon}
                        size='14px'
                        color={resolutionView.color}
                      />
                      <Text
                        fontSize='14px'
                        color={request.resolution ? resolutionView.color : 'text.primary'}
                        opacity={request.resolution ? 1 : 0.3}
                      >
                        {request.resolution || '—'}
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
