import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { BaseOption } from '@/components/common/select/types'
import { Box, createListCollection, Select } from '@chakra-ui/react'

export type Props<T extends BaseOption> = {
  value?: string
  onChange: (v: string) => void
  options: T[]
  placeholder: string
  paddingTrigger?: string
  renderTrigger?: (selected: T | undefined) => React.ReactNode
  renderItem?: (option: T) => React.ReactNode
  id?: string
}

export const SelectBase = <T extends BaseOption>({
  options,
  placeholder,
  onChange,
  value,
  renderTrigger,
  renderItem,
  paddingTrigger = '12px 16px',
}: Props<T>) => {
  const items = [{ value: '', label: placeholder } as T, ...options]

  const collectionOptions = createListCollection({
    items: items,
    itemToString: (i) => i.label,
    itemToValue: (i) => i.value,
  })

  const selectedOption = items.find((o) => o.value === value)

  return (
    <Box>
      <Select.Root
        onValueChange={(val) => onChange(val.value[0])}
        collection={collectionOptions}
        positioning={{
          sameWidth: true,
          gutter: 2,
          flip: false,
          shift: 0,
          slide: false,
        }}
        loopFocus={true}
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger
            p={renderTrigger ? '0' : paddingTrigger}
            cursor='pointer'
            borderRadius='8px'
            borderColor='border.select'
            _hover={{ borderColor: 'text.primary' }}
            _focus={{ outlineColor: 'text.primary' }}
            h='auto'
            minH='auto'
          >
            {renderTrigger ? (
              renderTrigger(selectedOption)
            ) : (
              <Select.ValueText
                color={value ? 'text.primary' : 'border.select'}
                placeholder={placeholder}
                fontSize={{ base: '12px', md: '14px' }}
                lineHeight='100%'
              />
            )}
          </Select.Trigger>
          <Select.IndicatorGroup
            p='0'
            right='19.5px'
          >
            <MyIcon
              name='arrowDown'
              size='17px'
              color='text.primary'
            />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner>
          <Select.Content
            w='calc(var(--reference-width) - 2px)'
            ml='1px'
          >
            {collectionOptions.items.map((option) => (
              <Select.Item
                key={option.value}
                color={option.value === '' ? 'border.select' : 'text.primary'}
                item={option}
                cursor='pointer'
              >
                {renderItem ? renderItem(option) : option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  )
}
