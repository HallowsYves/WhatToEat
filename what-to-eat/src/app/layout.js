import "./globals.css";
import { outfit } from "./fonts";


export const metadata = {
  title: "WhatToEat",
  // description: "Still Don't know what to Eat",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans bg-[#0D1B2A]`}>
        {children}
      </body>
    </html>
  );
}
