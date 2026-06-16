import type { Metadata } from 'next'
import { Noto_Sans_SC, Orbitron } from 'next/font/google'
import './globals.css'

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: '口袋游泳教练 | Pocket Swimming Coach',
  description: '你的随身AI游泳训练顾问',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSc.variable} ${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
