import { chakra, Flex, FlexProps } from '@chakra-ui/react'
import React, { type ReactNode } from 'react'

type FormFieldProps = {
  label: string
  children: ReactNode
  id: string
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
} & FlexProps

export const FileUploadForm = ({ label, children, id, labelProps, ...props }: FormFieldProps) => {
  return (
    <Flex direction='column' {...props}>
      <chakra.label
        htmlFor={id}
        fontSize='12px'
        lineHeight='100%'
        minH='15px'
        color='text.primary'
        display='block'
        mb='8px'
        {...labelProps}
      >
        {label}
      </chakra.label>
      {children}
    </Flex>
  )
}
