import { ThemeProvider } from '@shared/components/theme';
import { Toaster } from '@shared/components/ui';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConvexClientProvider } from '../providers/convex-client-provider';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whiteboard - Forget.ai',
  description: 'Collaboration',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
