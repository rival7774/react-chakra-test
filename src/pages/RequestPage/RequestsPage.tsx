import { Box, Flex, Spinner, Tabs, Text, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { DefaultModal } from '@/components/common/ModalDefault/ModalDefault'
import { RequestForm } from '@/pages/RequestPage/components/RequestPageForm/RequestPageForm'
import { Form } from '@/types/Form'
import { ActionsFormDes } from '@/pages/RequestPage/components/ActionsFormDes/ActionsFormDes'
import { mockRequests } from '@/pages/RequestPage/mock/mockRequests'
import { Request } from './types/Request'
import { RequestsMobileList } from '@/pages/RequestPage/components/RequestsMobileList/RequestsMobileList'
import { RequestsTable } from '@/pages/RequestPage/components/RequestsTable/RequestsTable'
import { SearchInput } from '@/components/common/SearchInput/SearchInput'

type TabItem = { value: string; label: string }

export const RequestsPage = () => {
  const isMobile = Boolean(useBreakpointValue({ base: true, md: false }))

  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false)
  const [onlyMine, setOnlyMine] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const [form, setForm] = useState<Form>({
    pharmacy: '',
    category: '',
    theme: '',
    priority: 'Средний',
    warranty: false,
    description: '',
    files: [],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(mockRequests)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const tabsDesktop: TabItem[] = [
    { value: 'new', label: 'Новые' },
    { value: 'rejected', label: 'Отклонены' },
    { value: 'review', label: 'На рассмотрении' },
    { value: 'inProgress', label: 'В работе' },
    { value: 'waitingParts', label: 'Ожидают запчасти' },
    { value: 'done', label: 'Готовы' },
    { value: 'closed', label: 'Закрыты' },
    { value: 'all', label: 'Все статусы' },
  ]

  const tabsMobile: TabItem[] = [
    { value: 'all', label: 'Все статусы' },
    { value: 'new', label: 'Новые' },
    { value: 'review', label: 'На рассмотрении' },
    { value: 'inProgress', label: 'В работе' },
    { value: 'done', label: 'Готовы' },
    { value: 'closed', label: 'Закрыты' },
  ]

  const tabs = isMobile ? tabsMobile : tabsDesktop

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    return requests.filter((r) => {
      const matchStatus = status === 'all' ? true : r.status === status
      const matchMine = onlyMine ? Boolean(r.mine) : true

      const matchSearch =
        q.length === 0
          ? true
          : r.id.toLowerCase().includes(q) ||
            r.theme.toLowerCase().includes(q) ||
            r.pharmacyTitle.toLowerCase().includes(q) ||
            r.pharmacyNo.toLowerCase().includes(q)

      return matchStatus && matchMine && matchSearch
    })
  }, [requests, status, onlyMine, search])

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
  }

  const closeModal = () => setIsOpenPopup(false)
  const openModal = () => setIsOpenPopup(true)

  const submit = () => {
    if (isMobile && !form.pharmacy) return

    console.log(form)
    closeModal()
    clearForm()
  }

  const canCreateMobile = Boolean(form.pharmacy)

  return (
    <Box>
      {/* Desktop header: поиск + экспорт + создать */}
      {!isMobile && (
        <Flex align='center' gap='13px' mb='21px'>
          <Box flex='1'>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder='Поиск по номеру или теме заявки'
            />
          </Box>

          <ButtonDefault
            iconSize={15}
            iconName='pdf'
            color='text.primary'
            colorIcon='text.primary'
            borderColor='border.default'
            wrapIcon={{
              mr: '12px',
            }}
            p='7px 9px'
            bg='text.btnLight'
            text='Экспорт'
            onClick={() => console.log('export')}
            _hover={{ opacity: 0.9 }}
          />

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
        </Flex>
      )}

      <Box pb={isMobile ? '110px' : '0'}>
        {/* Tabs + "Показать только мои" ВНУТРИ Tabs.List */}
        <Tabs.Root value={status} onValueChange={(e) => setStatus(e.value)}>
          <Tabs.List
            gap={isMobile ? '10px' : '8px'}
            whiteSpace='nowrap'
            overflowX='auto'
            overflowY='hidden'
            pb='21px'
          >
            {isMobile && (
              <Box flexShrink={0}>
                <ButtonDefault
                  iconName='filter'
                  iconSize={12}
                  p='8px 18px'
                  h='100%'
                  bg={onlyMine ? 'text.primary' : 'text.btnLight'}
                  color={onlyMine ? 'text.btnLight' : 'text.primary'}
                  colorIcon={onlyMine ? 'text.btnLight' : 'text.primary'}
                  onClick={() => setOnlyMine((prev) => !prev)}
                />
              </Box>
            )}

            {tabs.map((t) => (
              <Tabs.Trigger
                key={t.value}
                value={t.value}
                borderRadius='4px'
                p='8px 17px'
                bg='text.btnLight'
                fontSize='16px'
                color='text.primary'
                _hover={{ opacity: 0.5 }}
                _selected={{
                  bg: 'text.primary',
                  color: 'surface.white',
                  borderBottom: '0',
                  boxShadow: 'none',
                }}
                _before={{ display: 'none' }}
                flexShrink={0}
              >
                {t.label}
              </Tabs.Trigger>
            ))}

            {/* Разделитель + кнопка "Показать только мои" (десктоп) */}
            {!isMobile && (
              <>
                <Box
                  w='3px'
                  h='40px'
                  bg='border.default'
                  alignSelf='center'
                  flexShrink={0}
                  m='0 16px 0 19px'
                />

                <Box flexShrink={0}>
                  <ButtonDefault
                    text='Показать только мои'
                    iconName='filter'
                    iconSize={12}
                    p='8px 17px'
                    lineHeight='22px'
                    bg={onlyMine ? 'text.primary' : 'text.btnLight'}
                    color={onlyMine ? 'text.btnLight' : 'text.primary'}
                    colorIcon={onlyMine ? 'text.btnLight' : 'text.primary'}
                    onClick={() => setOnlyMine((prev) => !prev)}
                  />
                </Box>
              </>
            )}
          </Tabs.List>
        </Tabs.Root>

        <Box mt='16px'>
          {loading ? (
            <Flex justify='center' align='center' h='300px'>
              <Spinner size='lg' />
            </Flex>
          ) : filtered.length === 0 ? (
            <Flex justify='center' align='center' h='220px'>
              <Text color='gray.500'>Ничего не найдено</Text>
            </Flex>
          ) : isMobile ? (
            <RequestsMobileList data={filtered} />
          ) : (
            <RequestsTable data={filtered} />
          )}
        </Box>
      </Box>

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
                  onClick={submit}
                />
              </>
            )}
          </>
        }
      >
        <RequestForm form={form} update={update} isMobile={isMobile} errors={{}} />
      </DefaultModal>

      {/* Футер бар на мобиле */}
      {isMobile && (
        <Box
          position='fixed'
          right='0'
          bottom='30px'
          bg='transparent'
          w='100%'
          p='0 16px'
          zIndex={20}
        >
          <Flex direction='column' gap='8px' w='100%' justify='end'>
            <Flex justify='flex-end'>
              <Box
                w={mobileSearchExpanded ? '100%' : '106px'}
                transition='width 180ms ease'
                onClick={() => setMobileSearchExpanded(true)}
              >
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder='Поиск'
                  debounceTime={200}
                  variant='mobile'
                  onExpand={() => setMobileSearchExpanded(true)}
                  onCollapse={() => setMobileSearchExpanded(false)}
                />
              </Box>
            </Flex>

            <ButtonDefault
              iconSize={14}
              iconName='plus'
              color='text.btnLight'
              colorIcon='text.btnLight'
              p='7px 14px'
              bg='text.primary'
              text='Создать новую заявку'
              w='max-content'
              ml='auto'
              onClick={openModal}
            />
          </Flex>
        </Box>
      )}
    </Box>
  )
}
