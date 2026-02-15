import { useState } from 'react'
import { NotificationBadge } from '@/components/common/NotificationBadge/NotificationBadge'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { Avatar, Box, HStack } from '@chakra-ui/react'

export const UserMenu = () => {
  const [showLogout, setShowLogout] = useState(false)

  return (
    <HStack gap='27px' position='relative'>
      <Box position='relative' onClick={() => setShowLogout(!showLogout)}>
        <Avatar.Root width='36px' height='36px'>
          <Avatar.Fallback name='User' />
          <Avatar.Image src='/images/avatar.png' />
        </Avatar.Root>
        <NotificationBadge count={2} />
      </Box>
      <Box
        display={{ base: showLogout ? 'flex' : 'none', md: 'flex' }}
        position={{ base: 'absolute', md: 'static' }}
        border={{ base: '1px solid', md: 'none' }}
        borderColor={{ base: 'border.default', md: 'transparent' }}
        padding={{ base: '10px', md: '0' }}
        borderRadius={{ base: '10px', md: '0' }}
        bg={{ base: 'white', md: 'transparent' }}
        top='110%'
        right='0'
      >
        <ButtonDefault
          iconName='exit'
          colorIcon='text.primary'
          color='text.primary'
          p='8px 20px'
          iconSize={18}
          bg='text.btnLight'
          border='solid 1px'
          borderColor='border.default'
          text='Выйти'
        />
      </Box>
    </HStack>
  )
}
