
import Providers from '@/components/Providers'
import './globals.css'
import { Suspense } from 'react'
import Nav from '@/components/nav'
import Navbar from '@/components/navbar'

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full bg-gray-50" suppressHydrationWarning={true}
        >
            <Providers>
                <body className="h-full">
                    <Navbar />
                    {children}
                </body>
            </Providers>
        </html>
    )
}
