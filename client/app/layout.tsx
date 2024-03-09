import { Josefin_Sans, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@/redux/StoreProvider';
import { Metadata } from 'next';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '@/utils/mui-theme';

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

export const metadata: Metadata = {
  title: 'Acadia',
  description: 'ACADIA is an e-learning platform',
  icons: {
    icon: ['/favicons/favicon.ico'],
    apple: ['/favicons/apple-touch-icon.png'],
    shortcut: ['/favicons/apple-touch-icon.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} bg-slate-200 dark:bg-slate-800 dark:to-slate-800 duration-300 text-gray-900 dark:text-gray-200`}>
        <StoreProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
            <MuiThemeProvider theme={theme}>
              {children}
              <Toaster position='top-center' reverseOrder={false} />
            </MuiThemeProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
