import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@shared/components/ui';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useDocumentFormContext } from './form';

export function TitleFormItem() {
  const { control, register, getValues, setValue } = useDocumentFormContext();
  const file = useWatch({ control, name: 'documentFile' });

  useEffect(() => {
    const values = getValues();
    if (!values.title && !!file?.name) {
      setValue('title', file.name);
    }
  }, [file, getValues, setValue]);

  return (
    <FormItem>
      <FormLabel>Title</FormLabel>
      <FormControl>
        <Input {...register('title')} placeholder="My Document" />
      </FormControl>
      <FormDescription>
        This is how your document will appear in your library.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}
