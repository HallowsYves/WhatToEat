import "./globals.css";
import { dela_gothic_one } from "./fonts";


export const metadata = {
  title: "WhatToEat",
  // description: "Still Don't know what to Eat",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dela_gothic_one.variable} font-sans bg-[#0D1B2A]`}>
        {children}
      </body>
    </html>
  );
}
