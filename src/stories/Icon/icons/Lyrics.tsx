import type { SVGProps } from 'react';
const SvgNamelyrics = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M20 12V6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h5'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.2}
      d='M8 13h4M8 10h8M8 7h8'
    />
    <path
      fill='currentColor'
      d='M22 16.114v.49c0 .409-.169.76-.467.965a1.1 1.1 0 0 1-.653.196c-.147 0-.294-.02-.445-.07l-2.327-.749v4.068c0 1.096-.921 1.986-2.054 1.986S14 22.11 14 21.014c0-1.095.921-1.986 2.054-1.986.545 0 1.038.21 1.406.544V15.16c0-.406.172-.757.47-.966.3-.205.697-.251 1.095-.126l1.911.62c.588.187 1.064.827 1.064 1.425'
    />
  </svg>
);
export { SvgNamelyrics as SvgComponent };
