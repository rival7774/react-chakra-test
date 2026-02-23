import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import {
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
import React, { useEffect, useRef } from 'react'

type RequestModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  isMobile: boolean
  children?: React.ReactNode
  footer?: React.ReactNode
  initialFocusRef?: React.RefObject<HTMLElement>
}

export const DefaultModal = ({
  isOpen,
  title = 'Создание заявки',
  onClose,
  isMobile,
  children,
  footer,
  initialFocusRef,
}: RequestModalProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      const firstFocusable = bodyRef.current.querySelector<HTMLElement>(
        'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }
  }, [isOpen])

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose()
      }}
      initialFocusEl={() => initialFocusRef?.current ?? null}
      // @ts-expect-error: Chakra UI официально не поддерживает 'end', но мы используем slide-in-right
      placement={isMobile ? 'end' : 'center'}
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
          overflow='hidden'
        >
          <DialogHeader p={isMobile ? '0' : 0}>
            <HStack
              justifyContent='space-between'
              minH='29px'
              w='100%'
            >
              {isMobile ? (
                <HStack
                  display='flex'
                  alignItems='center'
                  gap='14px'
                  p='24px 16px'
                  borderBottom='1px solid'
                  borderColor='border.headerPopup'
                  pb='24px'
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
                  <DialogTitle
                    fontSize='20px'
                    lineHeight='24px'
                    fontWeight='600'
                  >
                    {title}
                  </DialogTitle>
                </HStack>
              ) : (
                <>
                  <HStack
                    display='flex'
                    alignItems='start'
                    gap={2}
                    p={0}
                    fontSize='24px'
                    lineHeight='100%'
                    fontWeight='500'
                    flex={1}
                    justify='space-between'
                  >
                    <DialogTitle mb='32px'>{title}</DialogTitle>

                    <ButtonDefault
                      onClick={onClose}
                      iconSize={18}
                      iconName='cross'
                      opacity='0.5'
                      colorIcon='text.primary'
                      p='0'
                      bg='transparent'
                      _hover={{ opacity: '0.3' }}
                    />
                  </HStack>
                </>
              )}
            </HStack>
          </DialogHeader>

          <DialogBody
            ref={bodyRef}
            p={0}
            position='relative'
          >
            {children}
          </DialogBody>

          <DialogFooter
            justifyContent='start'
            alignItems={{ base: 'stretch', md: 'center' }}
            flexDir={{ base: 'column', md: 'row' }}
            p={{ base: '10px', md: '0' }}
            gap={{ base: '10px', md: '17px' }}
          >
            {footer}
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}
