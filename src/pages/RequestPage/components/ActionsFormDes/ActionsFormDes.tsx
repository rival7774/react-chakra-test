import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'

type Props = {
  submit: () => void
  closeModal: () => void
}

export const ActionsFormDes = ({ submit, closeModal }: Props) => {
  return (
    <>
      <ButtonDefault
        text='Создать заявку'
        p='8px 17px'
        bg='text.primary'
        type='submit'
        form='requestForm'
        borderRadius='5px'
        onClick={submit}
      />
      <ButtonDefault
        border='1px solid'
        bg='surface.white'
        borderColor='text.primary'
        color='text.primary'
        p='8px 10px'
        borderRadius='5px'
        text='Отмена'
        onClick={closeModal}
      />
    </>
  )
}
