import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./ui.css";

import NavBar from "./components/common/navbar";
import Footer from "./components/common/footer";

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
    description:
        "Face Forward Canada is a not-for-profit wellness initiative bringing free beauty and self-care services to underserved and marginalized communities. We connect volunteer hair, makeup, nail, and skincare artists with organizations that serve vulnerable populations.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
