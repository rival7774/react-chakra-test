import { Flex } from '@chakra-ui/react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { IconName } from '@/assets/icons/IconName'
import { animationTokens } from '@/theme/animationTokens'

type NavButtonProps = {
  to: string
  text: string
  iconName?: IconName
  colorIcon?: string
  iconSize?: number
} & Omit<NavLinkProps, 'children'>

export const NavButton = ({ to, text, ...rest }: NavButtonProps) => {
  return (
    <Flex justify='center' align='center'>
      <NavLink to={to} {...rest}>
        {({ isActive }) => (
          <Flex
            align='center'
            gap='8px'
            color={isActive ? 'text.primary' : 'border.select'}
            fontWeight='400'
            p='0'
            bg='transparent'
            transition={`${animationTokens.seconds}`}
            _hover={{ bg: 'transparent', color: 'text.primary' }}
          >
            {text}
          </Flex>
        )}
      </NavLink>
    </Flex>
  )
}
