import { Outfit } from "next/font/google"; 

export const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-inter', // optional, for CSS vars
    display: 'swap',
});
