import { Box, Grid, GridItem } from '@chakra-ui/react'
import { FileUploadForm } from '@/components/common/LabelDefault/LabelDefault'
import { InputFile } from '@/components/common/InputFile/InputFile'
import { TextareaDefault } from '@/components/common/TextareaDefault/TextareaDefault'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { SelectWithIcon } from '@/components/common/select/SelectWithIcon/SelectWithIcon'
import { CheckboxDefault } from '@/components/common/CheckboxDefault/CheckboxDefault'
import { SelectBase } from '@/components/common/select/SelectBase/SelectBase'
import { Form } from '@/types/Form'

type RequestFormProps = {
  form: Form
  isMobile: boolean
  update: <K extends keyof Form>(key: K, value: Form[K]) => void
  errors?: Partial<Record<keyof Form, string>>
}

export const RequestForm = ({ form, update, isMobile, errors }: RequestFormProps) => {
  return (
    <Grid
      templateColumns={{ base: '1fr', md: '1fr 1fr' }}
      gap={{ base: '35px', md: '32px' }}
      p={{ base: '24px 16px', md: '0' }}
    >
      <GridItem>
        <Grid>
          <FileUploadForm label='Аптека' mb={{ base: '24px', md: '46px' }} id=''>
            <SelectBase
              paddingTrigger={isMobile ? '14px 16px' : '16px'}
              value={form.pharmacy}
              onChange={(v) => update('pharmacy', v)}
              placeholder='Выберите аптеку'
              options={[
                { value: '1', label: 'Аптека №1' },
                { value: '2', label: 'Аптека №2' },
              ]}
            />
          </FileUploadForm>

          <FileUploadForm label='Категория заявки' mb='16px' id=''>
            <SelectBase
              value={form.category}
              paddingTrigger={isMobile ? '14px 16px' : '12px 16px'}
              onChange={(v) => update('category', v)}
              placeholder='Выберите категорию'
              options={[
                { value: 'it', label: 'IT' },
                { value: 'eq', label: 'Оборудование' },
              ]}
            />
          </FileUploadForm>

          <CheckboxDefault checked={form.warranty} onChange={(v) => update('warranty', v)}>
            Гарантийный случай?
          </CheckboxDefault>
        </Grid>
      </GridItem>

      <GridItem>
        <Grid gap='24px'>
          <FileUploadForm label='Тема заявки' id='theme'>
            <TextareaDefault
              id='theme'
              value={form.theme}
              onChange={(v: string) => update('theme', v)}
              placeholder='Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер'
              minH='70px'
            />
            {errors?.theme && (
              <Box color='red.500' fontSize='sm'>
                {errors.theme}
              </Box>
            )}
          </FileUploadForm>

          <FileUploadForm label='Приоритет' id=''>
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
          </FileUploadForm>

          <FileUploadForm label='Описание проблемы' id='description'>
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
          </FileUploadForm>

          {!isMobile && (
            <FileUploadForm label='Прикрепите файлы' id='file'>
              <InputFile
                id='file'
                title='Выберите или перетащите фото или файл'
                files={form.files}
                onChange={(files: File[]) => update('files', files)}
              />
            </FileUploadForm>
          )}
        </Grid>
      </GridItem>
    </Grid>
  )
}
