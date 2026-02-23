import { useState } from 'react'
import { Form } from '@/types/Form'
import { createDefaultRequestForm } from '../constants/defaultForm'

type UseRequestFormParams = {
  isMobile: boolean
  onSubmitted?: () => void
}

export const useRequestForm = ({ isMobile, onSubmitted }: UseRequestFormParams) => {
  const [form, setForm] = useState<Form>(createDefaultRequestForm)

  const clearForm = () => {
    setForm(createDefaultRequestForm())
  }

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = () => {
    if (isMobile && !form.pharmacy) {
      return
    }

    console.log(form)
    onSubmitted?.()
    clearForm()
  }

  const canCreateMobile = Boolean(form.pharmacy)

  return {
    form,
    update,
    submit,
    canCreateMobile,
  }
}
