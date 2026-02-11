import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { SelectWithIcon } from '@/components/common/select/SelectWithIcon/SelectWithIcon'
import { SelectBase } from '@/components/common/select/SelectBase/SelectBase'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'

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

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

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
        <SelectWithIcon
          isMobile={Boolean(isMobile)}
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
