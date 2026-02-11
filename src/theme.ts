import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        text: {
          primary: { value: '#1C1C1C' },
          btnLight: { value: '#F1F1F1' },
          placeholderSearch: { value: '#ABABAB' },
        },

        border: {
          default: { value: '#D9E1EC' },
          headerPopup: { value: '#DDDDDD' },
          select: { value: '#B0B0B0' },
        },

        icon: {
          down: { value: '#2D60ED' },
          square: { value: '#CC892A' },
          up: { value: '#B93C3C' },
        },

        surface: {
          white: { value: '#FFFFFF' },
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
