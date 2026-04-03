import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "./components/common/navbar"; 
import Footer from "./components/common/footer"; 
import NavBar from "./components/common/navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Face Forward Humanitarian Association",
    description: "Face Forward is an Ontario-based organization that strives to bring comfort and dignity to hospitalized individuals through complementary beauty services. We connect cosmetic and facepaint artists with hospitals to host makeover events for adults and children at no charge to patients",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} 
                            ${geistMono.variable} 
                            antialiased`}>
                    <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
