import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { SearchInput } from '@/components/common/SearchInput/SearchInput'
import { Box, Flex } from '@chakra-ui/react'

type RequestsMobileFooterProps = {
  search: string
  mobileSearchExpanded: boolean
  onSearchChange: (value: string) => void
  onExpandSearch: () => void
  onCollapseSearch: () => void
  onOpenModal: () => void
}

export const RequestsMobileFooter = ({
  search,
  mobileSearchExpanded,
  onSearchChange,
  onExpandSearch,
  onCollapseSearch,
  onOpenModal,
}: RequestsMobileFooterProps) => {
  return (
    <Box
      position='fixed'
      right='0'
      bottom='30px'
      bg='transparent'
      w='100%'
      p='0 16px'
      zIndex={20}
    >
      <Flex
        direction='column'
        gap='8px'
        w='100%'
        justify='end'
      >
        <Flex justify='flex-end'>
          <Box
            w={mobileSearchExpanded ? '100%' : '106px'}
            transition='width 180ms ease'
            onClick={onExpandSearch}
          >
            <SearchInput
              value={search}
              onChange={onSearchChange}
              placeholder='Поиск'
              debounceTime={200}
              variant='mobile'
              onExpand={onExpandSearch}
              onCollapse={onCollapseSearch}
            />
          </Box>
        </Flex>

        <ButtonDefault
          iconSize={14}
          iconName='plus'
          color='text.btnLight'
          colorIcon='text.btnLight'
          p='7px 14px'
          bg='text.primary'
          text='Создать новую заявку'
          w='max-content'
          ml='auto'
          onClick={onOpenModal}
        />
      </Flex>
    </Box>
  )
}
