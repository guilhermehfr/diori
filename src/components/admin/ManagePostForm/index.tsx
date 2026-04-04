'use client'

import { useActionState, useEffect, useState } from 'react'

import { Button } from '@/src/components/Button'
import { InputCheckbox } from '@/src/components/InputCheckbox'
import { InputText } from '@/src/components/InputText'
import { MarkdownEditor } from '@/src/components/MarkdownEditor'
import { makePartialPublicPost, PublicPost } from '@/src/dto/post/dto'
import { ImageUploader } from '../ImageUploader'
import { createPostAction } from '@/src/actions/post/create-post-action'
import { toast } from 'react-toastify'

type ManagePostFormProps = {
  publicPost?: PublicPost
}

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '')

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }

  const [state, action, isPending] = useActionState(createPostAction, initialState)
  const post = state.formState

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.map((error) => toast.error(error))
    }
  }, [state.errors])

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Automatically generated ID"
          type="text"
          defaultValue={post.id}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Automatically generated slug"
          type="text"
          defaultValue={post.slug}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Enter author name"
          type="text"
          defaultValue={post.author}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Enter the title"
          type="text"
          defaultValue={post.title}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Enter a short summary"
          type="text"
          defaultValue={post.excerpt}
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
          defaultValue={post.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publish"
          name="published"
          type="checkbox"
          defaultChecked={post.published}
        />

        <div className="mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}
