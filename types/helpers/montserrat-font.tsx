import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ['latin'],
  style: [
    'normal',
    'italic'
  ],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ],
  display: 'swap',
  fallback: [
    'system-ui',
    'arial'
  ],
});