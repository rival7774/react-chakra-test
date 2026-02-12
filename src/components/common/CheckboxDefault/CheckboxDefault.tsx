import React from 'react'
import { Checkbox } from '@chakra-ui/react'
import { animationTokens } from '@/theme/animationTokens'

type CheckboxDefaultProps = {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
  colorPalette?: string
  size?: number
}

export const CheckboxDefault: React.FC<CheckboxDefaultProps> = ({
  checked,
  defaultChecked,
  onChange,
  children,
  colorPalette = 'white',
  size = '20px',
}) => {
  return (
    <Checkbox.Root
      colorPalette={colorPalette}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(details) => onChange?.(details.checked === true)}
      cursor='pointer'
      gap='8px'
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control
        width={size}
        height={size}
        borderRadius='5px'
        border='1px solid'
        borderColor={checked ? 'text.primary' : 'border.select'}
        backgroundColor='surface.white'
        color={checked ? 'text.primary' : 'transparent'}
        cursor='pointer'
        transition={`all ${animationTokens.seconds}`}
        _hover={{ borderColor: 'text.primary' }}
      />
      <Checkbox.Label
        fontSize='14'
        lineHeight='100%'
        color='text.primary'
        _hover={{ color: 'border.select' }}
        transition={`color ${animationTokens.seconds}`}
      >
        {children}
      </Checkbox.Label>
    </Checkbox.Root>
  )
}
