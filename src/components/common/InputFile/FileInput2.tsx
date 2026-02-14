import { useRef, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { MyIcon } from '@/components/common/MyIcon/MyIcon'
import { FilePreviewGrid } from '@/components/common/FilePreviewGrid/FilePreviewGrid'

export const FileInput2 = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Добавляем новые файлы к старым
  const handleFilesChange = (newFiles: File[]) => {
    const allowed = newFiles.filter((f) => f.size <= 5 * 1024 * 1024)
    setFiles((prev) => {
      const combined = [...prev, ...allowed]
      // максимум 10 файлов
      return combined.slice(-10)
    })
  }

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName))
  }

  const openFileDialog = () => inputRef.current?.click()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesChange(Array.from(e.dataTransfer.files))
      e.dataTransfer.clearData()
    }
  }

  return (
    <Box display='flex' gap={4} alignItems='flex-start'>
      {/* Dropzone Right */}
      <Box
        flexShrink={0}
        border='2px dashed'
        borderColor={isDragging ? 'text.primary' : 'border.select'}
        borderRadius='md'
        p={6}
        textAlign='center'
        cursor='pointer'
        _hover={{ borderColor: 'text.primary', bg: 'border.select' }}
        w='200px'
        onClick={openFileDialog}
        onDragEnter={() => setIsDragging(true)}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <MyIcon name='img' size={24} />
        <Box mt={2}>
          <Text fontWeight='medium'>Перетащите файлы сюда или кликните</Text>
          <Text fontSize='sm' color='gray.500'>
            Любой файл до 5MB, максимум 10 файлов
          </Text>
        </Box>
      </Box>

      {/* Preview Left */}
      {files.length > 0 && (
        <FilePreviewGrid files={files} onRemove={handleRemoveFile} w='full' gap={4} />
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type='file'
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (!e.target.files) return
          handleFilesChange(Array.from(e.target.files))
          e.target.value = '' // сброс, чтобы можно было выбрать те же файлы
        }}
      />
    </Box>
  )
}
