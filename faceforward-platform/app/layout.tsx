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
    description: "Face Forward Humanitarian Association is a registered charitable organization in Canada, under the registration number: 1744416-8",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
