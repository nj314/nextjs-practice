'use client';
import { api } from '@convex/api';
import {
  Button,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui';
import { useMutation } from 'convex/react';
import { FormProvider } from 'react-hook-form';
import { DocumentControl } from './DocumentControl';
import { TitleFormItem } from './TitleFormItem';
import { ACCEPTED_FILE_TYPES, useDocumentForm } from './form';

export default function AddDocument() {
  // 1. Define your form.
  const form = useDocumentForm();
  const generateUploadUrl = useMutation(api.file.generateUploadUrl);
  const createDocument = useMutation(api.document.create);

  const handleSubmit = form.handleSubmit(async (values) => {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const formData = new FormData();
    const { documentFile, title } = values;
    formData.append('file', documentFile);
    formData.append('fileName', documentFile.name);
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': documentFile.type },
      body: documentFile,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    console.log('storage id is', storageId);
    await createDocument({ title, sourceUrl: storageId });
  });

  return (
    <div className="px-5 flex flex-col items-center justify-center w-full h-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-20">
          <FormItem>
            <FormLabel>Upload file</FormLabel>
            <FormControl>
              <DocumentControl name="documentFile" />
            </FormControl>
            <FormDescription>
              Accepted file types: {ACCEPTED_FILE_TYPES.join(', ')}
            </FormDescription>
            <FormMessage />
          </FormItem>

          <TitleFormItem />

          <div className="mt-5 flex justify-end">
            <Button disabled={form.formState.isSubmitting} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
