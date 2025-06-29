import "./globals.css";
import { poppins } from "./fonts";
import Navbar from "./components/Navbar";
import AnimatedItem from "./components/AnimatedItem";

export const metadata = {
  title: "WhatToEat",
  // description: "Still Don't know what to Eat",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#0D1B2A]`}>
          <Navbar />

        <main style={{paddingTop: '80px'}}>
        {children}
        </main>
      </body>
    </html>
  );
}
