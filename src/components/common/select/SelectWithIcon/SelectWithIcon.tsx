import { SelectBase } from '@/components/common/select/SelectBase/SelectBase'
import { OptionWithIcon } from '@/components/common/select/SelectWithIcon/types'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  options: OptionWithIcon[]
  placeholder: string
  isMobile: boolean
}

export const SelectWithIcon = React.memo(
  ({ value, onChange, placeholder, options, isMobile }: Props) => {
    return (
      <SelectBase<OptionWithIcon>
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        renderTrigger={(option) => {
          return option?.value ? (
            <Box display='flex' p='13px 16px' alignItems='center' width='100%'>
              <Box display='inline-flex' justifyContent='center' alignItems='center' mr='8px'>
                {option?.icon}
              </Box>
              <Box
                display='flex'
                flexDirection={isMobile ? 'column' : 'row'}
                fontSize='12px'
                lineHeight='100%'
              >
                <Box fontWeight='500' color='text.primary'>
                  {option?.label}:{'\u00A0'}
                </Box>
                <Text lineClamp='1' textTransform='lowercase' color='border.select'>
                  {option?.description}
                </Text>
              </Box>
            </Box>
          ) : (
            <Text
              lineClamp='1'
              p='13px 16px'
              fontSize='12px'
              lineHeight='100%'
              color='border.select'
            >
              {option?.label}
            </Text>
          )
        }}
        renderItem={(option) => {
          return option.value ? (
            <Box display='flex' alignItems='center'>
              <Box display='inline-flex' justifyContent='center' alignItems='center' mr='8px'>
                {option?.icon}
              </Box>
              <Box display='flex' flexDirection={isMobile ? 'column' : 'row'} fontSize='12px'>
                <Box fontWeight='500'>
                  {option?.label}:{'\u00A0'}
                </Box>
                <Text lineClamp='1' textTransform='lowercase' color='border.select'>
                  {option?.description}
                </Text>
              </Box>
            </Box>
          ) : (
            <Box display='flex' alignItems='center'>
              <Text lineClamp='1' color='border.select'>
                {option?.label}
              </Text>
            </Box>
          )
        }}
      />
    )
  }
)
