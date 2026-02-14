import { Box, BoxProps, Button, ButtonProps, HStack } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { IconName } from '@/assets/icons/IconName'

type Props = {
  text?: string
  children?: React.ReactNode
  iconName?: IconName
  colorIcon?: string
  wrapIcon?: BoxProps
  iconSize?: number
} & ButtonProps

export const ButtonDefault = ({
  children,
  text,
  iconName,
  colorIcon,
  wrapIcon,
  iconSize,
  ...rest
}: Props) => {
  return (
    <Button
      minH='0'
      minW='0'
      h='auto'
      p='8px 17px'
      bg='text.primary'
      _hover={{ opacity: 0.5 }}
      {...rest}
    >
      <HStack justify='center' align='center' gap='0'>
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
      </HStack>
    </Button>
  )
}
