import {
  Button,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  HStack,
} from '@chakra-ui/react'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'

type RequestModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  isMobile: boolean
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const DefaultModal = ({
  isOpen,
  title = 'Создание заявки',
  onClose,
  isMobile,
  children,
  footer,
}: RequestModalProps) => {
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose()
      }}
      placement={'center'}
      motionPreset={isMobile ? 'slide-in-right' : undefined}
      size={isMobile ? 'full' : undefined}
      scrollBehavior='inside'
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent
          w='100%'
          maxW={isMobile ? '100%' : '1007px'}
          borderRadius={isMobile ? '0' : '15px'}
          p={isMobile ? '0' : '30px 36px 40px'}
          color='text.primary'
          gap='32px'
        >
          <HStack justifyContent='space-between' minH='29px'>
            {isMobile ? (
              <DialogHeader
                display='flex'
                alignItems='center'
                gap='14px'
                p='24px 16px'
                borderBottom='1px solid'
                borderColor='border.headerPopup'
                pb='24px'
                fontSize='20px'
                lineHeight='24px'
                fontWeight='600'
                flex={1}
              >
                <ButtonDefault
                  onClick={onClose}
                  iconSize={16}
                  iconName='backArrow'
                  colorIcon='text.primary'
                  p='0'
                  bg='transparent'
                />
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
            ) : (
              <>
                <DialogHeader
                  display='flex'
                  alignItems='center'
                  gap={2}
                  p={0}
                  fontSize='24px'
                  lineHeight='100%'
                  fontWeight='500'
                  flex={1}
                >
                  <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <Button
                  onClick={onClose}
                  w='18px'
                  h='18px'
                  minW='18px'
                  minH='18px'
                  p={0}
                  m={0}
                  variant='ghost'
                  border='none'
                  _hover={{ bg: 'transparent', border: 'none', opacity: '.5' }}
                  _focus={{ boxShadow: 'none', outline: 'none' }}
                ></Button>
                <ButtonDefault
                  onClick={onClose}
                  iconSize={18}
                  iconName='cross'
                  opacity='0.5'
                  colorIcon='text.primary'
                  p='0'
                  bg='transparent'
                  _hover={{ bg: 'transparent', border: 'none', opacity: '0.3' }}
                  _focus={{ boxShadow: 'none', outline: 'none' }}
                />
              </>
            )}
          </HStack>

          <DialogBody p={0}>{children}</DialogBody>

          <DialogFooter justifyContent='start' flexDir='row' alignItems='center' p={0} gap='17px'>
            {footer}
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}
