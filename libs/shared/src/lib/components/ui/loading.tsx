import Image from 'next/image';

export function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src="/logo-sm.png"
        alt="logo"
        width={180}
        height={180}
        className="animate-pulse duration-700"
      />
    </div>
  );
}
