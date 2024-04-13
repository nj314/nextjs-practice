import { ConvexClientProvider } from '../providers/convex-client-provider';

import './global.css';

export const metadata = {
  title: 'Welcome to whiteboard',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
