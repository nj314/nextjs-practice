import { Button } from '@shared/components/ui';
import { ChangeEvent, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = { name: string };
export function DocumentControl({ name }: Props) {
  const { control, register, setValue } = useFormContext();

  const value = useWatch({ name, control });
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerRef, ...rest } = register(name);

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) throw new Error('Not a file');
    setValue(name, file);
  };
  const onUploadClick = () => {
    hiddenInputRef.current?.click();
  };

  return (
    <div>
      <input
        {...rest}
        className="hidden"
        type="file"
        onChange={handleUploadedFile}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
      />
      <Button variant="outline" onClick={onUploadClick} type="button">
        {value && value.name ? 'Change file' : 'Upload file'}
      </Button>
      {value?.name}
    </div>
  );
}
