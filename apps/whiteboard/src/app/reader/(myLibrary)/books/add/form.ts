import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1000 * 1000 * 1000;
export const ACCEPTED_FILE_TYPES = ['.pdf', '.epub'];
const formSchema = z.object({
  title: z.string().min(1).max(1000),
  documentFile: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      `Accepted file types: ${ACCEPTED_FILE_TYPES.join(', ')}`
    )
    .transform((f) => f as File),
});

export type FieldValues = z.infer<typeof formSchema>;

export const useDocumentForm = useForm<FieldValues>;
export const useDocumentFormContext = useFormContext<FieldValues>;
