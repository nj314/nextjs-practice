import Image from 'next/image';

export function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src="/logo.png"
        alt="logo"
        width={480}
        height={480}
        className="animate-pulse duration-700"
      />
    </div>
  );
}
