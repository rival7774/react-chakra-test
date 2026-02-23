import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { RequestsMobileList } from '@/pages/RequestPage/components/RequestsMobileList/RequestsMobileList'
import { RequestsTable } from '@/pages/RequestPage/components/RequestsTable/RequestsTable'
import { Request } from '../../types/Request'

type RequestsContentProps = {
  loading: boolean
  isMobile: boolean
  data: Request[]
}

export const RequestsContent = ({ loading, isMobile, data }: RequestsContentProps) => {
  return (
    <Box mt='16px'>
      {loading ? (
        <Flex justify='center' align='center' h='300px'>
          <Spinner size='lg' />
        </Flex>
      ) : data.length === 0 ? (
        <Flex justify='center' align='center' h='220px'>
          <Text color='gray.500'>Ничего не найдено</Text>
        </Flex>
      ) : isMobile ? (
        <RequestsMobileList data={data} />
      ) : (
        <RequestsTable data={data} />
      )}
    </Box>
  )
}
