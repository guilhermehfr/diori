'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

import { ImageUploader } from '../ImageUploader'

import { createPostAction } from '@/src/actions/post/create-post-action'
import { updatePostAction } from '@/src/actions/post/update-post-action'
import { makePartialPublicPost, PublicPost } from '@/src/dto/post/dto'

import { Button } from '@/src/components/Button'
import { InputText } from '@/src/components/InputText'
import { InputCheckbox } from '@/src/components/InputCheckbox'
import { MarkdownEditor } from '@/src/components/MarkdownEditor'

type ManagePostUpdateFormProps = {
  mode: 'update'
  publicPost: PublicPost
}
type ManagePostCreateFormProps = {
  mode: 'create'
}

type ManagePostFormProps = ManagePostUpdateFormProps | ManagePostCreateFormProps

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props
  const publicPost = mode === 'update' ? props.publicPost : undefined

  const searchParams = useSearchParams()
  const created = searchParams.get('created')
  const router = useRouter()

  const [contentValue, setContentValue] = useState(publicPost?.content || '')

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  }

  const [{ formState: post, errors, success }, action, isPending] = useActionState(
    actionsMap[mode],
    initialState
  )

  useEffect(() => {
    if (errors.length > 0) {
      toast.dismiss()
      errors.map((error) => toast.error(error))
    }
  }, [errors])

  useEffect(() => {
    if (success) {
      toast.dismiss()
      toast.success(`Post updated successfully!`)
    }
  }, [success])

  useEffect(() => {
    if (created === '1') {
      toast.dismiss()
      toast.success(`Post created successfully!`)

      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created, router])

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Automatically generated ID"
          type="text"
          defaultValue={post.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Automatically generated slug"
          type="text"
          defaultValue={post.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Enter author name"
          type="text"
          defaultValue={post.author}
          disabled={isPending}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Enter the title"
          type="text"
          defaultValue={post.title}
          disabled={isPending}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Enter a short summary"
          type="text"
          defaultValue={post.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText="Content"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText="Cover image URL"
          name="coverImageUrl"
          placeholder="Enter the image URL"
          type="text"
          defaultValue={post.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publish"
          name="published"
          type="checkbox"
          defaultChecked={post.published}
          disabled={isPending}
        />

        <div className="mt-4">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}
