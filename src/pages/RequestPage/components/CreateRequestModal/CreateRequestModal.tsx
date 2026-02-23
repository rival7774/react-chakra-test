import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { DefaultModal } from '@/components/common/ModalDefault/ModalDefault'
import { ActionsFormDes } from '@/pages/RequestPage/components/ActionsFormDes/ActionsFormDes'
import { RequestForm } from '@/pages/RequestPage/components/RequestPageForm/RequestPageForm'
import { Form } from '@/types/Form'

type CreateRequestModalProps = {
  isOpen: boolean
  isMobile: boolean
  form: Form
  canCreateMobile: boolean
  update: <K extends keyof Form>(key: K, value: Form[K]) => void
  onClose: () => void
  onSubmit: () => void
}

export const CreateRequestModal = ({
  isOpen,
  isMobile,
  form,
  canCreateMobile,
  update,
  onClose,
  onSubmit,
}: CreateRequestModalProps) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      isMobile={isMobile}
      title='Создание заявки'
      footer={
        <>
          {!isMobile ? (
            <ActionsFormDes closeModal={onClose} submit={onSubmit} />
          ) : (
            <>
              <ButtonDefault
                text='Прикрепить файлы'
                iconName='plus'
                bg='text.btnLight'
                p='13px'
                borderRadius='5px'
                color='text.primary'
              />
              <ButtonDefault
                text='Создать заявку'
                disabled={!canCreateMobile}
                p='13px'
                borderRadius='5px'
                bg='text.primary'
                type='submit'
                form='requestForm'
                onClick={onSubmit}
              />
            </>
          )}
        </>
      }
    >
      <RequestForm form={form} update={update} isMobile={isMobile} errors={{}} />
    </DefaultModal>
  )
}
