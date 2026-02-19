import type { SVGProps } from 'react';
const SvgNameclip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m19.29 12.884-6.187 6.187a5.25 5.25 0 1 1-7.424-7.424l7.778-7.779a3.75 3.75 0 0 1 5.303 5.304l-1.59 1.59-4.95 4.95a2 2 0 0 1-2.83-2.828l4.95-4.95'
    />
  </svg>
);
export { SvgNameclip as SvgComponent };
