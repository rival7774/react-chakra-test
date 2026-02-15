import { Flex, Menu } from '@chakra-ui/react'
import type { Page } from '../types.ts'
import { NavButton } from '@/components/common/NavButton/NavButton'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'

type DesktopNavProps = {
  pages: Page[]
  currentSelectNav: string
  selectNav: string[]
  setCurrentSelectNav: (val: string) => void
}

export const DesktopNav = ({
  pages,
  currentSelectNav,
  selectNav,
  setCurrentSelectNav,
}: DesktopNavProps) => {
  return (
    <Flex display={{ base: 'none', md: 'flex' }} gap='14px'>
      {pages.map((page) => (
        <NavButton key={page.path} to={page.path} text={page.label}></NavButton>
      ))}
      <Menu.Root>
        <Menu.Trigger
          as={ButtonDefault}
          display='flex'
          bg='transparent'
          p='0'
          opacity='0.7'
          cursor='pointer'
          outline='none'
          color='border.select'
        >
          <Flex gap='4px' align='center'>
            {currentSelectNav}
            <MyIcon name='smallTriangle' color='text.primary' size='7px' />
          </Flex>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            {selectNav.map((item) => (
              <Menu.Item
                value={item}
                fontWeight='400'
                key={item}
                onClick={() => setCurrentSelectNav(item)}
              >
                {item}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Flex>
  )
}
