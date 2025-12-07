import './globals.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { StoreProvider } from '@/store/StoreProvider';

export const metadata = {
  title: 'FinBoard',
  description: 'Finance Dashboard Assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
