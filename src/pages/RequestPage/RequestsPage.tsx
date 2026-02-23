import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import {
  requestTabsDesktop,
  requestTabsMobile,
} from '@/pages/RequestPage/constants/requestTabs'
import { CreateRequestModal } from '@/pages/RequestPage/components/CreateRequestModal/CreateRequestModal'
import { RequestsContent } from '@/pages/RequestPage/components/RequestsContent/RequestsContent'
import { RequestsMobileFooter } from '@/pages/RequestPage/components/RequestsMobileFooter/RequestsMobileFooter'
import { RequestsStatusTabs } from '@/pages/RequestPage/components/RequestsStatusTabs/RequestsStatusTabs'
import { RequestsToolbarDesktop } from '@/pages/RequestPage/components/RequestsToolbarDesktop/RequestsToolbarDesktop'
import { useRequestForm } from '@/pages/RequestPage/hooks/useRequestForm'
import { useRequestsData } from '@/pages/RequestPage/hooks/useRequestsData'
import { useRequestsFilters } from '@/pages/RequestPage/hooks/useRequestsFilters'

export const RequestsPage = () => {
  const isMobile = Boolean(useBreakpointValue({ base: true, md: false }))
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const { requests, loading } = useRequestsData()
  const { status, setStatus, search, setSearch, onlyMine, setOnlyMine, filtered } =
    useRequestsFilters(requests)

  const closeModal = () => setIsOpenPopup(false)
  const openModal = () => setIsOpenPopup(true)

  const { form, update, submit, canCreateMobile } = useRequestForm({
    isMobile,
    onSubmitted: closeModal,
  })

  const tabs = isMobile ? requestTabsMobile : requestTabsDesktop

  return (
    <Box>
      {!isMobile && (
        <RequestsToolbarDesktop
          search={search}
          onSearchChange={setSearch}
          onOpenModal={openModal}
          onExport={() => console.log('export')}
        />
      )}

      <Box pb={isMobile ? '110px' : '0'}>
        <RequestsStatusTabs
          isMobile={isMobile}
          status={status}
          tabs={tabs}
          onlyMine={onlyMine}
          onStatusChange={setStatus}
          onToggleOnlyMine={() => setOnlyMine((prev) => !prev)}
        />

        <RequestsContent loading={loading} isMobile={isMobile} data={filtered} />
      </Box>

      <CreateRequestModal
        isOpen={isOpenPopup}
        onClose={closeModal}
        isMobile={isMobile}
        form={form}
        update={update}
        canCreateMobile={canCreateMobile}
        onSubmit={submit}
      />

      {isMobile && (
        <RequestsMobileFooter
          search={search}
          mobileSearchExpanded={mobileSearchExpanded}
          onSearchChange={setSearch}
          onExpandSearch={() => setMobileSearchExpanded(true)}
          onCollapseSearch={() => setMobileSearchExpanded(false)}
          onOpenModal={openModal}
        />
      )}
    </Box>
  )
}
