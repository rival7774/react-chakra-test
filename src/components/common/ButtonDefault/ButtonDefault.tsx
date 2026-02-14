import { Box, BoxProps, Button, ButtonProps, Flex } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { IconName } from '@/assets/icons/IconName'

type Props = {
  text?: string
  children?: React.ReactNode
  iconName?: IconName
  colorIcon?: string
  wrapIcon?: BoxProps
  iconSize?: number
  disabled?: boolean
} & ButtonProps

export const ButtonDefault = ({
  children,
  text,
  iconName,
  colorIcon,
  wrapIcon,
  iconSize,
  disabled,
  ...rest
}: Props) => {
  return (
    <Button
      minH='0'
      minW='0'
      h='auto'
      p='8px 17px'
      fontWeight='400'
      fontSize='16px'
      lineHeight='24px'
      bg='text.primary'
      disabled={disabled}
      _hover={{ opacity: 0.5 }}
      {...rest}
    >
      <Flex justify='center' align='center' gap='0'>
        {iconName && (
          <Box
            display='inline-flex'
            justifyContent='center'
            alignItems='center'
            {...wrapIcon}
            mr={!text && !children ? '0' : '10px'}
          >
            <MyIcon
              size={iconSize ? `${iconSize}px` : undefined}
              name={iconName}
              color={colorIcon}
            />
          </Box>
        )}
        {text}
        {children}
      </Flex>
    </Button>
  )
}
