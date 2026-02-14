import { Flex, FlexProps, Image } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { ButtonDefault } from '@/components/common/ButtonDefault/ButtonDefault'
import { useEffect, useState } from 'react'

type Props = {
  file: File
  onRemove: (name: string) => void
} & FlexProps

export const FilePreviewItem = ({ file, onRemove, ...rest }: Props) => {
  const isImage = file.type.startsWith('image/')
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    if (!isImage) return

    const objectUrl = URL.createObjectURL(file)

    Promise.resolve().then(() => setUrl(objectUrl))

    return () => {
      URL.revokeObjectURL(objectUrl)
      setUrl('')
    }
  }, [file, isImage])

  return (
    <Flex
      bg='border.headerPopup'
      borderRadius='8px'
      justify='space-between'
      align='center'
      p='8px'
      h='36px'
      w='100%'
      {...rest}
    >
      <Flex maxW='20px' maxH='20px' minH='0'>
        {isImage && url ? (
          <Image src={url} alt={file.name} maxW='100%' h='auto' objectFit='contain' />
        ) : (
          <MyIcon name='file' />
        )}
      </Flex>
      <ButtonDefault
        iconSize={12}
        iconName='cross'
        p='0'
        colorIcon='text.primary'
        bg='transparent'
        onClick={() => onRemove(file.name)}
      />
    </Flex>
  )
}
