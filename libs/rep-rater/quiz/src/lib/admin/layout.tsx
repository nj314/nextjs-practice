import React from 'react';

export function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full w-full bg-slate-100 overflow-auto">{children}</div>
  );
}
