import { BaseOption } from '@/components/common/select/types'

export interface OptionWithIcon extends BaseOption {
  icon?: React.ReactNode
  description: string
}
