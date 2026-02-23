import { Box, Tabs } from '@chakra-ui/react'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { RequestTabItem } from '@/pages/RequestPage/constants/requestTabs'

type RequestsStatusTabsProps = {
  isMobile: boolean
  status: string
  tabs: RequestTabItem[]
  onlyMine: boolean
  onStatusChange: (value: string) => void
  onToggleOnlyMine: () => void
}

export const RequestsStatusTabs = ({
  isMobile,
  status,
  tabs,
  onlyMine,
  onStatusChange,
  onToggleOnlyMine,
}: RequestsStatusTabsProps) => {
  return (
    <Tabs.Root value={status} onValueChange={(event) => onStatusChange(event.value)}>
      <Tabs.List
        gap={isMobile ? '10px' : '8px'}
        whiteSpace='nowrap'
        overflowX='auto'
        overflowY='hidden'
        pb='21px'
      >
        {isMobile && (
          <Box flexShrink={0}>
            <ButtonDefault
              iconName='filter'
              iconSize={12}
              p='8px 18px'
              h='100%'
              bg={onlyMine ? 'text.primary' : 'text.btnLight'}
              color={onlyMine ? 'text.btnLight' : 'text.primary'}
              colorIcon={onlyMine ? 'text.btnLight' : 'text.primary'}
              onClick={onToggleOnlyMine}
            />
          </Box>
        )}

        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            borderRadius='4px'
            p='8px 17px'
            bg='text.btnLight'
            fontSize='16px'
            color='text.primary'
            _hover={{ opacity: 0.5 }}
            _selected={{
              bg: 'text.primary',
              color: 'surface.white',
              borderBottom: '0',
              boxShadow: 'none',
            }}
            _before={{ display: 'none' }}
            flexShrink={0}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}

        {!isMobile && (
          <>
            <Box
              w='3px'
              h='40px'
              bg='border.default'
              alignSelf='center'
              flexShrink={0}
              m='0 16px 0 19px'
            />

            <Box flexShrink={0}>
              <ButtonDefault
                text='Показать только мои'
                iconName='filter'
                iconSize={12}
                p='8px 17px'
                lineHeight='22px'
                bg={onlyMine ? 'text.primary' : 'text.btnLight'}
                color={onlyMine ? 'text.btnLight' : 'text.primary'}
                colorIcon={onlyMine ? 'text.btnLight' : 'text.primary'}
                onClick={onToggleOnlyMine}
              />
            </Box>
          </>
        )}
      </Tabs.List>
    </Tabs.Root>
  )
}
