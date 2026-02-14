import { Box, FileUpload, Flex } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { FilePreviewGrid } from '@/components/common/FilePreviewGrid/FilePreviewGrid'

type Props = {
  value: File[]
  onChange: (files: File[]) => void
}

export const InputFile = ({ value, onChange }: Props) => {
  const handleRemoveFile = (fileName: string) => {
    onChange(value.filter((f) => f.name !== fileName))
  }

  const addFiles = (files: FileList | File[]) => {
    const newFiles = Array.from(files)
    const filterDouble = [...value, ...newFiles].filter(
      (f, i, arr) =>
        arr.findIndex((x) => x.name === f.name && x.lastModified === f.lastModified) === i
    )
    onChange(filterDouble)
  }

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return
    addFiles(e.currentTarget.files)
    e.currentTarget.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  return (
    <FileUpload.Root
      maxW='xl'
      alignItems='stretch'
      display='flex'
      flexDirection='column'
      w='100%'
      h='100px'
    >
      <FileUpload.HiddenInput multiple onChange={handleFilesSelected} />
      <Flex gap='8px' h='100%' justify={value.length ? 'space-between' : 'stretch'}>
        <FileUpload.Dropzone
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          w='100%'
          minH='auto'
          h='100%'
          gap='8px'
          display='flex'
          flexDirection='column'
          borderColor='border.select'
          cursor='pointer'
        >
          <FileUpload.DropzoneContent>
            <Box color='text.primary' lineHeight='100%' fontWeight='300'>
              Выберите или перетащите фото или файл
            </Box>
          </FileUpload.DropzoneContent>
          <MyIcon name='img' color='#000' />
        </FileUpload.Dropzone>
        {value.length > 0 && <FilePreviewGrid files={value} onRemove={handleRemoveFile} />}
      </Flex>
    </FileUpload.Root>
  )
}
