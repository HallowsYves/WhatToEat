import "./globals.css";
import { poppins } from "./fonts";


export const metadata = {
  title: "WhatToEat",
  // description: "Still Don't know what to Eat",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#0D1B2A]`}>
        {children}
      </body>
    </html>
  );
}
