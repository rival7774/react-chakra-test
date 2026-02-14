import { Box, FileUpload, Flex } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { FilePreviewGrid } from '@/components/common/FilePreviewGrid/FilePreviewGrid'
import { useRef } from 'react'

type Props = {
  files: File[]
  onChange: (files: File[]) => void
  id?: string
  title?: string
}

export const InputFile = ({ files, onChange, id, title }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemoveFile = (fileName: string) => {
    onChange(files.filter((f) => f.name !== fileName))
  }

  const addFiles = (newFiles: FileList | File[]) => {
    const arrFiles = Array.from(newFiles)
    const filterDouble = [...files, ...arrFiles].filter(
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

  const handleClickDropzone = () => {
    inputRef.current?.click()
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
      <FileUpload.HiddenInput
        ref={inputRef}
        multiple
        onChange={handleFilesSelected}
        id={id}
        aria-hidden={false}
      />
      <Flex gap='8px' h='100%' justify={files.length ? 'space-between' : 'stretch'}>
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
          onClick={handleClickDropzone}
        >
          <FileUpload.DropzoneContent>
            <Box color='text.primary' lineHeight='100%' fontWeight='300'>
              {title}
            </Box>
          </FileUpload.DropzoneContent>
          <MyIcon name='img' color='#000' />
        </FileUpload.Dropzone>
        {files.length > 0 && <FilePreviewGrid files={files} onRemove={handleRemoveFile} />}
      </Flex>
    </FileUpload.Root>
  )
}
