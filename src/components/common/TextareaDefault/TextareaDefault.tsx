import { Textarea, TextareaProps } from '@chakra-ui/react'

type Props = {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
} & Omit<TextareaProps, 'onChange'>

export const TextareaDefault = ({ value, onChange, placeholder, ...props }: Props) => {
  return (
    <Textarea
      borderColor='border.select'
      cursor='text'
      p='13px 16px'
      borderRadius='8px'
      fontSize={{ base: '12px', md: '14px' }}
      lineHeight='100%'
      color='text.primary'
      _hover={{ borderColor: 'text.primary' }}
      _placeholder={{ color: 'border.select' }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoresize
      {...props}
    />
  )
}
