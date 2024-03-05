'use client'
import { Inter, Josefin_Sans, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from './StoreProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins'
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} bg-slate-200 dark:bg-slate-800 dark:to-slate-800 duration-300 text-gray-900 dark:text-gray-200`}>
        <StoreProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
            <Toaster position='top-right' reverseOrder={false} />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
