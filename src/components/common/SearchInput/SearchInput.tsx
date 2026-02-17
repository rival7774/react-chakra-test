import React, { useEffect, useRef, useState } from 'react'
import { Box, Input, InputGroup } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { animationTokens } from '@/theme/animationTokens'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  debounceTime?: number
  inputStyles?: React.CSSProperties
  variant?: 'default' | 'mobile'
  onExpand?: () => void
  onCollapse?: () => void
}

export const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Поиск...',
  debounceTime = 200,
  inputStyles,
  variant = 'default',
  onExpand,
  onCollapse,
}) => {
  const isMobile = variant === 'mobile'

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [innerValue, setInnerValue] = useState(value)
  const hasText = innerValue.trim().length > 0

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(innerValue)
    }, debounceTime)

    return () => clearTimeout(handler)
  }, [innerValue, debounceTime, onChange])

  const handleClear = () => {
    setInnerValue('')
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <InputGroup
      startElement={
        <Box ml='1px'>
          <MyIcon
            name='search'
            size={isMobile ? 18 : 17}
            color={isMobile ? 'text.primary' : 'border.select'}
          />
        </Box>
      }
      endElement={
        innerValue ? (
          <Box
            cursor='pointer'
            onPointerDown={(e) => {
              e.preventDefault()
              handleClear()
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
            h='100%'
            _hover={{ opacity: 0.5 }}
            transition={`${animationTokens.seconds}`}
          >
            <MyIcon name='cross' size={4} color='text.primary' />
          </Box>
        ) : null
      }
    >
      <Input
        ref={inputRef}
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        onFocus={() => {
          if (variant === 'mobile') onExpand?.()
        }}
        onBlur={() => {
          if (variant === 'mobile') onCollapse?.()
        }}
        placeholder={placeholder}
        _placeholder={{
          color: isMobile ? 'text.primary' : 'text.placeholderSearch',
        }}
        px='8px'
        py='8px'
        ps={isMobile ? '40px' : '47px'}
        h={isMobile ? '40px' : undefined}
        fontSize='16px'
        border={isMobile ? '2px solid' : '1px solid'}
        borderRadius='4px'
        fontWeight={isMobile ? '600' : '400'}
        color={hasText ? 'text.primary' : 'text.placeholderSearch'}
        borderColor={isMobile ? 'text.primary' : 'border.default'}
        bg='surface.white'
        style={inputStyles}
      />
    </InputGroup>
  )
}
