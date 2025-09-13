import "./globals.css";
import { poppins } from "./fonts";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "WhatToEat",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className}`}>
          <Navbar />

        <main style={{paddingTop: '80px'}}>
        {children}
        </main>
      </body>
    </html>
  );
}