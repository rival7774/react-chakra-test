import { useEffect, useState } from 'react'
import { mockRequests } from '../mock/mockRequests'
import { Request } from '../types/Request'

export const useRequestsData = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(mockRequests)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return { requests, loading }
}
