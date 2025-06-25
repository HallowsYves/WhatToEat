import { Dela_Gothic_One } from "next/font/google"; 
import { Outfit } from "next/font/google";
import { Poppins } from "next/font/google";

export const dela_gothic_one = Dela_Gothic_One ({
    subsets: ['latin'],
    variable: '--font-inter', // optional, for CSS vars
    display: 'swap',
    weight: '400',
});

// export const work_sans = Work_Sans({ subsets: ['latin'], variable: '--font-inter' });
export const outfit = Outfit({ subsets: ['latin'], variable: '--font-inter' })

export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
    weight: ['400', '700'], 
});