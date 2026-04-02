'use client'

import { useState } from 'react'

import { Button } from '@/src/components/Button'
import { InputCheckbox } from '@/src/components/InputCheckbox'
import { InputText } from '@/src/components/InputText'
import { MarkdownEditor } from '@/src/components/MarkdownEditor'
import { PublicPost } from '@/src/dto/post/dto'
import { ImageUploader } from '../ImageUploader'

type ManagePostFormProps = {
  publicPost?: PublicPost
}

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '')

  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Automatically generated ID"
          type="text"
          defaultValue={publicPost?.id || ''}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Automatically generated slug"
          type="text"
          defaultValue={publicPost?.slug || ''}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Enter author name"
          type="text"
          defaultValue={publicPost?.author || ''}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Enter the title"
          type="text"
          defaultValue={publicPost?.title || ''}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Enter a short summary"
          type="text"
          defaultValue={publicPost?.excerpt || ''}
        />

        <MarkdownEditor
          labelText="Content"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText="Cover image URL"
          name="coverImageUrl"
          placeholder="Enter the image URL"
          type="text"
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <InputCheckbox
          labelText="Publish"
          name="published"
          type="checkbox"
          defaultChecked={publicPost?.published || false}
        />

        <div className="mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}
