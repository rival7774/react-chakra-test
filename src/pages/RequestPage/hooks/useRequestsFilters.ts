import { useMemo, useState } from 'react'
import { Request } from '../types/Request'

export const useRequestsFilters = (requests: Request[]) => {
  const [status, setStatus] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [onlyMine, setOnlyMine] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    return requests.filter((request) => {
      const matchStatus = status === 'all' ? true : request.status === status
      const matchMine = onlyMine ? Boolean(request.mine) : true

      const matchSearch =
        q.length === 0
          ? true
          : request.id.toLowerCase().includes(q) ||
            request.theme.toLowerCase().includes(q) ||
            request.pharmacyTitle.toLowerCase().includes(q) ||
            request.pharmacyNo.toLowerCase().includes(q)

      return matchStatus && matchMine && matchSearch
    })
  }, [requests, status, onlyMine, search])

  return {
    status,
    setStatus,
    search,
    setSearch,
    onlyMine,
    setOnlyMine,
    filtered,
  }
}
