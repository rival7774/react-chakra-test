import React, { useMemo } from 'react'
import { icons } from '@/assets/icons/icons'
import type { IconName } from '@/assets/icons/IconName'
import { chakra } from '@chakra-ui/react'

type Props = {
  name: IconName
  size?: number | string
  color?: string
  className?: string
}

const ChakraSvg = chakra('svg')

export const MyIcon: React.FC<Props> = ({ name, size = '16px', color = 'currentColor' }) => {
  const svgContent = icons[name]

  const innerHTML = useMemo(() => {
    return svgContent.replace(/<svg[^>]*>/i, '').replace(/<\/svg>/i, '')
  }, [svgContent])

  const viewBox = useMemo(() => {
    const match = svgContent.match(/viewBox="([^"]*)"/)
    return match ? match[1] : '0 0 24 24'
  }, [svgContent])

  return (
    <ChakraSvg
      viewBox={viewBox}
      width={size}
      height={size}
      fill='currentColor'
      color={color}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  )
}
