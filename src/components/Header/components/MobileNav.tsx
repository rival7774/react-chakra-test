import { Box, Flex, Menu } from '@chakra-ui/react'
import type { Page } from '../types.ts'
import { useNavigate } from 'react-router-dom'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'

type MobileNavProps = {
  pages: Page[]
  currentPage: Page
  setCurrentPage: (page: Page) => void
}

export const MobileNav = ({ pages, currentPage, setCurrentPage }: MobileNavProps) => {
  const navigate = useNavigate()

  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <Menu.Root>
        <Menu.Trigger
          as='div'
          color='text.primary'
          p='0'
          bg='transparent'
          fontSize='20px'
          lineHeight='24px'
          fontWeight='600'
          _focus={{ outline: 'none', background: 'transparent' }}
          _hover={{ background: 'transparent', border: 'none' }}
          _active={{ background: 'transparent' }}
        >
          <Flex align='center' gap='8px'>
            {currentPage.label}
            <MyIcon name='bigTriangle' color='text.primary' size='10px' />
          </Flex>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content mt={0}>
            {pages.map((page) => {
              const isSelected = currentPage.path === page.path
              return (
                <Menu.Item
                  key={page.path}
                  value={page.path}
                  fontWeight='400'
                  bg='transparent'
                  _hover={{ bg: 'gray.50', color: 'text.primary' }}
                  onClick={() => {
                    setCurrentPage(page)
                    navigate(page.path)
                  }}
                >
                  <Box color={isSelected ? 'text.primary' : 'border.select'}>{page.label}</Box>
                </Menu.Item>
              )
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Box>
  )
}
