import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { DefaultModal } from '@/components/common/ModalDefault/ModalDefault'
import { RequestForm } from '@/pages/RequestPage/components/RequestPageForm/RequestPageForm'
import { Form } from '@/types/Form'
import { ActionsFormDes } from '@/pages/RequestPage/components/ActionsFormDes/ActionsFormDes'

export const RequestsPage = () => {
  const isMobile = Boolean(useBreakpointValue({ base: true, md: false }))
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})

  const [form, setForm] = useState<Form>({
    pharmacy: '',
    category: '',
    theme: '',
    priority: 'Средний',
    warranty: false,
    description: '',
    files: [],
  })

  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const clearForm = () => {
    setForm({
      pharmacy: '',
      category: '',
      theme: '',
      priority: 'Средний',
      warranty: false,
      description: '',
      files: [],
    })
  }

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))

    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const closeModal = () => {
    setIsOpenPopup(false)
  }

  const openModal = () => {
    setIsOpenPopup(true)
  }

  const submit = () => {
    if (isMobile && !validateForm()) return

    console.log(form)
    closeModal()
    clearForm()
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Form, string>> = {}

    if (!form.theme.trim()) {
      newErrors.theme = 'Тема заявки обязательна'
    }
    
    return Object.keys(newErrors).length === 0
  }

  return (
    <>
      <Box>
        <Box h='50px'></Box>
        <ButtonDefault
          iconSize={18}
          iconName='cross'
          opacity='0.5'
          colorIcon='text.primary'
          p='0'
          bg='transparent'
          _hover={{ opacity: '0.3' }}
        />

        <Box h='50px'></Box>
        <ButtonDefault
          iconSize={14}
          iconName='plus'
          color='text.btnLight'
          colorIcon='text.btnLight'
          p='7px 14px'
          bg='text.primary'
          text='Создать новую заявку'
          onClick={openModal}
        />

        <Box h='50px'></Box>
        <DefaultModal
          isOpen={isOpenPopup}
          onClose={closeModal}
          isMobile={isMobile}
          title={'Создание заявки'}
          footer={
            <>
              {!isMobile ? (
                <ActionsFormDes closeModal={closeModal} submit={submit} />
              ) : (
                <>
                  <ButtonDefault
                    text='Прикрепить файлы'
                    iconName='plus'
                    bg='text.btnLight'
                    p='13px'
                    color='text.primary'
                  />
                  <ButtonDefault
                    text='Создать заявку'
                    disabled={!form.theme.trim()}
                    p='13px'
                    bg='text.primary'
                    type='submit'
                    form='requestForm'
                    onClick={submit}
                  />
                </>
              )}
            </>
          }
        >
          <RequestForm errors={errors} form={form} update={update} isMobile={isMobile} />
        </DefaultModal>
      </Box>
    </>
  )
}
