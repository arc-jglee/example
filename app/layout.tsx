import '@/css/globals.css';

import type { Metadata } from 'next';

const siteUrl =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Example | JG',
  description: '프로젝트 예시 사이트',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Example | JG',
    description: '프로젝트 예시 사이트',
    siteName: 'Example',
    images: [
      {
        url: '/logo_thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'JG 썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
