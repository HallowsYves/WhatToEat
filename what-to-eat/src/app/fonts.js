import { Dela_Gothic_One } from "next/font/google"; 
import { Inter } from "next/font/google";

export const dela_gothic_one = Dela_Gothic_One ({
    subsets: ['latin'],
    variable: '--font-inter', // optional, for CSS vars
    display: 'swap',
    weight: '400',
});

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });