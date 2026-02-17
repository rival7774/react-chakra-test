import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        text: {
          primary: { value: '#1C1C1C' },
          btnLight: { value: '#F1F1F1' },
          placeholderSearch: { value: '#ABABAB' },
          address: { value: '#A4A4A4' },
        },

        border: {
          default: { value: '#D9E1EC' },
          headerPopup: { value: '#DDDDDD' },
          select: { value: '#B0B0B0' },
        },

        bg: {
          number: { value: '#F3F3F3' },
        },

        status: {
          doneBg: { value: '#A2E3A4' },
          closedBg: { value: '#E8E8E8' },
          newBg: { value: '#F0CDFA' },
          inProgressBg: { value: '#FFEBB3' },
          inProgressBgMobile: { value: '#FFFEB3' },
        },

        icon: {
          down: { value: '#2D60ED' },
          square: { value: '#CC892A' },
          up: { value: '#B93C3C' },
          ok: { value: '#0E7411' },
        },

        surface: {
          white: { value: '#FFFFFF' },
          black: { value: '#000000' },
        },
      },

      fonts: {
        body: { value: 'Inter, system-ui, sans-serif' },
        heading: { value: 'Inter, system-ui, sans-serif' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
