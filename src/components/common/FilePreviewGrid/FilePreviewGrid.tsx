import { Flex, FlexProps } from '@chakra-ui/react'
import { FilePreviewItem } from '@/components/common/FilePreviewItem/FilePreviewItem'

type Props = {
  files: File[]
  onRemove: (name: string) => void
} & FlexProps

export const FilePreviewGrid = ({ files, onRemove, ...rest }: Props) => {
  return (
    <Flex direction='column' gap={2} {...rest} w='100%' h='100%' minH='auto'>
      {files.map((file) => (
        <FilePreviewItem key={file.name + file.lastModified} file={file} onRemove={onRemove} />
      ))}
    </Flex>
  )
}
