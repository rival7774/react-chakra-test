import { Box, Flex } from '@chakra-ui/react'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { SearchInput } from '@/components/common/SearchInput/SearchInput'

type RequestsToolbarDesktopProps = {
  search: string
  onSearchChange: (value: string) => void
  onOpenModal: () => void
  onExport: () => void
}

export const RequestsToolbarDesktop = ({
  search,
  onSearchChange,
  onOpenModal,
  onExport,
}: RequestsToolbarDesktopProps) => {
  return (
    <Flex align='center' gap='13px' mb='21px'>
      <Box flex='1'>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder='Поиск по номеру или теме заявки'
        />
      </Box>

      <ButtonDefault
        iconSize={15}
        iconName='pdf'
        color='text.primary'
        colorIcon='text.primary'
        borderColor='border.default'
        wrapIcon={{
          mr: '12px',
        }}
        p='7px 9px'
        bg='text.btnLight'
        text='Экспорт'
        onClick={onExport}
        _hover={{ opacity: 0.9 }}
      />

      <ButtonDefault
        iconSize={14}
        iconName='plus'
        color='text.btnLight'
        colorIcon='text.btnLight'
        p='7px 14px'
        bg='text.primary'
        text='Создать новую заявку'
        onClick={onOpenModal}
      />
    </Flex>
  )
}
