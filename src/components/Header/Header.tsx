import { HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { DesktopNav } from '@/components/Header/components/DesktopNav'
import { MobileNav } from '@/components/Header/components/MobileNav'
import { UserMenu } from '@/components/Header/components/UserMenu'

export const Header = () => {
  const pages = [
    { path: '/requests', label: 'Заявки' },
    { path: '/reports', label: 'Отчеты' },
  ]

  const selectNav = ['Справочники', 'Аптеки', 'Пользователи']

  const [currentPage, setCurrentPage] = useState(pages[0])
  const [currentSelectNav, setCurrentSelectNav] = useState(selectNav[0])

  return (
    <HStack
      justifyContent='space-between'
      p={['16px 26px 19px 16px', null, '20px 34px 20px 130px']}
      alignItems={['start', null, 'center']}
      minHeight={['auto', null, '86px']}
      borderBottom='1px solid'
      borderColor='border.default'
      position='sticky'
      top='0'
      zIndex={100}
      bg='surface.white'
    >
      <DesktopNav
        currentSelectNav={currentSelectNav}
        setCurrentSelectNav={setCurrentSelectNav}
        pages={pages}
        selectNav={selectNav}
      />

      <MobileNav pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <UserMenu />
    </HStack>
  )
}
