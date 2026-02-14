import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { SelectWithIcon } from '@/components/common/select/SelectWithIcon/SelectWithIcon'
import { SelectBase } from '@/components/common/select/SelectBase/SelectBase'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { TextareaDefault } from '@/components/common/TextareaDefault/TextareaDefault'
import { CheckboxDefault } from '@/components/common/CheckboxDefault/CheckboxDefault'
import { InputFile } from '@/components/common/InputFile/InputFile'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { DefaultModal } from '@/components/common/Modal/ModalDefault'

type Form = {
  pharmacy: string
  category: string
  theme: string
  priority: string
  warranty: boolean
  description: string
  files: File[]
}

export const RequestsPage = () => {
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

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const closeModal = () => {
    setIsOpenPopup(false)
  }

  const openModal = () => {
    setIsOpenPopup(true)
  }

  const submit = () => {
    console.log(form)
  }

  const isMobile = Boolean(useBreakpointValue({ base: true, md: false }))

  return (
    <>
      <Box>
        <Box h='1000px'>ReportsPage</Box>
        <SelectBase
          value={form.pharmacy}
          placeholder='Выберите аптеку от которой исходит заявка'
          onChange={(v) => update('pharmacy', v)}
          paddingTrigger='16px'
          options={[
            {
              value: 'Аптека №1',
              label: 'Аптека №1',
            },
            {
              value: 'Аптека №2',
              label: 'Аптека №2',
            },
            {
              value: 'Аптека №3',
              label: 'Аптека №3',
            },
            {
              value: 'Аптека №4',
              label: 'Аптека №4',
            },
          ]}
        />

        <Box h='50px'></Box>
        <TextareaDefault
          value={form.theme}
          onChange={(v: string) => update('theme', v)}
          placeholder='Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер'
          minH='70px'
        />

        <TextareaDefault
          value={form.description}
          onChange={(v: string) => update('description', v)}
          placeholder={
            `Кратко опишите проблему:\n\n` +
            `  • что случилось?\n` +
            `  • дата и время произошедшего?\n` +
            `  • сколько длится проблема?\n` +
            `  • насколько она влияет на вашу работу?`
          }
          minH='164px'
        />

        <Box h='50px'></Box>
        <CheckboxDefault checked={form.warranty} onChange={(v) => update('warranty', v)}>
          Гарантийный случай?
        </CheckboxDefault>

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
        <DefaultModal
          isOpen={isOpenPopup}
          onClose={closeModal}
          isMobile={isMobile}
          title={'Создание заявки'}
          footer={
            <>
              <ButtonDefault
                text='Создать заявку'
                p='8px 17px'
                bg='text.primary'
                onClick={submit}
              ></ButtonDefault>
              <ButtonDefault text='Отмена' onClick={closeModal} />
            </>
          }
        >
          <Box>Привет</Box>
        </DefaultModal>

        <Box h='50px'></Box>
        <InputFile value={form.files} onChange={(v) => update('files', v)} />

        <Box h='50px'></Box>
        <SelectWithIcon
          isMobile={isMobile}
          value={form.priority}
          placeholder='Выберите приоритет'
          onChange={(v) => update('priority', v)}
          options={[
            {
              value: 'Низкий',
              label: 'Низкий',
              description: 'не стопорит',
              icon: <MyIcon name='arrowPriorityDown' color='icon.down' size='14px'></MyIcon>,
            },
            {
              value: 'Средний',
              label: 'Средний',
              description: 'влияет на эффективность, но не стопорит',
              icon: <MyIcon name='square' color='icon.square' size='14px'></MyIcon>,
            },
            {
              value: 'Высокий',
              label: 'Высокий',
              description: 'Очень влияет на эффективность, но не стопорит',
              icon: <MyIcon name='arrowUp' color='icon.up' size='14px'></MyIcon>,
            },
            {
              value: 'Критический',
              label: 'Критический',
              description: 'Критически влияет на эффективность, но не стопорит',
              icon: <MyIcon name='twoArrowsUp' color='icon.up' size='14px'></MyIcon>,
            },
          ]}
        />
        <Box h='50px'></Box>
        <SelectBase
          value={form.category}
          placeholder='Холодильники, кондиционеры или другое'
          onChange={(v) => update('category', v)}
          options={[
            {
              value: 'олодильник',
              label: 'Холодильник',
            },
            {
              value: 'кондиционер',
              label: 'Кондиционер',
            },
            {
              value: 'печка',
              label: 'Печка',
            },
          ]}
        />
        <Box h='2000px'>ReportsPage</Box>
      </Box>
    </>
  )
}
