'use server'

import { mkdir, writeFile } from 'fs/promises'
import { extname, resolve } from 'path'

type UploadImageActionResult = {
  url: string
  error: string
}

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error })
  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Invalid data' })
  }

  const file = formData.get('file')

  if (!(file instanceof File)) {
    return makeResult({ error: 'Invalid file' })
  }
  if (file.size > Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE)) {
    return makeResult({ error: 'File too large' })
  }
  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Invalid image' })
  }

  const uploadFullPath = resolve(
    process.cwd(),
    'public',
    process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads'
  )
  await mkdir(uploadFullPath, { recursive: true })

  const imageExtension = extname(file.name)
  const uniqueImageName = `${Date.now()}${imageExtension}`
  const fileFullPath = resolve(uploadFullPath, uniqueImageName)

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)
  await writeFile(fileFullPath, buffer)

  const url = `${process.env.IMAGE_SERVER_URL}/${process.env.IMAGE_UPLOAD_DIRECTORY}/${uniqueImageName}`
  return makeResult({ url })
}
